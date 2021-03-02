const PaletteRouter = require('express').Router()
const paletteController = require('../controllers/PaletteController')

PaletteRouter.get('/view/:palette_id', paletteController.findPalette)
PaletteRouter.post('/add/:palette_id', paletteController.createPalette)
PaletteRouter.delete('/remove/:palette_id', paletteController.deletePalette)
// PaletteRouter.update('/edit/:palette_id', paletteController.editPalette)

module.exports = PaletteRouter
