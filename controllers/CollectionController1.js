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

//if collection name exists, append new combo and return collection. Else create new collection
//! add check that existing combo is not already in collection
const findCollectionByName = async (req, res) => {
  try {
    const collection = await Collection.findOne({
      alias: req.body.alias
    })
      .populate('combos')
      .update({ $push: { combos: req.body.combos } })
      .findOne({
        alias: req.body.alias
      })
    if (collection) {
      return res.send(collection)
    } else {
      // new collection should never have an empty combos field, but it will still create. It will just return 500 error as undefined
      const newCollection = await new Collection(req.body)
      await newCollection.save()
    }

    if (newCollection) {
      return res.status(200).json({ newCollection })
    } else return res.status(404).send('newCollection not created.')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
// append new combo and return collection
//! add check that existing combo is not already in collection
const updateCollectionById = async (req, res) => {
  try {
    const { id } = req.params
    await Collection.findByIdAndUpdate(
      id,
      { $push: { combos: req.body.combos } },
      { new: true },
      (err, collection) => {
        if (err) {
          res.status(500).send(err)
        }
        if (!collection) {
          res.status(500).send('Collection not found')
        }
        return res.status(200).json(collection)
      }
    )
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  createCollection,
  getOneCollection,
  getCollections,
  deleteCollection,
  deleteCollections,
  findCollectionByName,
  updateCollectionById
}
