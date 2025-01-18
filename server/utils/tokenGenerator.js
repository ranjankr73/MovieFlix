const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    console.log(user);
    const token = jwt.sign(
        { email: user.email, userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
    );
    return token;
};

const generateRefreshToken = (user) => {
    const token = jwt.sign(
        { email: user.email, userId: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );
    return token;
};

module.exports =  {
    generateAccessToken,
    generateRefreshToken,
};
