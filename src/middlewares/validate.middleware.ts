import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

export const validateBody =
  (schema: ZodType) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: result.error.issues[0]?.message || "Invalid request",
      });
      return;
    }

    req.body = result.data;

    next();
  };