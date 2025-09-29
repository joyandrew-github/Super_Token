import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Middleware to protect routes
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from Authorization header: "Bearer <token>"
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Invalid token format" });

    // Verify token
    const payload: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

    // Attach user info to request object
    (req as any).userId = payload.userId; 

    next(); // proceed to the next middleware/route handler
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
};
