const { Schema } = require('mongoose')
// const Schema = mongoose.Schema

module.exports = new Schema(
  {
    alias: {
      type: String,
      required: true
    },
    palette_id: [
      {
        type: Schema.Types.ObjectId,
        ref: 'palettes'
      }
    ]
  },
  { timestamps: true }
)

// module.exports = mongoose.model('collections', Collection)
