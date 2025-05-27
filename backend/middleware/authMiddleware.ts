// middleware/authMiddleware.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      _id: string;
    };
    req.user = decoded; // Extend Request type if needed
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    res.status(401).json({ msg: "Invalid token" });
  }
};
