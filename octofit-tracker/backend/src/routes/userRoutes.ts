import express from 'express'
import User from '../models/User.js'

export const userRouter = express.Router()

userRouter.get('/', async (_req, res) => {
  const users = await User.find().lean()
  res.json(users)
})

userRouter.post('/', async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error: 'Invalid request data' })
  }
})
