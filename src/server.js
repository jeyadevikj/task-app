const express = require('express')
const taskRouter = require('./routes/task-routes')
const userRouter = require('./routes/user-routes')
require('./db/mongoose')



const app = express()
app.use(express.json())
// app.use((req, res) => {
//     return res.status(503).json({message: 'Server under maintenance!'})
// })
app.use(taskRouter)
app.use(userRouter)



const port = process.env.PORT || 3000


app.listen(port, () => {
    console.log('Server is up at port: '+port);
})
