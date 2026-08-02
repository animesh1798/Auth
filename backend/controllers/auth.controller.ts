import {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import { RegUserProp, User, CredentialsProp } from "../types/types";
import { generateToken } from '../utils/jwt.service';
import data from '../data/db.ts'

const db = structuredClone(data);


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
  
    const token = generateToken({ id: String(newUser.id), email: newUser.email });
  
    return res.status(201).json({ message: "Successfully added User", token });
};


export const login = async (req: Request, res: Response) => {
  const credentials: CredentialsProp = req.body;

  let found = db.find((user) => user.email === credentials.email);

  const success =
    found && (await bcrypt.compare(credentials.password, found.password));

  if (success) {
    const token = generateToken({ id: String(found.id), email: found.email });
    return res.status(200).json({
      message: "Login Success",
      token,
    });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
};
