const Router = require('express').Router()
const ColorComboController = require('../controllers/ColorComboController1')

Router.delete('/delete/combo/:combo_id', ColorComboController.deleteCombo)
Router.post('/create', ColorComboController.createCombo)
Router.get('/find/combo/:combo_id', ColorComboController.getComboById)
Router.get('/find/combos/', ColorComboController.getCombos)

module.exports = Router
