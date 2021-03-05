const Router = require('express').Router()
const CollectionController = require('../controllers/CollectionController1')

Router.get('/get/collections', CollectionController.getCollections)
Router.get('/view/collection/:id', CollectionController.getOneCollection)
Router.post('/add/collection', CollectionController.createCollection)
Router.delete('/delete/collection/:id', CollectionController.deleteCollection)
Router.delete(
  '/remove/collections/',
  CollectionController.deleteCollectionsByName
)
Router.put('/edit/collection/:id', CollectionController.updateCollectionById)
Router.get('/find/collection', CollectionController.findCollectionByName)

module.exports = Router
