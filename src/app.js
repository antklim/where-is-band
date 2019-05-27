const http = require('http')
const debug = require('debug')
const Koa = require('koa')
const koaBody = require('koa-body')
const koaMorgan = require('koa-morgan')

module.exports = App

function App(config = {}) {
  if (!(this instanceof App)) {
    return new App(config)
  }

  this.config = config
  this.log = debug('app')
}

App.prototype.init = function() {
  this.app = new Koa()

  this.app.use(
    koaMorgan('combined', {
      skip: () => process.env.NODE_ENV === 'test'
    })
  )

  this.app.use(koaBody({ parsedMethods: ['POST', 'PUT', 'PATCH'] }))

  const { router } = this.config
  router && this.app.use(router.routes()) && this.app.use(router.allowedMethods())

  this.app.on('error', (err, ctx) => {
    this.log('Application error', err, ctx)
  })

  return this
}

App.prototype.start = function() {
  const port = this.config.port || 3000
  this.server = http.createServer(this.app.callback())
  this.server.listen(port, () => {
    this.log(`Application is listening on port: ${port}`)
  })
}

App.prototype.stop = function() {
  this.server && this.server.close()
}
