import express , { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import data from './data/db'
import { User } from './data/users'
import bcrypt from 'bcrypt'

interface regUserProp {
    name: string,
    email: string,
    password: string,
}

interface credentialsProp {
    email: string,
    password: string
}

const db = structuredClone(data)

const app: Express = express()

app.use(cors())
app.use(express.json())

const validateRegUser = (req: Request, res: Response, next: NextFunction) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  next();
};

app.post("/register", validateRegUser, async (req, res) => {
    const regUser: regUserProp = req.body
    
    
    if (db.find(user => user.email === regUser.email)){
        res.status(409).json(`User already exists`)
        return 
    }
    
    const password = await bcrypt.hash(regUser.password, 10); 

    const newUser: User = {
        id: (db.at(-1)?.id ?? 0) + 1,
        ...regUser,
        password
    }
    db.push(newUser)
    res.status(201).send("Successfully added User")

})


app.post("/login", async (req: Request, res: Response) => {
    const credentials:credentialsProp = req.body
    let found = db.find(user => user.email===credentials.email)
    
    const success = found && await bcrypt.compare(credentials.password, found?.password)
    
    if (success) {
        res.status(200).json({message: "Login Success"})
    }
    else{
        res.status(401).json({message: "Credentials not found"})
    }

})




app.listen(3000, () => console.log("Server running on port 3000"))