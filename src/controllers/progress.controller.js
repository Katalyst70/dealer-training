const progressService = require("../services/progress.service");

/**
 * POST /progress/lesson/:lessonId
 */
exports.upsertLessonProgress = async (req, res, next) => {
  try {
    const progress = await progressService.upsertLessonProgress(
      req.user.userId,
      req.params.lessonId
    );
    res.json(progress);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /progress/lesson/:lessonId/complete
 */
exports.markLessonComplete = async (req, res, next) => {
  try {
    const progress = await progressService.markLessonComplete(
      req.user.userId,
      req.params.lessonId
    );
    res.json(progress);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /progress/me
 */
exports.getMyProgress = async (req, res, next) => {
  try {
    const progress = await progressService.getUserProgress(req.user.userId);
    res.json(progress);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /progress/me/course/:courseId
 */
exports.getUserCourseProgress = async (req, res, next) => {
  try {
    const progress = await progressService.getUserCourseProgress(
      req.user.userId,
      req.params.courseId
    );
    res.json(progress);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /progress/rep/:userId
 */
exports.getRepProgress = async (req, res, next) => {
  try {
    const progress = await progressService.getRepProgress(req.params.userId);
    res.json(progress);
  } catch (err) {
    next(err);
  }
};
