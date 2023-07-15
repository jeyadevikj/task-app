const mongoose = require('mongoose')

const dbName = 'my-db'
const connectionUrl = 'mongodb+srv://shanerex:MV4DuPaU54WvyuiK@cluster0.buv8ju3.mongodb.net/?retryWrites=true&w=majority/'

async function dbInit(newUser) {
    try {
        await mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true, dbName: dbName, writeConcern: 'majority', retryWrites: true})
        console.log('Connected to db!');
        const insertedUser = await newUser.save(newUser)
        console.log(insertedUser);
    } catch (error) {
        console.error(error.message);
    }
}


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(value.length <= 6) {
                throw new Error('Password must be more than 6 characters')
            }

            if(value === 'password') {
                throw new Error('Invalid password string entered!')
            }
        }
    }
})

const User = mongoose.model('User', userSchema)

const newUser = new User({
    userName: 'Shane',
    password: 'password123'
})

dbInit(newUser)