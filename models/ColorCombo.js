const { Schema } = require('mongoose')
// const Schema = mongoose.Schema

module.exports = new Schema(
  {
    // _id: Schema.Types.ObjectId,
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
    // color1_id: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'colors'
    // },
    // color2_id: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'colors'
    // }
  },
  { timestamps: true }
)

// module.exports = mongoose.model('colorCombos', ColorCombo)
