const ColorRouter = require('express').Router()
const colorController = require('../controllers/ColorController')

ColorRouter.get('/find/:color_id', colorController.findColor)
ColorRouter.post('/add/:color_id', colorController.createColor)
ColorRouter.delete('/remove/:color_id', colorController.deleteColor)
// ColorRouter.update('/edit/:color_id', colorController.editColor)

module.exports = ColorRouter
