import jwt from 'jsonwebtoken'
import type { TokenPayload } from '../types/types.js';

export const generateAccessToken = (loginUser: TokenPayload) => {
  return jwt.sign(loginUser, process.env.ACCESS_TOKEN_SECRET!, {
    algorithm: "HS256",
    expiresIn: "15m",
  });
};


export const generateRefreshToken = ({session_id} : {session_id : string}) => {
  return jwt.sign({session_id}, process.env.REFRESH_TOKEN_SECRET!, {
    algorithm: "HS256",
    expiresIn: "7d",
  });
};


export const validateAccessToken = (jwtToken: string) : TokenPayload | null => {
  try {
    const decoded = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET!)
    return decoded as TokenPayload
  } catch {
    return null
  }
}

export const validateRefreshToken = (jwtToken: string) => {
  try {
    const decoded = jwt.verify(jwtToken, process.env.REFRESH_TOKEN_SECRET!)
    return decoded
  } catch {
    return null
  }
}
