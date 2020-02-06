const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//! access user_validate_schema
const User = require('../models/User')
const { check, validationResult } = require('express-validator');
const config = require('config')    //* get mongoURI


// @route   POST api/users
// @desc    register a user
// @access  public
router.post('/', [
    //! validation criteria - even UserSchema stated required=false, check() proceed
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password is required with min.length of 5').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors })     // errors: errors.array()
    }

    const { name, email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ msg: 'email already exist' })
        }

        user = new User({ name, email, password })
        // console.log(user.date)
        // console.log(user.date.toString())

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        //! to save into db
        await user.save()

        //! assign mongodb Object_Id into jwt   #doubt:: why need token for registration
        const payload = { user: { id: user.id } }
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 720000
        }, (err, token) => {
            if (err) throw err
            res.json({ token })
        })

    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }

})
module.exports = router

