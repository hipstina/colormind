const CollectionRouter = require('express').Router()
const collectionController = require('../controllers/CollectionController')

CollectionRouter.get('/view/collection', collectionController.getCollection)
CollectionRouter.post('/add/collection', collectionController.createCollection)
// CollectionRouter.delete('/deleteColor', collectionController.deleteCollection)
// CollectionRouter.update('/edit/collection', collectionController.editCollection)

module.exports = CollectionRouter
