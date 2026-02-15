const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.guard");
const roleMiddleware = require("../middleware/role.middleware");

router.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend is healthy"
  });
});

router.get(
  "/manager",
  authMiddleware,
  roleMiddleware("MANAGER"),
  (req, res) => {
    res.json({
      message: "Manager access granted",
      user: req.user
    });
  }
);

module.exports = router;
