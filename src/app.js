import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import config from './config'

import usersRoute from './routes/users.route'
import authRoute from './routes/auth.route'

const app = express()

// settings
app.set('port', config.PORT)

// middlewares
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// Routes
app.use('/api', usersRoute)
app.use('/api', authRoute)

export default app