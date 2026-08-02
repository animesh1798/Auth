import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import data from "./data/db";
import { User } from "./data/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


interface CredentialsProp {
  email: string;
  password: string;
}

interface RegUserProp extends CredentialsProp {
    name: string
}

interface JwtPayload {
  id: string;
  email: string;
}

const db = structuredClone(data);
dotenv.config();
const app: Express = express();

app.use(cors());
app.use(express.json());

const registerValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  next();
};

const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email/Password cannot be empty" });
   
  }
  next();
};

const generateToken = (loginUser: JwtPayload) => {
  return jwt.sign(loginUser, process.env.JWT_SECRET!, {
    algorithm: "HS256",
    expiresIn: "15m",
  });
};

app.post("/register", registerValidation, async (req, res) => {
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
});

app.post("/login", loginValidation, async (req: Request, res: Response) => {
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
});

app.listen(3000, () => console.log("Server running on port 3000"));
