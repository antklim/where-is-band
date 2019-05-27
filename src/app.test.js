const http = require('http')
const Koa = require('koa')
const App = require('./app')

describe('App test', () => {
  test('constructor returns an instance of App', () => {
    const appOne = new App()
    const appTwo = App({ port: 4000 })

    expect(appOne).toBeInstanceOf(App)
    expect(appOne.config).toEqual({})
    expect(appOne.log).toBeInstanceOf(Function)
    expect(appTwo).toBeInstanceOf(App)
    expect(appTwo.config).toEqual({ port: 4000 })
    expect(appTwo.log).toBeInstanceOf(Function)
  })

  test('init() creates an instance of Koa app', () => {
    const app = new App().init()
    expect(app).toBeInstanceOf(App)
    expect(app.app).toBeInstanceOf(Koa)
    expect(app.app.middleware).toHaveLength(2)
  })

  test.todo('init() should attach router to app when provided in config')

  test('start() starts http server', () => {
    const app = new App().init()
    app.start()
    expect(app.server).toBeInstanceOf(http.Server)
    app.stop()
  })
})
