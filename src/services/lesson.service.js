const prisma = require("../prisma/client");

/**
 * Create a lesson inside a module
 */
exports.createLesson = async ({ title, content, order, moduleId }) => {
  if (!title || order === undefined || !moduleId) {
    throw new Error("MISSING_FIELDS");
  }

  return prisma.lesson.create({
    data: {
      title,
      content,
      order,
      moduleId,
    },
  });
};

/**
 * Get all lessons for a module
 */
exports.getLessonsByModule = async (moduleId) => {
  return prisma.lesson.findMany({
    where: { moduleId },
    orderBy: { order: "asc" },
  });
};

/**
 * Get a single lesson by ID
 */
exports.getLessonById = async (lessonId) => {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
  });

  if (!lesson) {
    throw new Error("LESSON_NOT_FOUND");
  }

  return lesson;
};

/**
 * Update a lesson
 */
exports.updateLesson = async (lessonId, data) => {
  return prisma.lesson.update({
    where: { id: lessonId },
    data,
  });
};

/**
 * Delete a lesson
 */
exports.deleteLesson = async (lessonId) => {
  return prisma.lesson.delete({
    where: { id: lessonId },
  });
};
