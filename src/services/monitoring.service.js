const prisma = require("../prisma/client");

/**
 * Get all reps visible to managers/admins
 */
exports.getRepsForManager = async () => {
  return prisma.user.findMany({
    where: { role: "USER" },
    select: {
      id: true,
      email: true,
      createdAt: true,
    },
  });
};

/**
 * Get a rep's connected social accounts
 */
exports.getRepSocialAccounts = async (repId) => {
  return prisma.socialAccount.findMany({
    where: { userId: repId },
    include: {
      posts: true,
    },
  });
};

/**
 * Get a rep's social feed (posts + comments)
 */
exports.getRepSocialFeed = async (repId) => {
  return prisma.socialPost.findMany({
    where: {
      socialAccount: {
        userId: repId,
      },
    },
    include: {
      comments: {
        orderBy: { commentedAt: "desc" },
      },
      socialAccount: true,
    },
    orderBy: { postedAt: "desc" },
  });
};

/**
 * Get missed opportunities for a rep
 */
exports.getRepMissedOpportunities = async (repId) => {
  return prisma.socialComment.findMany({
    where: {
      socialPost: {
        socialAccount: {
          userId: repId,
        },
      },
      flaggedMissed: true,
    },
    include: {
      socialPost: {
        include: {
          socialAccount: true,
        },
      },
    },
    orderBy: { commentedAt: "desc" },
  });
};

/**
 * Dealership-wide monitoring summary
 */
exports.getMonitoringSummary = async () => {
  const [
    totalReps,
    totalAccounts,
    totalPosts,
    totalComments,
    missedOpportunities,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "USER" } }),
    prisma.socialAccount.count(),
    prisma.socialPost.count(),
    prisma.socialComment.count(),
    prisma.socialComment.count({ where: { flaggedMissed: true } }),
  ]);

  return {
    totalReps,
    totalAccounts,
    totalPosts,
    totalComments,
    missedOpportunities,
  };
};
