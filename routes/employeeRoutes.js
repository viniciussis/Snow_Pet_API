const router = require('express').Router()
const controller = require('../controllers/employeeController')

router.get('/', controller.getAllEmployees)
router.get('/:id', controller.getEmployee)
router.post('/', controller.createEmployee)
router.put('/:id', controller.updateEmployee)
router.delete('/:id', controller.deleteEmployee)

module.exports = router
