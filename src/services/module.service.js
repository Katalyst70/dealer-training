const prisma = require("../prisma/client");

/**
 * Create a module for a course
 */
exports.createModule = async ({ title, order, courseId }) => {
  if (!title || order === undefined || !courseId) {
    throw new Error("MISSING_FIELDS");
  }

  return prisma.module.create({
    data: {
      title,
      order,
      courseId,
    },
  });
};

/**
 * Get all modules for a course (with lessons)
 */
exports.getModulesByCourse = async (courseId) => {
  return prisma.module.findMany({
    where: { courseId },
    orderBy: { order: "asc" },
    include: {
      lessons: {
        orderBy: { order: "asc" },
      },
    },
  });
};

/**
 * Get a single module by ID
 */
exports.getModuleById = async (moduleId) => {
  const module = await prisma.module.findUnique({
    where: { id: moduleId },
    include: {
      lessons: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!module) {
    throw new Error("MODULE_NOT_FOUND");
  }

  return module;
};

/**
 * Update a module
 */
exports.updateModule = async (moduleId, data) => {
  return prisma.module.update({
    where: { id: moduleId },
    data,
  });
};

/**
 * Delete a module
 */
exports.deleteModule = async (moduleId) => {
  return prisma.module.delete({
    where: { id: moduleId },
  });
};
