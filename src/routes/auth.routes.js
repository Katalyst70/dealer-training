const express = require("express");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const {
  login,
  register,
  getMe,
} = require("../controllers/auth.controller");

const router = express.Router();

/**
 * Public Routes
 */
router.post("/login", login);

/**
 * Admin-only user creation
 * (Managers and reps are created by admins)
 */
router.post("/register", auth, role(["ADMIN"]), register);

/**
 * Authenticated user info
 */
router.get("/me", auth, getMe);

module.exports = router;
