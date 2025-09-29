import jwt from "jsonwebtoken";

export const createAccessToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "15m" });
};

export const createRefreshToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "7d" });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
};
