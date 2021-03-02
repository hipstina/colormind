const { Palette } = require('../models')

const createPalette = async (req, res) => {
  try {
    const palette = await new Palette({ ...req.body })

    palette.save()
    res.send(palette)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const findPalette = async (req, res) => {
  try {
    const palette = await Palette.findById(req.params.palette_id) // maybe instead, it makes more sense to query the db by color_combo fields??

    res.send(palette)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const deletePalette = async (req, res) => {
  // deletes palette by id
  try {
    const { id } = req.params
    const deletedPalette = await Palette.findByIdAndDelete(id)
    if (deletedPalette) {
      return res.status(200).send('Palette deleted')
    }
    throw new Error('Palette not found')
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const editPalette = async (req, res) => {
  // finds palette by id and awaits new req.body details to update
  try {
    const { id } = req.params
    await Palette.findByIdAndUpdate(
      id,
      req.body,
      { new: true },
      (err, palette) => {
        if (err) {
          res.status(500).send(err)
        }
        if (!palette) {
          res.status(500).send('palette not found!')
        }
        return res.status(200).json(palette)
      }
    )
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

module.exports = {
  createPalette,
  findPalette,
  deletePalette,
  editPalette
}
