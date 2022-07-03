import { DocumentDefinition } from 'mongoose'
import UserModel, { UserDocument } from '../../model/user.model'

export async function createUser (input: DocumentDefinition<UserDocument>) {
  try {
    return await UserModel.create(input)
  } catch (e) {
    throw new Error(e)
  }
}
