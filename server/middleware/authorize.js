const authorize = (pageKey, needWrite = false) => {
  return (req, res, next) => {
    const userPermissions = req.user.permissions;
    const permission = userPermissions[pageKey];

    if (!permission) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (needWrite) {
      if (!permission.write) {
        return res.status(403).json({ message: "Forbidden" });
      }
    } else {
      if (!permission.read) {
        return res.status(403).json({ message: "Forbidden" });
      }
    }

    next();
  };
};

module.exports = authorize;
