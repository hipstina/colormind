const { Schema } = require('mongoose')

module.exports = new Schema(
  {
    contrast_ratio: {
      type: Number,
      required: false
    },
    w3_grade: {
      type: String,
      required: false
    },
    color1: {
      type: String,
      required: true
    },
    color2: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)
