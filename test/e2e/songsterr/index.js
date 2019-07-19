const router = require('koa-router')()
const fixtures = require('../fixtures/songsterr')

const songsByName = (ctx) => {
  const { pattern } = ctx.query

  if (pattern && pattern.startsWith('5xx')) {
    ctx.throw(500, 'Internal Server Error')
  }

  ctx.body = fixtures.songs()
}

const songsByArtist = (ctx) => {
  const { artists } = ctx.query

  if (artists && artists.startsWith('5xx')) {
    ctx.throw(500, 'Internal Server Error')
  }

  ctx.body = fixtures.songsByArtist()
}

router.get('/songs.json', songsByName)
router.get('/songs/byartists.json', songsByArtist)

module.exports = router
