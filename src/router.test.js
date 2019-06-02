const koaRouter = require('koa-router')
const router = require('./router')

describe('Router unit test', () => {
  test('router is an instance of koa-router', () => {
    expect(router).toBeInstanceOf(koaRouter)
    expect(router.stack).toHaveLength(3)
  })

  test('router exposes /info route', () => {
    const handler = router.stack.find((s) => s.name === 'info')
    expect(handler).toBeDefined()
    expect(handler.path).toBe('/info')
  })

  test('router exposes /songs/:name route', () => {
    const handler = router.stack.find((s) => s.name === 'songsByName')
    expect(handler).toBeDefined()
    expect(handler.path).toBe('/songs/:name')
  })

  test('router exposes /artists/:name route', () => {
    const handler = router.stack.find((s) => s.name === 'songsByArtist')
    expect(handler).toBeDefined()
    expect(handler.path).toBe('/artists/:name')
  })
})
