const express = require('express'),
      router = express.Router(),
      ProductController = require('../app/controllers/product.controller');

// Get all products
router.get('/products', ProductController.index);

// Create a new product
router.post('/products', ProductController.store);

// Get single product
router.get('/products/:id', ProductController.show);

// Update product (PUT - full update)
router.put('/products/:id', ProductController.update);

// Update product (PATCH - partial update)
router.patch('/products/:id', ProductController.update);

// Delete product
router.delete('/products/:id', ProductController.destroy);

module.exports = router;