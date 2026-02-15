module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    console.log("ROLE CHECK:", {
      roleFromToken: req.user?.role,
      allowedRoles
    });

    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};
