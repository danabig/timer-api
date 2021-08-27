import schedule from 'node-schedule'
import { dbController } from '../db/mongo/controller'
import { sendWebhook } from './webhooks'

export const getScheduledDate = (timer) => {
  const scheduledDate = new Date(timer.created + timer.seconds * 1000 + timer.minutes * 60000 + timer.hours * 3600000)
  return scheduledDate
}

export const scheduleTimerJob = (timer, task) => {
  const timeLeftSeconds = getTimeLeftSeconds(timer)
  if (timeLeftSeconds > 0) {
    const scheduledDate = getScheduledDate(timer)
    schedule.scheduleJob(scheduledDate, () => {
      console.log(`Timer ${timer._id} is activated`)
      task(timer)
      handleTrigger(timer)
    })
    console.log(`${timer._id} is set`)
  } else {
    console.log(`${timer._id} should be immediatly invoked`)
    setTimeout(() => {
      task()
      handleTrigger(timer)
    }, 0)
  }
}

export const syncExistingTimers = (existingTimers) => {
  console.log(`synching timers`)
  existingTimers.forEach((timer) => {
    console.log(`synching timer ${timer._id}`)
    scheduleTimerJob(timer, (timer) => sendWebhook(timer))
  })
}

const handleTrigger = async (timer) => {
  await dbController.setAsTriggered(timer._id)
}

export const getTimeLeftSeconds = (timer) => {
  const now = new Date(Date.now())
  const scheduledDate = getScheduledDate(timer)

  const delta = scheduledDate - now 
  return parseInt(delta/1000)
}