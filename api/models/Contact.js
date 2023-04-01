const mongoose = require('mongoose');
const Schema = mongoose.Schema
const valid = require('validator')

const ContactSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    phone: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        validate: {
            validator: (v) => {
                return valid.isEmail(v)
            },
            message: `{VALUE} is not an email`
        }
    }
})

const Contact = mongoose.model('Contact', ContactSchema)
module.exports = Contact