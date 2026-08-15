import type {
  NextFunction,
  Request,
  Response,
} from "express";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const startedAt = Date.now();

  res.on("finish", () => {
    const durationMs = Date.now() - startedAt;

    console.log({
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs,
    });
  });

  next();
};