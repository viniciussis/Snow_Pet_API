const mongoose = require('mongoose')

const { Schema } = mongoose

const customerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    neighborhood: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    number: {
      type: Number,
      min: 1,
      required: true
    },
    complement: {
      type: String
    }
  },
  email: {
    type: String,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  },
  phone_number: {
    type: String,
    match: /^(\d{2})?\s?\d{5}-?\d{4}$/,
    required: true
  },
  social_media: {
    type: String,
    default: 'Nenhuma'
  }
}, { timestamps: true })

const Customer = mongoose.model('Customer', customerSchema)

module.exports = {
  Customer,
  customerSchema
}
