const prisma = require("../prisma/client");

/**
 * Create or update lesson progress (last viewed)
 */
exports.upsertLessonProgress = async (userId, lessonId) => {
  return prisma.userLessonProgress.upsert({
    where: {
      userId_lessonId: {
        userId,
        lessonId,
      },
    },
    update: {
      lastViewedAt: new Date(),
    },
    create: {
      userId,
      lessonId,
      lastViewedAt: new Date(),
    },
  });
};

/**
 * Mark lesson as completed
 */
exports.markLessonComplete = async (userId, lessonId) => {
  return prisma.userLessonProgress.upsert({
    where: {
      userId_lessonId: {
        userId,
        lessonId,
      },
    },
    update: {
      completed: true,
      completedAt: new Date(),
    },
    create: {
      userId,
      lessonId,
      completed: true,
      completedAt: new Date(),
    },
  });
};

/**
 * Get all progress for a user
 */
exports.getUserProgress = async (userId) => {
  return prisma.userLessonProgress.findMany({
    where: { userId },
    include: {
      lesson: {
        include: {
          module: {
            include: {
              course: true,
            },
          },
        },
      },
    },
  });
};

/**
 * Get progress for a user within a specific course
 */
exports.getUserCourseProgress = async (userId, courseId) => {
  return prisma.lesson.findMany({
    where: {
      module: {
        courseId,
      },
    },
    select: {
      id: true,
      title: true,
      module: {
        select: {
          id: true,
          title: true,
        },
      },
      progress: {
        where: { userId },
      },
    },
  });
};

/**
 * Get progress for a specific rep (manager/admin view)
 */
exports.getRepProgress = async (repId) => {
  return prisma.userLessonProgress.findMany({
    where: { userId: repId },
    include: {
      lesson: {
        include: {
          module: {
            include: {
              course: true,
            },
          },
        },
      },
    },
  });
};
