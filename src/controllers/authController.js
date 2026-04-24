const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const generateAccessToken = (user) => {
    const token = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h'
    });
    return token
}

const generateRefreshToken = (user) => {
    const token = jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d'
    });
    return token
}
exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const hashPassowrd = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            firstName, lastName, email, password: hashPassowrd
        })

        res.status(200).json({
            completed: true,
            message: "user register successfully"
        })
    } catch (error) {
        res.status(500).json({
            completed: true,
            message: "something went wrong in registering the user"
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({
                completed: false,
                message: "email or password is not defined"
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                completed: false,
                message: "No user found"
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(404).json({
                completed: false,
                message: "invalid credentials"
            })
        }

        const accessToken = await generateAccessToken(user);
        const refreshToken = await generateRefreshToken(user);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, // Cannot be accessed by client-side JS
            secure: false,   // Only sent over HTTPS
            sameSite: 'Strict', // Protects against CSRF
            maxAge: 7 * 24 * 60 * 60 * 1000, // Expiry (e.g., 7 days)
        });
        res.status(200).json({
            completed: true,
            message: "user login successfully",
            token: accessToken
        })
    } catch (error) {
        console.error("error in user console", error)
        res.status(500).json({
            completed: true,
            message: "something went wrong in login the user"
        })
    }
}

exports.refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);

        const user = await User.findOne({ refreshToken })
        if (!user) {
            return res.status(404).json({
                completed: false,
                message: "No user found"
            })
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);

            const newAccessToken = generateAccessToken(user);
            res.json({ accessToken: newAccessToken });
        });
    } catch (error) {
        console.error("error in refresh Token", error)
        res.status(500).json({
            completed: true,
            message: "something went wrong in refreshing the token"
        })
    }
}


exports.logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        const user = await User.findOne({ refreshToken });
        if (user) {
            user.refreshToken = null;
            await user.save();
        }
        res.clearCookie('refreshToken');
        res.status(200).json({
            completed: true,
            message: "user logout successfully",
        })
    } catch (error) {
        res.status(500).json({
            completed: true,
            message: "something went wrong in refreshing the token"
        })
    }
}