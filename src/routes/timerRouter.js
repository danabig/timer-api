import express from 'express'
import { dbController } from '../db/mongo/controller'
import { scheduleTimerJob } from '../helpers/scheduler'

export const timerRouter = express.Router()

timerRouter.post('/', async (req, res) => {
  const { hours, minutes, seconds, url } = req.body

  const payload = { hours, minutes, seconds, url }
  payload.created = Date.now()
  const newTimerAck = await dbController.addTimer(payload)
  scheduleTimerJob(payload)
  res.status(201).send({ id: payload._id })
})

timerRouter.get('/:timerId', async (req, res) => {
  const { timerId } = req.params
  const newTimer = await dbController.getTimer(timerId)
  res.status(200).send(newTimer)
})
