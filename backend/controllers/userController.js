import User from "../models/User/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import passport from "passport";
import jwt from "jsonwebtoken";

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  //username already exists
  const existingUser = await User.findOne({ username, email });
  if (existingUser) {
    throw new Error("Username or Email already exists");
  }

  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });

  //Send the response
  res.status(201).json({
    status: "success",
    message: "User created successfully",
    user,
  });
});

export const loginUser = asyncHandler(async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    //check if user not found
    if (!user) {
      return res.status(401).json({
        message: info.message,
      });
    }
    //generate token
    const token = jwt.sign({ id: user?._id }, process.env.SECRET_KEY);
    //set the token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: "success",
      message: "Logged in successfully",
      username: user?.username,
      email: user?.email,
      _id: user?._id,
    });
  })(req, res, next);
});

export const googleAuth = passport.authenticate("google", {
  scope: ["profile"],
});

export const googleAuthCallback = asyncHandler(async (req, res, next) => {
  passport.authenticate(
    "google",
    {
      failureRedirect: "/login",
      session: false,
    },
    (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.redirect("http://localhost:5173/google-login-eror");
      }
      //generate token
      const token = jwt.sign({ id: user?._id }, process.env.SECRET_KEY, {
        expiresIn: "3d",
      });
      //set cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });
      //redirect user to dashboard on client
      res.redirect("http://localhost:5173/dashboard");
    }
  )(req, res, next);
});

export const checkAuthenticated = asyncHandler(async (req, res) => {
  const token = req.cookies["token"];
  if (!token) {
    return res.status(401).json({
      isAuthenticated: false,
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ isAuthenticated: false });
    } else {
      return res.status(200).json({
        isAuthenticated: true,
        _id: user?._id,
        username: user?.username,
        profilePicture: user?.profilePicture,
      });
    }
  } catch (err) {
    return res.status(401).json({ isAuthenticated: false, err });
  }
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out" });
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user)
    .populate("posts")
    .select(
      "-password -passwordResetToken -accountVerificationToken -accountVerificationExpires -passwordResetExpires"
    );
  res.json({ user });
});
