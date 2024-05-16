const Product = require('../models/productModel')

class ProductController {
  static async getAllProducts(req, res){
    try {
      const productsList = await Product.find({})
      res.status(200).json(productsList)
    } catch (error) {
      res.status(404).json({error: error.message})
    }
  }

  static async getProduct(req, res){
    try {
      const product = await Product.findById(req.params.id)
      res.status(200).json(product)
    } catch (error) {
      res.status(404).json({error: error.message})
    }
  }

  static async createProduct(req, res){
    try {
      const newProduct = await Product.create(req.body)
      res.status(201).json({message: 'Product added successfully!', newProduct: newProduct})
    } catch (error) {
      res.status(404).json({message: error.message})
    }
  }

  static async updateProduct(req, res){
    try {
      await Product.findByIdAndUpdate(req.params.id, req.body)
      res.status(200).json({message: 'Product updated successfully!'})
    } catch (error) {
      res.status(404).json({message: error.message})
    }
  }
  
  static async deleteProduct(req, res){
    try {
      await Product.findByIdAndDelete(req.params.id)
      res.status(200).json({message: 'Product deleted successfully!'})
    } catch (error) {
      res.status(404).json({message: error.message})      
    }
  }
}

module.exports = ProductController
