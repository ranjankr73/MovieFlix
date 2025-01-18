const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getLoggedInUser } = require("../middlewares/authMiddleware");
const { generateAccessToken, generateRefreshToken } = require("../utils/tokenGenerator.js");
require("dotenv").config();

//register a new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    //check if user already exists
    const existedUser = await User.findOne({ email: email });
    if (existedUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already in use!",
      });
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //save a new user
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
      isAdmin: isAdmin
    });

    const savedUser = await user.save();

    if (!savedUser) {
      return res.status(500).json({
        success: false,
        message: "Issue in saving user to db",
      });
    }

    return res
      .status(200)
      .json({ 
        success: true, 
        message: "Registration Successfull, Please login" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error while creating an account!",
    });
  }
});

//login a user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "All fields are required!",
      });
    }

    //check if user exists
    const existedUser = await User.findOne({ email: email });
    console.log(existedUser);
    if (!existedUser) {
      return res.status(401).json({
        success: false,
        message: "User does not exist!",
      });
    }

    //check if password is correct
    const correctPassword = await bcrypt.compare(
      password,
      existedUser.password
    );
    console.log(correctPassword);
    if (!correctPassword) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    //create and assign a token
    const accessToken = generateAccessToken(existedUser);
    const refreshToken = generateRefreshToken(existedUser);
    console.log(accessToken);
    console.log(refreshToken);
    existedUser.refreshToken = refreshToken;
    await existedUser.save();

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax", // Or 'Lax' based on your needs
      })
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "Lax",
      });

    return res.status(200).json({
      success: true,
      message: "You have been logged in successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error while logging into your account!",
    });
  }
});

router.get("/get-current-user", getLoggedInUser, async (req, res) => {
  try {
    const userId = req.user.userId;

    const existedUser = await User.findById(userId).select("-password");

    if (!existedUser) {
      return res.status(404).json({
        success: false,
        message: "User or Profile not found",
      });
    }

    res.send({
      success: true,
      message: "User details fetched successfully",
      data: existedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while retrieving profile",
    });
  }
});

router.post("/refresh-token", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh Token required",
      });
    }

    const existedUser = await User.findOne({ refreshToken });

    if (!existedUser) {
      return res.status(403).json({
        message: "Invalid Refresh Token",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    if (!decoded) {
      return res.status(403).json({
        message: "Invalid or expired refresh token",
      });
    }

    const newAccessToken = generateAccessToken(existedUser);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "None",
    });

    return res.status(200).json({
      message: "Access Token updated successfully",
      accessToken: newAccessToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error while refreshing access token",
    });
  }
});

module.exports = router;
