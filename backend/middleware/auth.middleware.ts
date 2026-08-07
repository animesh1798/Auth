import type { Request, Response, NextFunction } from "express";
import { validateAccessToken, validateRefreshToken, generateAccessToken, generateRefreshToken } from "../utils/jwt.service.js";
import {prisma} from '../services/db.services.js'


export const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
  let { accessToken, refreshToken } = req.cookies;
 
  const validAccessToken = validateAccessToken(accessToken ?? "");

  if (validAccessToken) {
    req.body = validAccessToken;
    return next();
  }

  const validRefreshToken = validateRefreshToken(refreshToken ?? "");

  if (!validAccessToken && !validRefreshToken)
    return res.status(401).json({ message: "Session expired. Login again." });
  
  if (!validAccessToken && validRefreshToken) {
    const session_id = validRefreshToken as string
    const getSession = await prisma.session.findFirst({
      where: {id: session_id},
      include: {
        user: true
      }
    })
    
    if (!getSession) return res.status(500).json({message: "TRY LATER"})
    
    const {id, email} = getSession.user

    accessToken = generateAccessToken({ id, email });
    const newRefreshToken = generateRefreshToken({session_id})

    const udpateRefreshToken = await prisma.session.update({
      where: {id: session_id},
      data: {refreshTokenHash: newRefreshToken }
    })
    
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: true,
    });
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: true,
    });
  }

  req.body = validateAccessToken(accessToken)
  return  next();
};
