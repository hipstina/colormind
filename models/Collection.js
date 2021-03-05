const { Schema } = require('mongoose')

module.exports = new Schema(
  {
    alias: {
      type: String,
      required: false
    },
    combos: [{ type: Schema.Types.ObjectId, ref: 'colorCombos' }]
  },
  { timestamps: true }
)
