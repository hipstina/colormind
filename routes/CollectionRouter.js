const Router = require('express').Router()
const CollectionController = require('../controllers/CollectionController1')

Router.get('/view/collections', CollectionController.getCollections)
Router.get('/view/collection/:id', CollectionController.getOneCollection)
Router.post('/add/collection', CollectionController.createCollection)
Router.delete('/delete/collection/:id', CollectionController.deleteCollection)
Router.delete('/remove/collections/', CollectionController.deleteCollections)
// Router.put('/edit/collection/:id', CollectionController.updateCollection)

module.exports = Router
