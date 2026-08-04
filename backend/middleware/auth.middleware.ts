import { Request, Response, NextFunction } from "express";
import { validateAccessToken, validateRefreshToken, generateAccessToken } from "../utils/jwt.service";

export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
  let { accessToken, refreshToken } = req.cookies;
  const validAccessToken = validateAccessToken(accessToken ?? "");

  if (validAccessToken) {
    req.body = validAccessToken;
    next();
  }

  const validRefreshToken = validateRefreshToken(refreshToken ?? "");

  if (!validAccessToken && !validRefreshToken)
    return res.status(401).json({ message: "Session expired. Login again." });
  if (!validAccessToken && validRefreshToken) {
    const { id, email } = validRefreshToken;
    accessToken = generateAccessToken({ id, email });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: true,
    });
  }
  req.body = validRefreshToken;
  next();
};
