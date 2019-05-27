const router = require('koa-router')()

router.get('/info', (ctx) => {
  ctx.body = { message: 'Where is band service, v0.1.0' }
})

module.exports = router
