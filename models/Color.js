const { Schema } = require('mongoose')
// const Schema = mongoose.Schema

module.exports = new Schema(
  {
    code: {
      type: String,
      required: true
    },
    alias: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
)

// module.exports = mongoose.model('colors', Color)
