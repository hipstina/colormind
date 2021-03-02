const Router = require('express').Router()
const ColorComboController = require('../controllers/ColorComboController')

Router.get('/view/:combo_id', ColorComboController.findColorCombo)
Router.post('/add/:combo_id', ColorComboController.createColorCombo)

module.exports = Router
