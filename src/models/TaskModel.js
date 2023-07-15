const { default: mongoose } = require('mongoose')
const validator = require('validator')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
        minLength: 10
    },
    completed: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Invalid Email!')
            }
        }
    }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task