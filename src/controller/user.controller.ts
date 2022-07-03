import { Request, Response } from 'express'
import logger from '../utils/logger'

export function createUserHandler (req: Request, res: Response) {
  try {
    // call createUser function from user.service.ts
    // TODO: implement createUser function
  } catch (e) {
    if (e instanceof Error) {
      logger.error(e)
      return res.status(409).send(e.message)
    } else {
      logger.error(e)
      return res.status(409).send('Error creating user')
    }
  }
}
