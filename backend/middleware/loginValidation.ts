import type { Request, Response, NextFunction} from 'express'

export const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email/Password cannot be empty" });
  }
  next();
};
