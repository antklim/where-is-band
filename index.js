#!/usr/bin/env node

const App = require('./src/app')
const router = require('./src/router')

const config = { router, port: process.env.PORT }
const app = new App(config)
app.init().start()
