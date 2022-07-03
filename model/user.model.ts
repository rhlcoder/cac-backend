import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import config from 'config'

// define typescript User interfaces
export interface UserInput {
  email: string
  name: string
  password: string
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date
  updatedAt: Date
  comparePassword: (candidatePassword: string) => Promise<Boolean>
}

// define the User model schema
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

// pre hook to hash the password before saving
userSchema.pre('save', async function (next) {
  const user = this as UserDocument

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next()
  }

  const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'))

  const hash = await bcrypt.hashSync(user.password, salt)

  user.password = hash

  return next()
})

// method to compare password to hashed password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument

  return await bcrypt.compare(candidatePassword, user.password).catch(e => false)
}

// Implement and export the User model
const UserModel = mongoose.model<UserDocument>('User', userSchema)

export default UserModel
