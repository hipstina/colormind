const Router = require('express').Router()
const ColorComboRouter = require('./ColorComboRouter')

const CollectionRouter = require('./CollectionRouter')

Router.use('/api', ColorComboRouter)

Router.use('/api', CollectionRouter)
module.exports = Router
