import { MongoClient } from 'mongodb'
import { config } from '../../helpers/config'

const mongoUri = config.get('mongoUri')
export const mongoClient = new MongoClient(mongoUri)