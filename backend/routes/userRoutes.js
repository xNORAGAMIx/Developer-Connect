import express from "express";
import {
  checkAuthenticated,
  getUserProfile,
  googleAuth,
  googleAuthCallback,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile",isAuthenticated, getUserProfile);
router.get("/auth/google", googleAuth);
router.get("/auth/google/callback", googleAuthCallback);
router.get("/checkAuthenticated", checkAuthenticated);

export default router; // export the router
