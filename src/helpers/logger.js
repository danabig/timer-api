import bunyan from 'bunyan'
import * as packageJson from '../../package.json'
import { config } from './config'

import bunyanMiddleware from 'bunyan-middleware'

const logSettings = {
    name: packageJson.name,
    level: config.get('logLevel'),
    formatter: "pretty"
}

export const logger = bunyan.createLogger(logSettings)

// Set up the monkey patching

logger.warn('- console.(debug|info|log|warn|error) monkey-patched');
const methods = ['debug', 'info', 'warn', 'error', 'trace'];

methods.forEach((logLevel) => {
    console[logLevel] = function () {
        logger[logLevel].apply(logger, arguments);
    }
})

export const setupMiddleware = (app) => {
    app.use(bunyanMiddleware(
        {
            headerName: 'X-Request-Id', 
            propertyName: 'reqId',
            logName: 'req_id', 
            obscureHeaders: ['Authorization'], 
            logger: logger
        }
    ))
}
