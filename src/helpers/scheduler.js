import schedule from 'node-schedule'

export const scheduleTimerJob = (timer) => {
  const scheduleDate = new Date(timer.created + timer.seconds * 1000 + timer.minutes * 60000 + timer.hours * 3600000)
  schedule.scheduleJob(scheduleDate, () => {
    console.log(`Timer ${timer._id} is activated`)
  })
}