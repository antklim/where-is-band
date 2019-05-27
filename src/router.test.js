const koaRouter = require('koa-router')
const router = require('./router')

describe('Router test', () => {
  test('router handles /info route', () => {
    expect(router).toBeInstanceOf(koaRouter)
    expect(router.stack).toHaveLength(1)
    expect(router.stack[0].path).toEqual('/info')
  })
})
