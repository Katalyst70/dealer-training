const express = require("express");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const {
  createLesson,
  getLessonsByModule,
  getLessonById,
  updateLesson,
  deleteLesson,
} = require("../controllers/lesson.controller");

const router = express.Router();

/**
 * Create a lesson
 * ADMIN only
 */
router.post("/", auth, role(["ADMIN"]), createLesson);

/**
 * Get all lessons for a module
 * ADMIN, MANAGER, USER
 */
router.get(
  "/by-module/:moduleId",
  auth,
  role(["ADMIN", "MANAGER", "USER"]),
  getLessonsByModule
);

/**
 * Get single lesson by ID
 * ADMIN, MANAGER, USER
 */
router.get(
  "/:id",
  auth,
  role(["ADMIN", "MANAGER", "USER"]),
  getLessonById
);

/**
 * Update lesson
 * ADMIN only
 */
router.patch("/:id", auth, role(["ADMIN"]), updateLesson);

/**
 * Delete lesson
 * ADMIN only
 */
router.delete("/:id", auth, role(["ADMIN"]), deleteLesson);

module.exports = router;
