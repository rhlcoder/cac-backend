import mongoose from 'mongoose'
import config from 'config'
import logger from './logger'

const dbUri = config.get<string>('dbUri')

const connectDb = async (): Promise<void> => {
  logger.info(`Connecting to: ${dbUri}`)
  try {
    await mongoose.connect(dbUri, {
      serverSelectionTimeoutMS: 1000
    })
    logger.info(`Connected to: ${dbUri}`)
  } catch (e) {
    e instanceof Error // para que typescript reconozca el tipo de error
      ? logger.error(`Couldn't connect to DB\n${e.stack ?? ''}`)
      : logger.error('Unknown error:', e)
    process.exit(1)
  }
}

export default connectDb
