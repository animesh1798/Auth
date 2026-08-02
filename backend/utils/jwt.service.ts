import jwt from 'jsonwebtoken'
import { JwtPayload } from '../types/types';
import dotenv from "dotenv";


dotenv.config();


export const generateToken = (loginUser: JwtPayload) => {
  return jwt.sign(loginUser, process.env.JWT_SECRET!, {
    algorithm: "HS256",
    expiresIn: "15m",
  });
};
