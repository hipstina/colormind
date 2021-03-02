const ColorComboRouter = require('express').Router()
const colorComboController = require('../controllers/ColorComboController')

ColorComboRouter.get('/view/:combo_id', colorComboController.findColorCombo)
ColorComboRouter.post('/add/:combo_id', colorComboController.createColorCombo)

module.exports = ColorComboRouter
