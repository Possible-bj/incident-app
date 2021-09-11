import express from 'express'
import chalk from 'chalk'
import connectDB from './db/mongoose.js'
import userRoutes from './routers/userRoutes.js'
import incidentRoutes from './routers/incidentRoutes.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'

connectDB()

const app = express()
app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/incidents', incidentRoutes)

app.use(notFound)
app.use(errorHandler)
app.get('/', (req, res) => {
  res.send('API is runnning...')
})
const port = process.env.PORT || 5000

app.listen(
  port,
  console.log(
    chalk.yellow.bold(
      `Server running in ${process.env.NODE_ENV} mode on port ${port}`
    )
  )
)
