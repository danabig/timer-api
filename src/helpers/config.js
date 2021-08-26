import dotenv from 'dotenv'
import convict from 'convict'
import { ipaddress } from 'convict-format-with-validator'
convict.addFormat(ipaddress)

dotenv.config()

export const config = convict({
  logLevel: { 
      doc: 'Set the logging level for the application.',
      format: ['debug', 'info', 'log', 'warn', 'error', 'trace'],
      default: 'info',
      env: 'LOG_LEVEL'
  },
  env: {
      doc: 'The application environment.',
      format: ['production', 'development', 'test'],
      default: 'development',
      env: 'NODE_ENV'
  },
  ip: {
      doc: 'The IP address to bind.',
      format: 'ipaddress',
      default: '127.0.0.1',
      env: 'IP_ADDRESS',
  },
  port: {
      doc: 'The port to bind.',
      format: 'port',
      default: 3000,
      env: 'PORT',
      arg: 'port'
  },
  mongoUri: {
      doc: 'The URI of mongodb cluster.',
      format: String,
      default: '',
      env: 'MONGO_URI',
  },
})

// Perform validation
config.validate({ allowed: 'strict' })
