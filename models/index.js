const { model } = require('mongoose')
const ColorComboSchema = require('./ColorCombo')
const CollectionSchema = require('./Collection')

const ColorCombo = model('colorCombos', ColorComboSchema)
const Collection = model('collections', CollectionSchema)

module.exports = {
  ColorCombo,
  Collection
}
