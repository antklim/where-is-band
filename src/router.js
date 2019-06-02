const debug = require('debug')('app:router')
const router = require('koa-router')()
const provider = require('./provider')

const DEFAULT_STATUS_CODE = 500
const DEFAULT_ERROR_MESSAGE = 'Internal service error'

const errorResponseHandler = (error) => {
  let statusCode = DEFAULT_STATUS_CODE
  let message = DEFAULT_ERROR_MESSAGE

  debug(error)

  switch (error.name) {
    case 'RequestError':
      message =
        error.cause.code && error.cause.code.includes('TIMEDOUT') ? 'Service is unavailable' : DEFAULT_ERROR_MESSAGE
      break
    case 'StatusCodeError':
      statusCode = error.statusCode
      message = error.error
      break
    default:
      debug(`unsupported error type ${error.name}`)
      break
  }

  const resp = { statusCode, error: message }
  debug(`response: ${JSON.stringify(resp, null, 2)}`)
  return resp
}

router.get('info', '/info', (ctx) => {
  ctx.body = { message: 'Where is band service, v0.1.0' }
})

router.get('songsByName', '/songs/:name', async (ctx) => {
  try {
    const songsList = await provider.searchByName(ctx.params.name)
    ctx.body = { songsList }
  } catch (err) {
    const { statusCode, error } = errorResponseHandler(err)
    ctx.status = statusCode
    ctx.message = error
  }
})

router.get('songsByArtist', '/artists/:name', async (ctx) => {
  try {
    const songsList = await provider.searchByArtist(ctx.params.name)
    ctx.body = { songsList }
  } catch (err) {
    const { statusCode, error } = errorResponseHandler(err)
    ctx.status = statusCode
    ctx.message = error
  }
})

module.exports = router
