const express = require("express");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const {
  getRepsForManager,
  getRepSocialAccounts,
  getRepSocialFeed,
  getRepMissedOpportunities,
  getMonitoringSummary,
} = require("../controllers/monitoring.controller");

const router = express.Router();

/**
 * Get all reps visible to the manager
 * ADMIN, MANAGER
 */
router.get(
  "/reps",
  auth,
  role(["ADMIN", "MANAGER"]),
  getRepsForManager
);

/**
 * Get a rep's connected social accounts
 * ADMIN, MANAGER
 */
router.get(
  "/reps/:repId/accounts",
  auth,
  role(["ADMIN", "MANAGER"]),
  getRepSocialAccounts
);

/**
 * Get a rep's social feed (posts + comments)
 * ADMIN, MANAGER
 */
router.get(
  "/reps/:repId/feed",
  auth,
  role(["ADMIN", "MANAGER"]),
  getRepSocialFeed
);

/**
 * Get missed opportunities for a rep
 * ADMIN, MANAGER
 */
router.get(
  "/reps/:repId/missed",
  auth,
  role(["ADMIN", "MANAGER"]),
  getRepMissedOpportunities
);

/**
 * Dealership‑wide monitoring summary
 * ADMIN, MANAGER
 */
router.get(
  "/summary",
  auth,
  role(["ADMIN", "MANAGER"]),
  getMonitoringSummary
);

module.exports = router;
