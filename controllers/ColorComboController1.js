const { ColorCombo } = require('../models')

const createCombo = async (req, res) => {
  try {
    // to avoid dupes, test the reverse order of each inputted combo
    const combo = await ColorCombo.find({
      $or: [
        {
          color1: req.body.color1,
          color2: req.body.color2
        },
        {
          color1: req.body.color2,
          color2: req.body.color1
        }
      ]
    })

    if (combo) return res.status(404).send('Combo already exists.')

    const newCombo = await new ColorCombo(req.body)
    await newCombo.save()
    if (newCombo) {
      return res.status(200).json({ newCombo })
    }
    return res.status(404).send('Combo not created.')
  } catch (error) {
    throw error
  }
}

const getCombo = async (req, res) => {
  try {
    const { combo_id } = req.params
    const combo = await ColorCombo.findById(combo_id)
    if (combo) return res.status(200).json({ combo })
    return res.status(404).send('Combo not found.')
  } catch (error) {
    throw error
  }
}

const getCombos = async (req, res) => {
  try {
    const combos = await ColorCombo.find()
    if (combos) return res.status(200).json({ combos })
    return res.status(404).send('No combos not found.')
  } catch (error) {
    throw error
  }
}

const deleteCombo = async (req, res) => {
  try {
    const { combo_id } = req.params
    const deleted = await ColorCombo.findByIdAndDelete(combo_id)
    if (deleted) return res.status(200).json({ deleted })
    return res.status(404).send('Combo not deleted.')
  } catch (error) {
    throw error
  }
}

module.exports = {
  createCombo,
  getCombo,
  getCombos,
  deleteCombo
}
