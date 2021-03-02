const { Schema } = require('mongoose')
// const Schema = mongoose.Schema

module.export = new Schema(
  {
    alias: {
      type: String,
      required: true
    },
    color_id: [
      {
        type: Schema.Types.ObjectId,
        ref: 'colors'
      }
    ],
    color_combos_id: [
      {
        type: Schema.Types.ObjectId,
        ref: 'colorCombos'
      }
    ]
  },
  { timestamps: true }
)

// module.exports = mongoose.model('palettes', Palette)
