import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { userRouter } from './routes/userRoutes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit'
const port = Number(process.env.PORT ?? 4000)

app.get('/', (_req, res) => {
  res.send({ status: 'ok', message: 'Octofit Tracker backend is running' })
})

app.use('/api/users', userRouter)

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(port, () => {
      console.log(`Backend running on http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  })
