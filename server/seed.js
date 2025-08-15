const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/user.model");
const Role = require("./models/role.model");
const Permission = require("./models/permission.model");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for Seeding");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await Role.deleteMany();
    await User.deleteMany();
    await Permission.deleteMany();

    console.log("Data Cleared");

    const adminRole = await Role.create({ name: "Admin" });
    const managerRole = await Role.create({ name: "Manager" });
    const viewerRole = await Role.create({ name: "Viewer" });

    console.log("Roles Created");

    await Permission.insertMany([
      { role: adminRole._id, pageKey: "dashboard", read: true, write: true },
      { role: adminRole._id, pageKey: "reports", read: true, write: true },
      { role: managerRole._id, pageKey: "dashboard", read: true, write: false },
      { role: managerRole._id, pageKey: "reports", read: true, write: true },
      { role: viewerRole._id, pageKey: "dashboard", read: true, write: false },
      { role: viewerRole._id, pageKey: "reports", read: true, write: false },
    ]);

    console.log("Permissions Created");

    // We now use the field name 'passwordHash' but provide the PLAIN TEXT password.
    // The User model's pre-save hook will handle the hashing automatically.
    const users = [
      {
        name: "Alice Admin",
        email: "alice.admin@example.com",
        passwordHash: "Pass@123", // Provide plain text here
        role: adminRole._id,
      },
      {
        name: "Mark Manager",
        email: "mark.manager@example.com",
        passwordHash: "Pass@123", // Provide plain text here
        role: managerRole._id,
      },
      {
        name: "Vicki Viewer",
        email: "vicki.viewer@example.com",
        passwordHash: "Pass@123", // Provide plain text here
        role: viewerRole._id,
      },
    ];

    // The hashing logic is removed from this loop.
    for (const userData of users) {
      await User.create(userData);
    }

    console.log("Users Created");

    console.log("Database seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

connectDB().then(() => {
  seedData();
});
