const mongoose = require('mongoose')

const dbName = 'task-manager'
const connectionUrl = 'mongodb+srv://shanerex:MV4DuPaU54WvyuiK@cluster0.buv8ju3.mongodb.net/?retryWrites=true&w=majority/'

async function dbInit() {
    try {
        await mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true, dbName: dbName, writeConcern: 'majority', retryWrites: true})
        console.log('Connected to db!');
    } catch (error) {
        console.error(error.message);
    }
}


dbInit()
