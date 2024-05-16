const mongoose = require('mongoose')

async function dbConnection() {
  try {
    await mongoose.connect('mongodb+srv://devinicius:Dorythos%40561@maincluster.9m6fqz6.mongodb.net/snow_pet')
    console.log('Connected to Database!')    
  } catch (error) {
    console.log("Error: ", error)    
  }
}

module.exports = dbConnection
