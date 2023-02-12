import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  res.header("Content-Type", "application/json");
  console.log("\x1b[33m%s\x1b[0m", error);
  const statusCode = error.statusCode || 500;
  const errorCode = error.errorCode || "Server Error";

  res.status(statusCode).json({
    statusCode,
    errorCode,
    message: error.message,
  });
};
