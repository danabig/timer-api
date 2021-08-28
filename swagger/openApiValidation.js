const path = require('path')

const swaggerFilePath = path.join(__dirname, '..', 'docs', 'swagger', 'timer-api.yaml')

const OpenApiValidator = require('express-openapi-validator')
const openApiValidatorMiddleware = OpenApiValidator.middleware({
  apiSpec: swaggerFilePath,
  validateRequests: {
    allowUnknownQueryParameters: true
  },
})

module.exports = {
  openApiValidatorMiddleware,
}
