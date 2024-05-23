const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./routes/routes')
const conn = require('./db/conn')

require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use('/api', routes)

// DB Connection
conn()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server online at port ${PORT}!`)
})
