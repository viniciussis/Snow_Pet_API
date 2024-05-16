const { Pet } = require('../models/petModel')

class PetController {
  
  static async getAllPets(req, res) {
    try {
      const petsList = await Pet.find({})
      res.status(200).json({petList: petsList})
    } catch (error) {
      res.status(404).json({message: error.message})
    }
  }

  static async getPet(req, res){
    try {
      const pet = await Pet.findById(req.params.id)
      res.status(200).json(pet)
    } catch (error) {
      res.status(404).json({error: error.message})
    }
  }

  static async createPet(req, res){
    try {
      const newPet = await Pet.create(req.body)
      res.status(201).json({message: 'Pet added successfully!', newPet: newPet})
    } catch (error) {
      res.status(404).json({message: error.message})
    }
  }

  static async updatePet(req, res){
    try {
      await Pet.findByIdAndUpdate(req.params.id, req.body)
      res.status(200).json({message: 'Pet updated successfully!'})
    } catch (error) {
      res.status(404).json({message: error.message})
    }
  }
  
  static async deletePet(req, res){
    try {
      await Pet.findByIdAndDelete(req.params.id)
      res.status(200).json({message: 'Pet deleted successfully!'})
    } catch (error) {
      res.status(404).json({message: error.message})      
    }
  }
}

module.exports = PetController
