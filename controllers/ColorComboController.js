const { ColorCombo } = require('../models')

const createColorCombo = async (req, res) => {
  try {
    // const colorCombo = await new ColorCombo({ ...req.body })

    const existing = await Combo.find({
      // check if colorCombo exists befor adding it to the db
      color1: req.body.color1,
      color2: req.body.color2
    })
    if (!existing) combo = await new Combo({ ...req.body })

    colorCombo.save()
    res.send(colorCombo)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const findColorCombo = async (req, res) => {
  try {
    const colorCombo = await ColorCombo.findById(req.params.colorCombo_id) // maybe instead, it makes more sense to query the db by both color codes?

    res.send(colorCombo)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

module.exports = {
  createColorCombo,
  findColorCombo
}
