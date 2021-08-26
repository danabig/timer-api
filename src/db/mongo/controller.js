import uuid from 'uuid'
import { mongoClient } from './client'

const database = mongoClient.db('timers_test')
const timers = database.collection('timers')

class DbController {
  constructor() {

  }

  async addTimer(payload) {
    payload._id = uuid.v4()
    const result = await timers.insertOne(payload)
    return result
  }

  async getTimer(id) {
    const result = await timers.findOne({ _id: id })
    return result
  }
}

export const dbController = new DbController()