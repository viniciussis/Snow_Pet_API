const { Customer } = require('../models/customerModel')

class CustomerController {

  static async getAllCustomers(req, res){
    try {
      const customerList = await Customer.find({})
      res.status(200).json(customerList)
    } catch (error) {
      res.status(404).json({error: error.message})
    }
  }

  static async getCustomer(req, res){
    try {
      const customer = await Customer.findById(req.params.id)
      res.status(200).json(customer)
    } catch (error) {
      res.status(404).json({error: error.message})
    }
  }

  static async createCustomer(req, res){
    try {
      const newCustomer = await Customer.create(req.body)
      res.status(201).json({message: 'Customer added successfully!', newCustomer: newCustomer})
    } catch (error) {
      res.status(404).json({message: error.message})
    }
  }

  static async updateCustomer(req, res){
    try {
      await Customer.findByIdAndUpdate(req.params.id, req.body)
      res.status(200).json({message: 'Customer updated successfully!'})
    } catch (error) {
      res.status(404).json({message: error.message})
    }
  }
  
  static async deleteCustomer(req, res){
    try {
      await Customer.findByIdAndDelete(req.params.id)
      res.status(200).json({message: 'Customer deleted successfully!'})
    } catch (error) {
      res.status(404).json({message: error.message})      
    }
  }
}

module.exports = CustomerController
