const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { sequelize } = require("./config/dbConfig");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
// require("./models/userModel")
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "*",
        credentials: true,
    }),
);
// sync the code to database
sequelize.sync();
// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)
module.exports = app;