const express = require('express')
const app = express()
const connectDB = require('./config/db')
const path = require('path')
require('dotenv').config()

//! connect database
connectDB()

//! init middleware
//* body parser, @params 'extended' appear in express api docs /section => .urlencoded() instead of .json() #reason-!discover
app.use(express.json({ extended: false }))

//! routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

//! server static assets for production (if)
if (process.env.NODE_ENV === 'production') {
  //  set and load static folder
  app.use(express.static('client/build'))
  // '*' => route that not mentioned before:: which is homepage,
  // then look into __dirname > client > build > index.html
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}

const PORT = process.env.PORT || 5500

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
