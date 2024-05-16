const mongoose = require('mongoose')

const { Schema } = mongoose

const petSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Customer',
    required: true
  },
  specie: {
    type: String,
    lowercase: true,
    enum: [
      'gato',
      'cachorro'
    ],
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  size: {
    type: String,
    lowercase: true,
    enum: [
      'pequeno',
      'médio',
      'grande'
    ],
    required: true
  },
  gender: {
    type: String,
    lowercase: true,
    enum: [
      'macho',
      'fêmea'
    ],
    required: true
  },
  health_problems: {
    type: String,
    default: 'Nenhum'
  },
  allergies: {
    type: String,
    default: 'Nenhuma'
  },
  additional_info: {
    type: String,
    default: 'Nenhuma'
  }
}, { timestamps: true })

const Pet = mongoose.model('Pet', petSchema)

module.exports = {
  Pet,
  petSchema
}
