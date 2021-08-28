import express from 'express'
import helmet from 'helmet'
import { timerRouter } from './src/routes/timerRouter'
import { setupMiddleware } from './src/helpers/logger'
import { openApiValidatorMiddleware } from './swagger/openApiValidation'

export const app = express()
app.use(express.json())
app.use(helmet())
setupMiddleware(app)
app.use(openApiValidatorMiddleware)
app.use('/timers', timerRouter)

// Catch all just in case (although nothing should get here)
app.get('*', (req, res) => {
  res.status(404)
})
