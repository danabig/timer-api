import express from 'express'
import { dbController } from '../db/mongo/controller'

export const timerRouter = express.Router()

timerRouter.post('/', async (req, res) => {
  const { hours, minutes, seconds, url } = req.body
  const newTimer = await dbController.addTimer({ hours, minutes, seconds, url })
  console.log(newTimer)
  res.end()
})

timerRouter.get('/:timerId', async (req, res) => {
  const { timerId } = req.params
  const newTimer = await dbController.getTimer(timerId)
  res.status(200).send(newTimer)
})
