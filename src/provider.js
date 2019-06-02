const debug = require('debug')('app:provider')
const request = require('request-promise-native')

const baseUrl = process.env.DOWNSTREAM_API_URL

const requestDefaults = {
  baseUrl,
  resolveWithFullResponse: true,
  time: process.env.DEBUG_REQUEST_TIMINGS,
  timeout: process.env.REQUEST_TIMEOUT ? +process.env.REQUEST_TIMEOUT : null
}

exports.searchByName = async (namePattern) => {
  const opts = {
    ...requestDefaults,
    uri: 'songs.json',
    qs: { pattern: namePattern }
  }
  const resp = await request.get(opts)
  debug(`response:\n${JSON.stringify(resp, null, 2)}`)
  debug(`response timings:\n${JSON.stringify(resp.timings, null, 2)}`)
  debug(`response timing phases:\n${JSON.stringify(resp.timingPhases, null, 2)}`)
  return resp.body
}

exports.searchByArtist = async (artistName) => {
  const opts = {
    ...requestDefaults,
    uri: '/songs/byartists.json',
    qs: { artists: artistName }
  }
  const resp = await request.get(opts)
  debug(`response:\n${JSON.stringify(resp, null, 2)}`)
  debug(`response timings:\n${JSON.stringify(resp.timings, null, 2)}`)
  debug(`response timing phases:\n${JSON.stringify(resp.timingPhases, null, 2)}`)
  return resp.body
}
