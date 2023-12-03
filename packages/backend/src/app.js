import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

// modules
import { CORS_OPTIONS, HOST, PORT, URL_ENCODING_OPTIONS } from './constants'

// middlewares
import errorHandler from './middlewares/errorMiddleware'
import limiter from './middlewares/limiter'

// routes
import authRoutes from './api/auth/auth.routes'
import userRoutes from './api/user/user.routes'

const app = express()

// middlewares
app.use(helmet())
app.use(limiter())
app.use(morgan('dev'))
app.use(compression())
app.use(cors(CORS_OPTIONS))
app.use(express.urlencoded(URL_ENCODING_OPTIONS))
app.use(express.json())
app.use(express.text())
app.use(express.raw())
app.use(cookieParser())

// routes
app.use('/', authRoutes)
app.use('/', userRoutes)

// generic error handler
app.use('*', errorHandler)

// start server
app.listen(PORT, HOST, () => console.log(`Server running on ${HOST}:${PORT}`))
