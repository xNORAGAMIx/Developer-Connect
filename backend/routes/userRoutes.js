import express from "express";
import {
    checkAuthenticated,
  googleAuth,
  googleAuthCallback,
  loginUser,
  registerUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/auth/google", googleAuth);
router.get("/auth/google/callback", googleAuthCallback);
router.get('/checkAuthenticated', checkAuthenticated);

export default router; // export the router
  