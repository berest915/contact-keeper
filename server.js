const express = require('express')
const connectDB = require('./config/db')

const app = express()

//! connect database
connectDB()

//! init middleware
//* body parser, @params 'extended' appear in express api docs /section => .urlencoded() instead of .json() #reason-!discover
app.use(express.json({ extended: false }))

//! 
app.get('/', (req, res) => {
    res.json({ msg: 'main-page' })
})

//! routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))


const PORT = process.env.PORT || 5500

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})