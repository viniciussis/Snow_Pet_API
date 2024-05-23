const router = require('express').Router()
const controller = require('../controllers/petController')

router.get('/', controller.getAllPets)
router.get('/:id', controller.getPet)
router.post('/', controller.createPet)
router.put('/:id', controller.updatePet)
router.delete('/:id', controller.deletePet)

module.exports = router
