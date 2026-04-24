const express = require("express");
const { registerUser, login, refreshToken, logout } = require("../controllers/authController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/refresh-token").get(refreshToken);
router.route("/logout").get(logout);

module.exports = router;
