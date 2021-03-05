const { Schema } = require('mongoose')
// const Schema = mongoose.Schema

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

// module.exports = mongoose.model('collections', Collection)
