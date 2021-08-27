import express from 'express'
import { dbController } from '../db/mongo/controller'
import { getTimeLeftSeconds, scheduleTimerJob } from '../helpers/scheduler'
import { sendWebhook } from '../helpers/webhooks'

export const timerRouter = express.Router()

timerRouter.post('/', async (req, res) => {
  const { hours, minutes, seconds, url } = req.body

  const payload = { hours, minutes, seconds, url }
  payload.created = Date.now()
  payload.triggered = false
  const newTimerAck = await dbController.addTimer(payload)
  scheduleTimerJob(payload, (payload) => sendWebhook(payload))
  res.status(201).send({ id: payload._id })
})

timerRouter.get('/:timerId', async (req, res) => {
  const { timerId } = req.params
  const timer = await dbController.getTimer(timerId)
  const timeLeftSeconds = getTimeLeftSeconds(timer)
  res.status(200).send({ id: timer._id, time_left: Math.max(timeLeftSeconds, 0) })
})
