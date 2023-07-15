const validator = require('validator')
const express = require('express')
const taskRouter = require('./routes/task-routes')
require('./db/mongoose')


const app = express()
app.use(express.json())
app.use(taskRouter)



const port = process.env.PORT || 3000


app.listen(port, () => {
    console.log('Server is up at port: '+port);
})
