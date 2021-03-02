const Router = require('express').Router()
const ColorRouter = require('./ColorRouter')
const ColorComboRouter = require('./ColorComboRouter')
const PaletteRouter = require('./PaletteRouter')
const CollectionRouter = require('./CollectionRouter')

Router.use('/api', ColorRouter)
Router.use('/api', ColorComboRouter)
Router.use('/api', PaletteRouter)
Router.use('/api', CollectionRouter)
module.exports = Router
