const request = require('supertest')

const App = require('@src/app')
const router = require('@src/router')

const app = new App({ router }).init()

describe('App integration test', () => {
  test('GET /info - 200', async () => {
    const response = await request(app.app.callback()).get('/info')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'Where is band service, v0.1.0' })
  })

  test('GET /blah - 404', async () => {
    const response = await request(app.app.callback()).get('/blah')
    expect(response.status).toBe(404)
  })
})
