const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Task = require('./TaskModel')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 1,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (value.length < 6) {
                throw new Error('Invalid password length')
            }
            if (value === 'password') { 
                throw new Error('Invalid password string')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner',
})

userSchema.methods.toJSON = function () {
    const userObject = this.toObject()
    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('No user found')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw new Error('Invalid credentials')
    }

    return user
}

userSchema.methods.generateAuthToken = async function (secretKey) {
    const token = jwt.sign({ id: this._id.toString() }, secretKey)

    this.tokens = this.tokens.concat({ token })
    await this.save()

    return token
}

userSchema.pre('save', async function (next) {
    //this refers to the user object
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }

    next()
})

userSchema.pre('deleteOne', {document: true, query: false} , async function (next) {

    await Task.deleteMany({ owner: this._id })

    next()
})


const User = mongoose.model('User', userSchema)

module.exports = User