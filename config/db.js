// use mongoose to connect to db
const mongoose = require('mongoose')
const config = require('config')
require('dotenv').config()
//* config.get({ any_requiredParameter_from( "./" ) })

const connectDB = async () => {
  process.env.NODE_CONFIG_DIR = './config'
  try {
    const db = process.env.MONGO_URI
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    console.log('mongodb is connected')
  } catch (err) {
    console.log(`ERR => db.js  >>  ${err.message}`)
    console.error(err.message)
    //* status 1 = Uncaught Fatal Exception
    process.exit(1)
  }
}
module.exports = connectDB
