const express = require("express");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.controller");

const router = express.Router();

/**
 * Create a course
 * ADMIN only
 */
router.post("/", auth, role(["ADMIN"]), createCourse);

/**
 * Get all courses
 * ADMIN, MANAGER, USER
 */
router.get("/", auth, role(["ADMIN", "MANAGER", "USER"]), getAllCourses);

/**
 * Get single course by ID
 * ADMIN, MANAGER, USER
 */
router.get("/:id", auth, role(["ADMIN", "MANAGER", "USER"]), getCourseById);

/**
 * Update course
 * ADMIN only
 */
router.patch("/:id", auth, role(["ADMIN"]), updateCourse);

/**
 * Delete course
 * ADMIN only
 */
router.delete("/:id", auth, role(["ADMIN"]), deleteCourse);

module.exports = router;
