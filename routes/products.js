var express = require('express');
var router = express.Router();
const controller = require('../controllers/products');

router.post('/products', controller.createProduct );
router.get('/products', controller.getProducts );
router.patch('/products/:id', controller.patchProduct);
router.delete('/products/:id', controller.deletePutProduct);
router.put('/products/:id', controller.deletePutProduct );

module.exports = router;
