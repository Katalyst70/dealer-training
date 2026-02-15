const moduleService = require("../services/module.service");

/**
 * POST /modules
 */
exports.createModule = async (req, res, next) => {
  try {
    const module = await moduleService.createModule(req.body);
    res.status(201).json(module);
  } catch (err) {
    if (err.message === "MISSING_FIELDS") {
      return res.status(400).json({ message: "Missing required fields" });
    }
    next(err);
  }
};

/**
 * GET /modules/by-course/:courseId
 */
exports.getModulesByCourse = async (req, res, next) => {
  try {
    const modules = await moduleService.getModulesByCourse(req.params.courseId);
    res.json(modules);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /modules/:id
 */
exports.getModuleById = async (req, res, next) => {
  try {
    const module = await moduleService.getModuleById(req.params.id);
    res.json(module);
  } catch (err) {
    if (err.message === "MODULE_NOT_FOUND") {
      return res.status(404).json({ message: "Module not found" });
    }
    next(err);
  }
};

/**
 * PATCH /modules/:id
 */
exports.updateModule = async (req, res, next) => {
  try {
    const module = await moduleService.updateModule(req.params.id, req.body);
    res.json(module);
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /modules/:id
 */
exports.deleteModule = async (req, res, next) => {
  try {
    await moduleService.deleteModule(req.params.id);
    res.json({ message: "Module deleted successfully" });
  } catch (err) {
    next(err);
  }
};
