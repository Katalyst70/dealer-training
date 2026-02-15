const prisma = require("../prisma/client");

/**
 * Create a new course
 */
exports.createCourse = async ({ title, description, published }) => {
  if (!title) {
    throw new Error("TITLE_REQUIRED");
  }

  return prisma.course.create({
    data: {
      title,
      description,
      published: published ?? false,
    },
  });
};

/**
 * Get all courses
 */
exports.getAllCourses = async () => {
  return prisma.course.findMany({
    orderBy: { createdAt: "desc" },
  });
};

/**
 * Get a single course with modules and lessons
 */
exports.getCourseById = async (courseId) => {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });

  if (!course) {
    throw new Error("COURSE_NOT_FOUND");
  }

  return course;
};

/**
 * Update a course
 */
exports.updateCourse = async (courseId, data) => {
  return prisma.course.update({
    where: { id: courseId },
    data,
  });
};

/**
 * Delete a course
 */
exports.deleteCourse = async (courseId) => {
  return prisma.course.delete({
    where: { id: courseId },
  });
};
