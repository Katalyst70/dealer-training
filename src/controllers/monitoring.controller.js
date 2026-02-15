const monitoringService = require("../services/monitoring.service");

/**
 * GET /monitoring/reps
 */
exports.getRepsForManager = async (req, res, next) => {
  try {
    const reps = await monitoringService.getRepsForManager();
    res.json(reps);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /monitoring/reps/:repId/accounts
 */
exports.getRepSocialAccounts = async (req, res, next) => {
  try {
    const accounts = await monitoringService.getRepSocialAccounts(req.params.repId);
    res.json(accounts);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /monitoring/reps/:repId/feed
 */
exports.getRepSocialFeed = async (req, res, next) => {
  try {
    const feed = await monitoringService.getRepSocialFeed(req.params.repId);
    res.json(feed);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /monitoring/reps/:repId/missed
 */
exports.getRepMissedOpportunities = async (req, res, next) => {
  try {
    const missed = await monitoringService.getRepMissedOpportunities(req.params.repId);
    res.json(missed);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /monitoring/summary
 */
exports.getMonitoringSummary = async (req, res, next) => {
  try {
    const summary = await monitoringService.getMonitoringSummary();
    res.json(summary);
  } catch (err) {
    next(err);
  }
};
