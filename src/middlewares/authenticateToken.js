const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            comppleted: false,
            message: "you are not logged in"
        })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, usama) => {
        if (err) {
            return res.status(403).json({
                comppleted: false,
                message: "token is expired"
            })
        }
        req.user = usama;
        next();
    });

}

module.exports = authenticateToken