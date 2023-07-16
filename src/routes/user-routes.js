const userRouter = require('express').Router()
const User = require('../models/UserModel')

const secretKey = 'cssr'


userRouter.get('/users', async(req, res) => {
    try {
        const users = await User.find({})
        if(!users) {
            return res.status(404).json({message: "No users found"})
        }

        return res.status(200).json(users)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

userRouter.post('/users/register', async (req, res) => {
    const user = new User(req.body)
    try {
        const insertedUser = await user.save()
        if(!insertedUser) {
            return res.status(400).json({message: 'Unable to insert user'})
        }
        const token = await insertedUser.generateAuthToken(secretKey)
        return res.status(201).json({insertedUser, token})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})


userRouter.post('/users/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const user = await User.findByCredentials(email, password)
        if(!user) {
            return res.status(404).json({message: 'Could not find user'})
        }
        const token = await user.generateAuthToken(secretKey)
        return res.status(200).json({user, token})
    } catch (error) {
        return res.status(404).json({message: error.message})
    }
})


module.exports = userRouter