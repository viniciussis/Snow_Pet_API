const mongoose = require('mongoose')

const { Schema } = mongoose

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Schema.Types.Decimal128,
    minimum: 0,
    required: true
  },
  measure: {
    type: String,
    required: true
  }
}, { timestamps: true, versionKey: false})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
