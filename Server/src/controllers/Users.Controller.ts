import { Request, Response, NextFunction } from 'express'
import { userService } from '~/services/Users.Services'

export const helloController = async (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: 'Hello World' })
}

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  const { userName, password } = req.body
  console.log(userName, password)
  const result = await userService.login(userName, password)
  if (result) {
    return res.status(200).json({ message: 'Login successful' })
  } else {
    return res.status(401).json({ message: 'Login failed' })
  }
}
