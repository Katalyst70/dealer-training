const courseService = require("../services/course.service");

/**
 * POST /courses
 */
exports.createCourse = async (req, res, next) => {
  try {
    const course = await courseService.createCourse(req.body);
    res.status(201).json(course);
  } catch (err) {
    if (err.message === "TITLE_REQUIRED") {
      return res.status(400).json({ message: "Course title is required" });
    }
    next(err);
  }
};

/**
 * GET /courses
 */
exports.getAllCourses = async (req, res, next) => {
  try {
    const courses = await courseService.getAllCourses();
    res.json(courses);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /courses/:id
 */
exports.getCourseById = async (req, res, next) => {
  try {
    const course = await courseService.getCourseById(req.params.id);
    res.json(course);
  } catch (err) {
    if (err.message === "COURSE_NOT_FOUND") {
      return res.status(404).json({ message: "Course not found" });
    }
    next(err);
  }
};

/**
 * PATCH /courses/:id
 */
exports.updateCourse = async (req, res, next) => {
  try {
    const course = await courseService.updateCourse(req.params.id, req.body);
    res.json(course);
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /courses/:id
 */
exports.deleteCourse = async (req, res, next) => {
  try {
    await courseService.deleteCourse(req.params.id);
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    next(err);
  }
};
