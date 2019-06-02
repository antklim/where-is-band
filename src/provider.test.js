jest.mock('request-promise-native')
const request = require('request-promise-native')

describe('Provider unit test', () => {
  let provider
  beforeAll(() => {
    process.env.DOWNSTREAM_API_URL = 'http://test.com'
    provider = require('./provider')
  })

  afterAll(() => {
    delete process.env.DOWNSTREAM_API_URL
  })

  describe('searchByName() tests', () => {
    test('calls resource API with valid options', async () => {
      request.get = jest.fn().mockResolvedValueOnce({ statusCode: 200 })
      await provider.searchByName('show')
      expect(request.get).toHaveBeenCalledTimes(1)
      const [opts] = request.get.mock.calls[0]
      expect(opts).toEqual({
        baseUrl: 'http://test.com',
        resolveWithFullResponse: true,
        timeout: null,
        uri: 'songs.json',
        qs: { pattern: 'show' }
      })
    })

    test('returns response from the resource API', async () => {
      const resourceResponse = [
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
      request.get = jest.fn().mockResolvedValueOnce({
        statusCode: 200,
        body: resourceResponse
      })
      const songsList = await provider.searchByName('show')
      expect(songsList).toEqual(resourceResponse)
    })

    test('throws exception when request fails', async () => {
      request.get = jest.fn().mockRejectedValueOnce(new Error('Internal service error'))
      await expect(provider.searchByName('show')).rejects.toThrow('Internal service error')
    })
  })

  describe('searchByArtist() tests', () => {
    test('calls resource API with valid options', async () => {
      request.get = jest.fn().mockResolvedValueOnce({ statusCode: 200 })
      await provider.searchByArtist('metallica')
      expect(request.get).toHaveBeenCalledTimes(1)
      const [opts] = request.get.mock.calls[0]
      expect(opts).toEqual({
        baseUrl: 'http://test.com',
        resolveWithFullResponse: true,
        timeout: null,
        uri: '/songs/byartists.json',
        qs: { artists: 'metallica' }
      })
    })

    test('returns response from the resource API', async () => {
      const resourceResponse = [
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
      request.get = jest.fn().mockResolvedValueOnce({
        statusCode: 200,
        body: resourceResponse
      })
      const songsList = await provider.searchByArtist('metallica')
      expect(songsList).toEqual(resourceResponse)
    })

    test('throws exception when request fails', async () => {
      request.get = jest.fn().mockRejectedValueOnce(new Error('Internal service error'))
      await expect(provider.searchByArtist('metallica')).rejects.toThrow('Internal service error')
    })
  })
})
