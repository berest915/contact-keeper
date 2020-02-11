const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
//! access user_validate_schema
const User = require('../models/User')
const Contact = require('../models/Contact')
const { check, validationResult } = require('express-validator')
//! to check id format
const mongoose = require('mongoose')

// @route   GET api/contacts
// @desc    get all user contacts
// @access  private
router.get('/', auth, async (req, res) => {
    try {
        //* assume no contact been saved, still need find() to return a document (empty array)
        const contacts = await Contact.find({ user: req.user.id }).sort({
            date: -1
        })
        res.json(contacts)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})

// @route   POST api/contacts
// @desc    add new contact
// @access  private
router.post(
    '/',
    [
        auth,
        check('name', 'Name is required')
            .not()
            .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, email, phone, type } = req.body
        console.log(email);
        let isNameExist = await Contact.findOne({ name })
        if (isNameExist) {
            return res.status(400).json({
                msg: 'unable to add:: name exactly same with existing contacts'
            })
        }
        try {
            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                //* assign property 'user' with userID who carrying jwt from auth middleware
                user: req.user.id
            })
            const contact = await newContact.save()
            res.json(contact)
        } catch (err) {
            console.error(err.message)
            res.status(500).send('server error')
        }
    }
)

// @route   PUT api/contacts/:id
// @desc    update contact
// @access  private
router.put('/:id', auth, async (req, res) => {
    //? after auth-middleware, req has object {id-of-user}
    //? then the async (req, res), the req is appended with the req which includes headr,param,body..
    // console.log('req.user (requester) as below:')
    // console.log(req.user)
    // console.log('req.params.id (contact-to-be-updated)as below:')
    // console.log(req.params.id)
    //! check validity format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res
            .status(400)
            .json({ msg: 'params id not in valid format with _id' })
    }

    let contact = await Contact.findById(req.params.id) //* like qSelector(#id) and it consists user(the refer: users)
    //! check id match
    if (!contact) return res.status(404).json({ msg: 'contact not found' })
    const { name, email, phone, type } = req.body

    try {
        //! ensure user owns the contact
        //* req.user.id from jwt compare with contact.refer
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'not Authorized' })
        }

        //! build contact object
        const contactFields = {}
        if (name) contactFields.name = name
        if (email) contactFields.email = email
        if (phone) contactFields.phone = phone
        if (type) contactFields.type = type

        contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { $set: contactFields },
            //* doesn't mean that mongoose will create the contact if it doesn't exist.
            //* it returns the updated document if true, previous version if false
            { new: true }
        )
        res.json(contact)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})

// @route   DELETE api/contacts/:id
// @desc    delete contact
// @access  private
router.delete('/:id', auth, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res
                .status(400)
                .json({ msg: 'params id not in valid format with _id' })
        }

        let contact = await Contact.findById(req.params.id)
        if (!contact) return res.status(404).json({ msg: 'contact not found' })

        //! ensure user owns the contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'not Authorized' })
        }
        //* findByIdAndDelete is deprecated
        await Contact.findByIdAndRemove(req.params.id)
        res.json({ msg: 'removed' })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})

module.exports = router
