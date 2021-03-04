const { ColorCombo } = require('../models')

const createColorCombo = async (req, res) => {
  try {
    // check if colorCombo exists before adding it to the db
    // to avoid dupes, test the reverse order of each new combo
    const existing = await ColorCombo.find({
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

    if (existing == false) {
      const combo = await new ColorCombo({ ...req.body })
      combo.save()
      return res.send({
        msg: `New combo created`,
        combo: combo
      })
    } else if (existing) {
      console.log('This combo already exists', existing)
      let comboProps = []
      for (let key in req.body) {
        comboProps.push([` ${key}: ${req.body[key]}`])
      }

      return res.send({
        msg: `This combo already exists:${comboProps}`
      })
    } else {
      res.send({
        msg: `Unknown problem `
      })
    }
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const deleteCombo = async (req, res) => {
  // deletes palette by id
  try {
    const { id } = req.params
    const deletedCombo = await ColorCombo.findByIdAndDelete(id)
    if (deletedCombo) {
      return res.status(200).send('Combo deleted')
    }
    throw new Error('Combo not found')
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const getCombo = async (req, res) => {
  // onClick get a collection palette to populate checker & preview
  try {
    const combo = await ColorCombo.findById(req.params.combo_id)
    console.log('combo added:', combo)
    return res.send(combo)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

module.exports = {
  createColorCombo,
  deleteCombo,
  getCombo
}
