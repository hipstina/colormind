const { ColorCombo } = require('../models')

// use for getting existing combos AND creating new combos
const createCombo = async (req, res) => {
  try {
    console.log(req.body.color1, req.body.color2)
    let newCombo = await ColorCombo.findOne({
      $and: [{ color1: req.body.color1 }, { color2: req.body.color2 }]
    })

    if (!newCombo) {
      newCombo = await new ColorCombo(req.body)
      await newCombo.save()
      console.log('combo exists now:', newCombo)
      res.status(201).json({ newCombo })
    } else {
      console.log('combo exists!', newCombo)
      res.status(200).json({ newCombo })
    }
  } catch (error) {
    throw error
  }
}

// use for combos in collection only
const getComboById = async (req, res) => {
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
  getComboById,
  getCombos,
  deleteCombo
}
