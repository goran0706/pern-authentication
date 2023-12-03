/* eslint-disable no-undef */
import 'dotenv/config'

export const ENVIRONMENT = process.env.NODE_ENV || 'development'
export const HOST = process.env.HOST || 'localhost'
export const PORT = process.env.PORT || 3000
export const ORIGIN = process.env.ORIGIN || 'http://localhost:3000'
export const JWT_SECRET = process.env.JWT_SECRET
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN

export const CORS_OPTIONS = { origin: ORIGIN.split(','), credentials: true }
export const URL_ENCODING_OPTIONS = { limit: '5MB', extended: true }
