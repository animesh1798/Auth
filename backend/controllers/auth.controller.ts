import type {NextFunction, Request, Response} from 'express'
import bcrypt from 'bcrypt'
import type { RegUserProp, User, CredentialsProp, TokenPayload } from "../types/types.js";
import { generateAccessToken, generateRefreshToken, validateAccessToken, validateRefreshToken } from '../utils/jwt.service.js';
import { prisma } from '../services/db.services.js'
import type { JwtPayload } from 'jsonwebtoken';


const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: true,
};




/// REGISTRATION
export const register = async (req: Request, res: Response) => {
  const regUser: RegUserProp = req.body;
  const userFound = await prisma.user.findUnique({
      where: {email: regUser.email}
    })

    if (userFound) {
      return res.status(409).json(`User already exists`);
    }
  
    const password = await bcrypt.hash(regUser.password, 10);

    const addUser = await prisma.user.create({
      data: {
        name: regUser.name,
        email: regUser.password,
        password: password
      }
    })
    
    if (addUser) return res.status(201).json({ message: "Successfully added User"});
    else return res.status(500).json({message: "Some error occured"})
};






/// LOGIN
export const login = async (req: Request, res: Response) => {
  const credentials: CredentialsProp = req.body;

  let found = await prisma.user.findFirst({
    where: {email: credentials.email}
  })

  if ( !found ) return res.status(401).json({ message: "Invalid email or password" });

  const success =
    found && (await bcrypt.compare(credentials.password, found.password));

  if (success) {
    const accessToken = generateAccessToken({ id: String(found.id), email: found.email });
    


    const createSession = await prisma.session.create({
      data: {
        user_id: found.id,
        refreshTokenHash: "",
        expiresIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      }
    })
    
    const refreshToken = generateRefreshToken({session_id: createSession.id });

    const updateRefreshToken = await prisma.session.update({
      where: {id: createSession.id},
      data : {refreshTokenHash: refreshToken}
    })
    
    if (!createSession) return res.status(500).json({message: "Unknown error occured"})

    res.cookie("accessToken", accessToken, cookieOptions)
    res.cookie("refreshToken", refreshToken, cookieOptions)
    
    return res.status(200).json({
      message: "Login Success",
    });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
};




export const getUser = (req: Request, res: Response) => {
  const {id, email} = req.body
  return res.status(200).json({message: {
    userId: id
  }})
}







export const logout = async (req: Request, res: Response) => {

  const {refreshToken} = req.cookies
  const session = validateRefreshToken(refreshToken) as JwtPayload

  if (!session) return res.status(500).json({message: "Some error occured"})

  res.clearCookie("accessToken", cookieOptions)
  res.clearCookie("refreshToken", cookieOptions)

  const removeSession = await prisma.session.delete({
    where: {id: session.session_id}
  })

  res.status(200).json({message: "Logged Out"})
}