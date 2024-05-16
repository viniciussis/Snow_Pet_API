const Employee = require('../models/employeeModel')

class EmployeeController {
  static async getAllEmployees(req, res){
    try {
      const employeesList = await Employee.find({})
      res.status(200).json(employeesList)
    } catch (error) {
      res.status(404).json({error: error.message})
    }
  }

  static async getEmployee(req, res){
    try {
      const employee = await Employee.findById(req.params.id)
      res.status(200).json(employee)
    } catch (error) {
      res.status(404).json({error: error.message})
    }
  }

  static async createEmployee(req, res){
    try {
      const newEmployee = await Employee.create(req.body)
      res.status(201).json({message: 'Employee added successfully!', newEmployee: newEmployee})
    } catch (error) {
      res.status(404).json({message: error.message})
    }
  }

  static async updateEmployee(req, res){
    try {
      await Employee.findByIdAndUpdate(req.params.id, req.body)
      res.status(200).json({message: 'Employee updated successfully!'})
    } catch (error) {
      res.status(404).json({message: error.message})
    }
  }
  
  static async deleteEmployee(req, res){
    try {
      await Employee.findByIdAndDelete(req.params.id)
      res.status(200).json({message: 'Employee deleted successfully!'})
    } catch (error) {
      res.status(404).json({message: error.message})      
    }
  }
}

module.exports = EmployeeController
