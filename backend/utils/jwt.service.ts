import jwt from 'jsonwebtoken'
import { JwtPayload } from '../types/types';


export const generateToken = (loginUser: JwtPayload) => {
  return jwt.sign(loginUser, process.env.JWT_SECRET!, {
    algorithm: "HS256",
    expiresIn: "15m",
  });
};
