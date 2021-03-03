const { Schema } = require('mongoose')
// const Schema = mongoose.Schema

module.exports = new Schema(
  {
    alias: {
      type: String,
      required: true
    },
    combo_id: [
      {
        type: Schema.Types.ObjectId,
        ref: 'combos'
      }
    ]
  },
  { timestamps: true }
)

// module.exports = mongoose.model('collections', Collection)
