import { mongoClient } from './client'

const database = mongoClient.db('timers_test')
const timers = database.collection('timers')

class DbController {
  
  constructor() {
    this.entriesCount = 0
  }

  async init() {
    await mongoClient.connect()
    //counting the timers for creating id, 
    //it assumes that it is a single server, the event loop is taking care of the integrity
    const cursor = await this.getAllTimers()
    this.entriesCount = await cursor.count()
  }

  async destroyConnection() {
    await mongoClient.close()
  }

  setCount(count) {
    this.entriesCount = count
  }

  getCount() {
    return this.entriesCount
  }

  async addTimer(payload) {
    payload._id = ++this.entriesCount
    const result = await timers.insertOne(payload)
    return result
  }

  async getTimer(id) {
    const result = await timers.findOne({ _id: id })
    return result
  }

  async getExistingTimers() {
    const findResult = await timers.find({
      triggered: false,
    })
    return findResult
  }

  async getAllTimers() {
    const findResult = await timers.find()
    return findResult
  }


  async setAsTriggered(id) {
    const filter = { _id: id };
    const updateDocument = {
      $set: {
          triggered: true,
      },
    };
    const result = await timers.updateOne(filter, updateDocument)
    return result
  }
}

export const dbController = new DbController()