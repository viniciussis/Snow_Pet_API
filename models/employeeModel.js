const mongoose = require('mongoose')

const { Schema } = mongoose

const employeeSchema = new Schema({

  name: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    match: /^d{3}.d{3}.d{3}-d{2}$/,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true
  },
  phone_number: {
    type: String,
    match: /^(\d{2})?\s?\d{5}-?\d{4}$/,
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
  position: {
    type: String,
    required: true
  },
  hire_date: {
    type: Date,
    default: Date.now()
  },
  email: {
    type: String,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  },
  additional_info: {
    type: String,
    required: true
  }
}, { timestamps: true , versionKey: false })

const Employee = mongoose.model('Employee', employeeSchema)

module.exports = Employee
