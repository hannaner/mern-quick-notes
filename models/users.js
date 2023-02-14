const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 6

// try to keep userschema clean with user relative data
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        // takes off white space beginning and end of field
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        minLength: 3,
        required: true
    },
}, {
    timestamps: true,
    toJSON: {
        // passing in (doc, return)
        // doc is what we're passing in
        // return is what we're transforming
        transform: function(doc, user) {
            // remove password and make sure we return the document
            delete user.password
            return user
        }
    }
})

// before the save happens, we're running an async function
userSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next();
    // setting the password
    // await and hash the pw
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
})

module.exports = mongoose.model('User', userSchema)