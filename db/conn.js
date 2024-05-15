const mongoose = require('mongoose')

async function main () {
  try {
    await mongoose.connect('mongodb://localhost:27017/')
    console.log('Connected to Database!')
  } catch (error) {
    console.log(error)
  }
}

module.exports = main
