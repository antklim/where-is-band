jest.mock('@src/provider')
const provider = require('@src/provider')

const request = require('supertest')

const App = require('@src/app')
const router = require('@src/router')

const app = new App({ router }).init()

describe('App integration test', () => {
  test('GET /info 200 - SUCCESS', async () => {
    const response = await request(app.app.callback()).get('/info')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'Where is band service, v0.1.0' })
  })

  test('GET /blah 404 - Method not allowed', async () => {
    const response = await request(app.app.callback()).get('/blah')
    expect(response.status).toBe(404)
  })

  describe('GET /songs/:name', () => {
    test('200 - SUCCESS', async () => {
      const providerResponse = [
        {
          id: 51127,
          type: 'Song',
          title: 'The Show Must Go On',
          artist: {
            id: 55,
            type: 'Artist',
            nameWithoutThePrefix: 'Queen',
            useThePrefix: false,
            name: 'Queen'
          },
          chordsPresent: true,
          tabTypes: ['PLAYER', 'TEXT_GUITAR_TAB', 'CHORDS', 'TEXT_BASS_TAB']
        }
      ]
      provider.searchByName = jest.fn().mockResolvedValueOnce(providerResponse)

      const response = await request(app.app.callback()).get('/songs/show')
      expect(response.status).toBe(200)
      expect(response.body).toEqual({ songsList: providerResponse })
      expect(provider.searchByName).toHaveBeenCalledTimes(1)
      expect(provider.searchByName).toHaveBeenNthCalledWith(1, 'show')
    })

    test('401 - SERVICE ERROR', async () => {
      const error = new Error('Unauthorized')
      error.name = 'StatusCodeError'
      error.statusCode = 401
      error.error = 'Unauthorized'
      provider.searchByName = jest.fn().mockRejectedValueOnce(error)

      const response = await request(app.app.callback()).get('/songs/show')
      expect(response.status).toBe(401)
      expect(response.text).toBe('Unauthorized')
    })

    test('500 - REQUEST TIMEOUT', async () => {
      const error = new Error('Socket timeout')
      error.name = 'RequestError'
      error.cause = { code: 'ESOCKETTIMEDOUT' }
      provider.searchByName = jest.fn().mockRejectedValueOnce(error)

      const response = await request(app.app.callback()).get('/songs/show')
      expect(response.status).toBe(500)
      expect(response.text).toBe('Service is unavailable')
    })
  })

  describe('GET /artists/:name', () => {
    test('200 - SUCCESS', async () => {
      const providerResponse = [
        {
          id: 19,
          type: 'Song',
          title: 'Enter Sandman',
          artist: {
            id: 20,
            type: 'Artist',
            nameWithoutThePrefix: 'Metallica',
            useThePrefix: false,
            name: 'Metallica'
          },
          chordsPresent: true,
          tabTypes: ['PLAYER', 'TEXT_GUITAR_TAB', 'CHORDS', 'TEXT_BASS_TAB']
        }
      ]
      provider.searchByArtist = jest.fn().mockResolvedValueOnce(providerResponse)

      const response = await request(app.app.callback()).get('/artists/metallica')
      expect(response.status).toBe(200)
      expect(response.body).toEqual({ songsList: providerResponse })
      expect(provider.searchByArtist).toHaveBeenCalledTimes(1)
      expect(provider.searchByArtist).toHaveBeenNthCalledWith(1, 'metallica')
    })

    test('401 - SERVICE ERROR', async () => {
      const error = new Error('Unauthorized')
      error.name = 'StatusCodeError'
      error.statusCode = 401
      error.error = 'Unauthorized'
      provider.searchByArtist = jest.fn().mockRejectedValueOnce(error)

      const response = await request(app.app.callback()).get('/artists/metallica')
      expect(response.status).toBe(401)
      expect(response.text).toBe('Unauthorized')
    })

    test('500 - REQUEST TIMEOUT', async () => {
      const error = new Error('Socket timeout')
      error.name = 'RequestError'
      provider.searchByArtist = jest.fn().mockRejectedValueOnce(error)

      const response = await request(app.app.callback()).get('/artists/metallica')
      expect(response.status).toBe(500)
      expect(response.text).toBe('Internal Server Error')
    })
  })
})
