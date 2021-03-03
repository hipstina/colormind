const { Collection } = require('../models')
const { ColorCombo } = require('../models')

// const createCollection = async (req, res) => {
//   try {
//     const collection = await new Collection({ ...req.body })
//     collection.save()
//     res.send(collection)
//   } catch (error) {
//     res.status(500).json({ msg: error.message })
//   }
// }

// const getCollectionById = async (req, res) => {
//   try {
//     const existing = await Collection.findById(req.params.collection_id) // currently, there is only 1 collection that disaplys on FE. This lets us scale up if one day we want to enable multiple collections

//     if (existing !== undefined) {
//       res.send({
//         msg: `Collection Found: ${[...Object.keys(req.params)]} : ${[
//           ...Object.values(req.params)
//         ]}, existing: ${existing}`
//       })
//     } else if (existing === undefined) {
//       res.send({
//         msg: `Collection does not exists: ${[...Object.keys(req.params)]} : ${[
//           ...Object.values(req.params)
//         ]}`
//       })
//     }
//   } catch (error) {
//     res.status(500).json({ msg: error.message })
//   }
// }

const getCollection = async (req, res) => {
  try {
    const collection = await Collection.find()
    return res.send(res.status(200).json({ collection }))
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const createCollection = async (req, res) => {
  try {
    const allCombos = await ColorCombo.find()

    const collection = await new Collection({
      alias: 'Test-collection',
      combo_id: allCombos
    })
    collection.save()
    return res.send(res.status(200).json({ collection }))
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  createCollection,
  // getCollectionById,
  getCollection
}

/* 
Test-collections: 
{
  "_id": "603ea34037b400bad30fbd26"
} 

{
  "_id": "603ea3f7f82cb1bb2d2af34a"
}
*/
