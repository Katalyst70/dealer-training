const router = require("express").Router();
const requireAuth = require("../middleware/auth");
const requireRole = require("../middleware/requireRole");
const { createCourse } = require("../controllers/course.controller");

router.post(
  "/",
  requireAuth,
  requireRole("ADMIN"),
  createCourse
);

module.exports = router;
