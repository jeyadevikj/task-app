const { default: mongoose } = require('mongoose')
const validator = require('validator')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    },
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
    hasPriority: {
        type: Boolean,
        default: false
    },
    colName: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task