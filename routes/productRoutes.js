const router = require('express').Router()
const controller = require('../controllers/productController')

router.get('/', controller.getAllProducts)
router.get('/:id', controller.getProduct)
router.post('/', controller.createProduct)
router.put('/:id', controller.updateProduct)
router.delete('/:id', controller.deleteProduct)

module.exports = router
