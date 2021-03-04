const { Schema } = require('mongoose')
// const Schema = mongoose.Schema

module.exports = new Schema(
  {
    contrast_ratio: {
      type: Number,
      required: true
    },
    w3_grade: {
      type: String,
      required: true
    },
    color1: {
      type: String,
      required: true
    },
    color2: {
      type: String,
      required: true
    },
    collection_id: {
      type: Schema.Types.ObjectId,
      ref: 'collections'
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
