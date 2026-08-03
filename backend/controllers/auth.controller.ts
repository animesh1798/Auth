import {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import { RegUserProp, User, CredentialsProp, TokenPayload } from "../types/types";
import { generateAccessToken, generateRefreshToken, validateAccessToken, validateRefreshToken } from '../utils/jwt.service';
import data from '../data/db'

const db = structuredClone(data);

/// REGISTRATION
export const register = async (req: Request, res: Response) => {
  const regUser: RegUserProp = req.body;
  
    if (db.find((user) => user.email === regUser.email)) {
      return res.status(409).json(`User already exists`);
    }
  
    const password = await bcrypt.hash(regUser.password, 10);
  
    const newUser: User = {
      id: (db.at(-1)?.id ?? 0) + 1,
      ...regUser,
      password,
    };
    db.push(newUser);
  
    return res.status(201).json({ message: "Successfully added User"});
};

/// LOGIN
export const login = async (req: Request, res: Response) => {
  const credentials: CredentialsProp = req.body;

  let found = db.find((user) => user.email === credentials.email);

  const success =
    found && (await bcrypt.compare(credentials.password, found.password));

  if (success) {
    const accessToken = generateAccessToken({ id: String(found.id), email: found.email });
    const refreshToken = generateRefreshToken({id: String(found.id), email:found.email }) 
    
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: true
    })
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: true
    })
    
    return res.status(200).json({
      message: "Login Success",
    });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
};


export const getUser = (req: Request, res: Response) => {
  let {accessToken, refreshToken} = req.cookies
  const validAccessToken = validateAccessToken(accessToken??"")
  const validRefreshToken = validateRefreshToken(refreshToken??"")
  
  if (!validAccessToken && !validRefreshToken) return res.status(401).json({message : "Session expired. Login again."})
  if (!validAccessToken && validRefreshToken){
    const {id, email} = validRefreshToken
    accessToken = generateAccessToken({id, email})
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: true,
    });
  }
  return res.status(200).json({
    message: "Login Success",
  });
}