import express from "express";
import { signup, login, refreshToken, logout, getProfile } from "../controllers/auth.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);
router.get("/profile", authenticateToken, getProfile);

export default router;
