const userRouter = require('express').Router()
const User = require('../models/UserModel')
const auth = require("../middleware/auth");

const secretKey = 'cssr'


userRouter.get('/users/me', auth, async (req, res) => {
    // try {
    //     const users = await User.find({})
    //     if(!users) {
    //         return res.status(404).json({message: "No users found"})
    //     }

    //     return res.status(200).json(users)
    // } catch (error) {
    //     return res.status(400).json({message: error.message})
    // }
    return res.status(200).json(req.user)
})

userRouter.post('/users/register', async (req, res) => {
    const user = new User(req.body)
    try {
        const insertedUser = await user.save()
        if (!insertedUser) {
            return res.status(400).json({ message: 'Unable to insert user' })
        }
        const token = await insertedUser.generateAuthToken(secretKey)
        res.cookie('token', token, {
            maxAge: 18000000,
            httpOnly: true,
            secure: true
        })
        return res.status(201).json({ insertedUser })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})


userRouter.post('/users/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(404).json({ message: 'Could not find user' })
        }
        const token = await user.generateAuthToken(secretKey)
        res.cookie('token', token, {
            maxAge: 18000000,
            httpOnly: true,
            secure: true
        })
        return res.status(200).json({ user })
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
})

userRouter.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.deleteOne()

        return res.status(200).send({ message: 'User deleted successfully' })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
})

userRouter.patch('/users/me', auth, async (req, res) => {
    const updatesPassed = Object.keys(req.body)
    const updatesAllowed = ["name", "password", "email"]

    try {
        const isUpdateValid = updatesPassed.every((update) => updatesAllowed.includes(update))
        if (!isUpdateValid) {
            throw new Error('Passed updates invalid')
        }

        updatesPassed.forEach((update) => {
            (req.user[update] = req.body[update])
        })

        const updatedUser = await req.user.save()
        if (!updatedUser) {
            throw new Error('User cannot be updated')
        }

        return res.status(200).send(updatedUser)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
})

userRouter.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token != req.token)
        await req.user.save()

        return res.status(201).send({ message: 'Logged out successfully' })
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
})

userRouter.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens.length = 0
        await req.user.save()

        return res.status(200).send({ message: 'Logged out of all devices' })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
})


module.exports = userRouter