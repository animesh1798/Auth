import jwt, { JwtPayload } from 'jsonwebtoken'
import { TokenPayload } from '../types/types';


export const generateToken = (loginUser: TokenPayload) => {
  return jwt.sign(loginUser, process.env.JWT_SECRET!, {
    algorithm: "HS256",
    expiresIn: "15m",
  });
};


export const validateToken = (jwtToken: string) => {
  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET!)
    return decoded
  } catch {
    return false
  }
}
