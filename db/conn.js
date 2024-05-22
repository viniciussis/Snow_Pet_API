const mongoose = require('mongoose')

async function dbConnection() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_KEY)
    console.log('Connected to Database!')    
  } catch (error) {
    console.log("Error: ", error)    
  }
}

module.exports = dbConnection
