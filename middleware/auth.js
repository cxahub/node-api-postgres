// Token generation and authentication check.
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    const token = req.header("x-auth-token");

    if(!token) return res.status(401).send({

        access: false,
        error: "Access denied. No valid token provided."

    });

    try {

        const decoded = jwt.verify(token, "jwtPrivateKey");
        req.user = decoded;

    } catch (error) {

        return res.status(401).send({
            access: false,
            error: "Token expired or invalid."
        });

    }

    next();

}