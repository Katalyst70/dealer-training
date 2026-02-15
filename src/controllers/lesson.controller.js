const lessonService = require("../services/lesson.service");

/**
 * POST /lessons
 */
exports.createLesson = async (req, res, next) => {
  try {
    const lesson = await lessonService.createLesson(req.body);
    res.status(201).json(lesson);
  } catch (err) {
    if (err.message === "MISSING_FIELDS") {
      return res.status(400).json({ message: "Missing required fields" });
    }
    next(err);
  }
};

/**
 * GET /lessons/by-module/:moduleId
 */
exports.getLessonsByModule = async (req, res, next) => {
  try {
    const lessons = await lessonService.getLessonsByModule(req.params.moduleId);
    res.json(lessons);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /lessons/:id
 */
exports.getLessonById = async (req, res, next) => {
  try {
    const lesson = await lessonService.getLessonById(req.params.id);
    res.json(lesson);
  } catch (err) {
    if (err.message === "LESSON_NOT_FOUND") {
      return res.status(404).json({ message: "Lesson not found" });
    }
    next(err);
  }
};

/**
 * PATCH /lessons/:id
 */
exports.updateLesson = async (req, res, next) => {
  try {
    const lesson = await lessonService.updateLesson(req.params.id, req.body);
    res.json(lesson);
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /lessons/:id
 */
exports.deleteLesson = async (req, res, next) => {
  try {
    await lessonService.deleteLesson(req.params.id);
    res.json({ message: "Lesson deleted successfully" });
  } catch (err) {
    next(err);
  }
};
