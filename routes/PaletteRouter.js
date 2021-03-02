const Router = require('express').Router()
const PaletteController = require('../controllers/PaletteController')

Router.get('/view/:palette_id', PaletteController.findPalette)
Router.post('/add/:palette_id', PaletteController.createPalette)
Router.delete('/remove/:palette_id', PaletteController.deletePalette)
// Router.update('/edit/:palette_id', PaletteController.editPalette)

module.exports = Router
