#!/usr/bin/env node

const App = require('./app')
const router = require('./router')

const config = { router, port: process.env.PORT }
const app = new App(config)
app.init().start()
