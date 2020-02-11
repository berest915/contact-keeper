const mongoose = require('mongoose')

const ContactSchema = mongoose.Schema({
    //! the right user to perform CRUD
    user: {
        type: mongoose.Schema.Types.ObjectId,
        //* specific collection - mongodb pluralize each collection
        ref: 'users'
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: function() { return this.email === undefined } //* may jz return !this.email  **Somehow arrow fn doesn't return correctly
    },
    type: {
        type: String,
        default: 'personal'
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('contact', ContactSchema)
