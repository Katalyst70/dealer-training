const express = require("express");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const {
  createModule,
  getModulesByCourse,
  getModuleById,
  updateModule,
  deleteModule,
} = require("../controllers/module.controller");

const router = express.Router();

/**
 * Create a module
 * ADMIN only
 */
router.post("/", auth, role(["ADMIN"]), createModule);

/**
 * Get all modules for a course
 * ADMIN, MANAGER, USER
 */
router.get("/by-course/:courseId", auth, role(["ADMIN", "MANAGER", "USER"]), getModulesByCourse);

/**
 * Get single module by ID
 * ADMIN, MANAGER, USER
 */
router.get("/:id", auth, role(["ADMIN", "MANAGER", "USER"]), getModuleById);

/**
 * Update module
 * ADMIN only
 */
router.patch("/:id", auth, role(["ADMIN"]), updateModule);

/**
 * Delete module
 * ADMIN only
 */
router.delete("/:id", auth, role(["ADMIN"]), deleteModule);

module.exports = router;
