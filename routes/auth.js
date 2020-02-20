const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//! access user_validate_schema
const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const config = require('config')
//! Authentication middleware
const auth = require('../middleware/auth')

// @route   GET api/auth
// @desc    get logged-in-user
// @access  private
router.get('/', auth, async (req, res) => {
    try {
        //! exclude password even it is encrypted
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})

// @route   POST api/auth
// @desc    auth user & get token  => login & cli get a token while validity until timeout or logout(not imp yet)
// @access  public
router.post(
    '/',
    [
        //! check if match-credential between req & db
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
        }

        //! check if credentials are valid
        const { email, password } = req.body
        try {
            let user = await User.findOne({ email })
            if (!user) {
                return res
                    .status(400)
                    .json({ msg: `not existing account for ${email}` })
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ msg: 'Invalid Credentials - password unmatch' })
            }
            //! jwt token
            const payload = {
                user: { id: user.id }
            }
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {
                    expiresIn: 7200
                },
                (err, token) => {
                    if (err) throw err
                    res.json({ token })
                }
            )
        } catch (err) {
            console.error(err.message)
            res.status(500).send('server error')
        }
    }
)
module.exports = router
