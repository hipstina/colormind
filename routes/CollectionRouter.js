const Router = require('express').Router()
const CollectionController = require('../controllers/CollectionController')

Router.get('/view/collection', CollectionController.getCollection)
// Router.get(
//   '/view/collection/:collection_id',
//   CollectionController.getCollectionById
// )
Router.post('/add/collection', CollectionController.createCollection)
// Router.delete('/deleteColor', CollectionController.deleteCollection)
// Router.update('/edit/collection', CollectionController.editCollection)

module.exports = Router
