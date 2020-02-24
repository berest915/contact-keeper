const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// require('dotenv').config()
//! access user_validate_schema
// const config = require('config') // get mongoURI
const User = require('../models/User')
// const { check, validationResult } = require('express-validator')
const { check, validationResult } = require('express-validator/check')


// @route   POST api/users
// @desc    register a user
// @access  public
router.post(
  '/',
  [
    //! validation criteria - even UserSchema stated required=false, check() proceed
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Email is eitherr invalid').isEmail(),
    check('password', 'Password is required')
      .not()
      .isEmpty(),
    check('password', 'Password is required with min.length of 5').isLength({
      min: 5
    })
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body
    try {
      let user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({ errors: ['email already exist'] })
      }
      user = new User({ name, email, password })

      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      //! to save into db
      await user.save()

      //? assign mongodb Object_Id into jwt   #doubt:: why need token for registration
      const payload = { user: { id: user.id } }
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 720000
        },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.error(err.message)
      //todo test 
      res.status(500).send('server error')
    }
  }
)
module.exports = router
