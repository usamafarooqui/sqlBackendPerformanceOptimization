const express = require("express");
const { getAllUsers } = require("../controllers/userController");
const authenticateToken = require("../middlewares/authenticateToken");
const router = express.Router();

router.route("/")
    .get(authenticateToken, getAllUsers);

module.exports = router