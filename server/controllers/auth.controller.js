const User = require("../models/user.model");
const Role = require("../models/role.model");
const Permission = require("../models/permission.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).populate("role");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const permissions = await Permission.find({ role: user.role._id });

    const payload = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role.name,
        permissions: permissions.reduce((acc, p) => {
          acc[p.pageKey] = { read: p.read, write: p.write };
          return acc;
        }, {}),
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000, // 1 hour
    });

    res.json({ user: payload.user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};
