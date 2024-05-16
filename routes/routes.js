const router = require('express').Router()
const petRouter = require('./petRoutes')
const customerRouter = require('./customerRoutes')
const productRouter = require('./productRoutes')
const employeeRouter = require('./employeeRoutes')

router.use('/pets', petRouter)
router.use('/customers', customerRouter)
router.use('/products', productRouter)
router.use('/employees', employeeRouter)

module.exports = router
