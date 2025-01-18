const jwt = require('jsonwebtoken');

const getLoggedInUser = (req, res, next) => {
    try {
        const token = req.cookies.accessToken;

        if(!token) {
            return res.status(404).json({
                msg: "Token is not found"
            })
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;

        next();

    } catch (error) {

        return res.status(500).json({
            msg: "Internal server error while getting logged in user"
        })
    }
};

module.exports = { getLoggedInUser };