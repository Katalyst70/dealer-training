const authService = require("../services/auth.service");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.json(result);
  } catch (err) {
    if (err.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    if (err.message === "USER_EXISTS") {
      return res.status(409).json({ message: "User already exists" });
    }
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await authService.getUserById(req.user.userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
