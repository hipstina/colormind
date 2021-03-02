const { Color } = require('../models')

const createColor = async (req, res) => {
  try {
    const color = await new Color({ ...req.body })
    color.save()
    res.send(color)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const findColor = async (req, res) => {
  try {
    const color = await Color.findById(req.params.color_id) // maybe instead, it makes more sense to query the db by alias and color code?

    res.send(color)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const deleteColor = async (req, res) => {
  // deletes color by id
  try {
    const { id } = req.params
    const deletedColor = await Color.findByIdAndDelete(id)
    if (deletedColor) {
      return res.status(200).send('Color deleted')
    }
    throw new Error('Color not found')
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const editColor = async (req, res) => {
  // finds color by id and awaits new req.body details to update
  try {
    const { id } = req.params
    await Color.findByIdAndUpdate(id, req.body, { new: true }, (err, color) => {
      if (err) {
        res.status(500).send(err)
      }
      if (!color) {
        res.status(500).send('color not found!')
      }
      return res.status(200).json(color)
    })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

module.exports = {
  createColor,
  findColor,
  deleteColor,
  editColor
}
