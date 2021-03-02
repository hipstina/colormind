const Router = require('express').Router()
const ColorComboController = require('../controllers/ColorComboController')

Router.delete('/delete/:combo_id', ColorComboController.deleteCombo)
Router.post('/add', ColorComboController.createColorCombo)
Router.get('/find/:combo_id', ColorComboController.getCombo)

module.exports = Router
