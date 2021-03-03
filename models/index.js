const { model } = require('mongoose')
const ColorSchema = require('./Color')
const ColorComboSchema = require('./ColorCombo')
// const PaletteSchema = require('./Palette')
const CollectionSchema = require('./Collection')

const Color = model('colors', ColorSchema)
const ColorCombo = model('colorCombos', ColorComboSchema)
// const Palette = model('palettes', PaletteSchema)
const Collection = model('collections', CollectionSchema)

module.exports = {
  Color,
  ColorCombo,
  // Palette,
  Collection
}
