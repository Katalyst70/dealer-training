const express = require("express");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const {
  upsertLessonProgress,
  markLessonComplete,
  getMyProgress,
  getUserCourseProgress,
  getRepProgress,
} = require("../controllers/progress.controller");

const router = express.Router();

/**
 * Update or create lesson progress
 * USER only (rep updating their own progress)
 */
router.post(
  "/lesson/:lessonId",
  auth,
  role(["USER"]),
  upsertLessonProgress
);

/**
 * Mark lesson complete
 * USER only
 */
router.post(
  "/lesson/:lessonId/complete",
  auth,
  role(["USER"]),
  markLessonComplete
);

/**
 * Get authenticated user's progress
 * USER only
 */
router.get(
  "/me",
  auth,
  role(["USER"]),
  getMyProgress
);

/**
 * Get authenticated user's progress for a specific course
 * USER only
 */
router.get(
  "/me/course/:courseId",
  auth,
  role(["USER"]),
  getUserCourseProgress
);

/**
 * Get a specific rep's progress
 * ADMIN, MANAGER
 */
router.get(
  "/rep/:userId",
  auth,
  role(["ADMIN", "MANAGER"]),
  getRepProgress
);

module.exports = router;
