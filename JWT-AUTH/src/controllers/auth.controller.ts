import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hashPassword, comparePassword } from "../utils/hash";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../utils/jwt";

const prisma = new PrismaClient();

// Signup
export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email, password: hashed }
    });
    res.json({ message: "User created", userId: user.id });
  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email }, include: { refreshTokens: true } });

  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const accessToken = createAccessToken(user.id);
  const refreshToken = createRefreshToken(user.id);

  // Save refresh token in DB
  await prisma.refreshToken.create({ data: { token: refreshToken, userId: user.id } });

  // Send tokens (refresh token as httpOnly cookie)
  res
    .cookie("refreshToken", refreshToken, { httpOnly: true, path: "/refresh" })
    .json({ accessToken });
};

// Refresh Token
export const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const payload: any = verifyRefreshToken(token);
    const storedToken = await prisma.refreshToken.findUnique({ where: { token } });
    if (!storedToken) return res.status(403).json({ error: "Invalid token" });

    const newAccessToken = createAccessToken(payload.userId);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
};

// Logout
export const logout = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (token) {
    await prisma.refreshToken.deleteMany({ where: { token } });
  }
  res.clearCookie("refreshToken", { path: "/refresh" }).json({ message: "Logged out" });
};

// Get Profile
export const getProfile = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, createdAt: true }
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};