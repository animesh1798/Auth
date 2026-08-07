import type { RegUserProp } from "../types/types.js";
import type {Request, Response, NextFunction} from 'express'

export const registerValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, email, password }: RegUserProp = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  next();
};
