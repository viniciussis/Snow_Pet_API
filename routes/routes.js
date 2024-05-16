const router = require('express').Router()
const petRouter = require('./petRoutes')
const customerRouter = require('./customerRoutes')

router.use('/pets', petRouter)
router.use('/customers', customerRouter)

module.exports = router
