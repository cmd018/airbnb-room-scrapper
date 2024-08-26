import { NextFunction, Request, Response } from "express";
import { HttpException } from "../utils/httpException";
import { logger } from "../utils/logger";

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || "Something went wrong";

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    res.status(status).json({ message });
  } catch (err) {
    next(err);
  }
};

export default errorMiddleware;
