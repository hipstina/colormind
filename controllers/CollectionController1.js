const { Collection } = require('../models')
const { ColorCombo } = require('../models')

getCollections = async (req, res) => {
  try {
    const collections = await Collection.find().populate('combos')
    console.log(collections.combos)
    if (collections) return res.json(collections)
    // return res.status(200).json({ collections })
    return res.status(404).send('No collections exist.')
  } catch (error) {
    throw error
  }
}

getOneCollection = async (req, res) => {
  try {
    const { id } = req.params
    const collection = await Collection.findById(id)

    if (collection) return res.status(200).json({ collection })
    return res
      .status(404)
      .send('Collection with the specified ID does not exists.')
  } catch (error) {
    throw error
  }
}

createCollection = async (req, res) => {
  try {
    const collection = await new Collection(req.body)
    await collection.save()
    if (collection) return res.status(200).json({ collection })
    return res.status(404).send('Collection did not get created.')
  } catch (error) {
    throw error
  }
}

deleteCollection = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Collection.findByIdAndDelete(id)
    if (deleted) return res.status(200).json({ deleted })
    return res
      .status(404)
      .send('Collection with the specified ID does not exists.')
  } catch (error) {
    throw error
  }
}

deleteCollections = async (req, res) => {
  try {
    const deleted = await Collection.find()
    if (deleted) return res.status(200).json({ deleted })
    return res.status(404).send('No collections found.')
  } catch (error) {
    throw error
  }
}

module.exports = {
  createCollection,
  getOneCollection,
  getCollections,
  deleteCollection,
  deleteCollections
}
