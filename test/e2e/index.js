#!/usr/bin/env node

/**
 * This is a downstream services mock API starter.
 */

const App = require('../../src/app')
const router = require('./songsterr')

const config = { router, port: process.env.PORT }
const app = new App(config)
app.init().start()
