const { Collection } = require('../models')

const createCollection = async (req, res) => {
  try {
    const collection = await new Collection({ ...req.body })
    collection.save()
    res.send(collection)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const getCollection = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.colection_id) // currently, there is only 1 collection. This lets us scale up if one day we want to enable multiple collections

    res.send(collection)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

module.exports = {
  createCollection,
  getCollection
}
