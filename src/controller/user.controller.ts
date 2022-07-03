import { Request, Response } from 'express'
import logger from '../utils/logger'
import { createUser } from '../service/user.service'

export async function createUserHandler (req: Request, res: Response) {
  try {
    // call createUser function from user.service.ts
    const user = await createUser(req.body)
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
