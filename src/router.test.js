const koaRouter = require('koa-router')
const router = require('./router')

describe('Router unit test', () => {
  test('router exposes /info route', () => {
    expect(router).toBeInstanceOf(koaRouter)
    expect(router.stack).toHaveLength(1)
    expect(router.stack[0].path).toBe('/info')
  })
})
