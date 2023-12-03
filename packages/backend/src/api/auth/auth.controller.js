import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import { JWT_EXPIRES_IN, JWT_SECRET } from '../../constants'
import {
  attachCookie,
  handleError,
  handleResponse,
  removeCookie,
  sanitizeObject,
} from '../../utils'
import userRepository from '../user/user.repository'

const signUp = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return handleResponse(res, 400, false, true, null, errors.array())
  }

  try {
    const result1 = await userRepository.getUserByEmail(req.body.email)
    if (result1.rowCount > 0) {
      return handleResponse(res, 400, false, true, null, 'User exists')
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    const newUser = { ...req.body, password: hash }

    const result2 = await userRepository.createUser(newUser)
    if (result2.rowCount > 0) {
      const sanitizedUser = sanitizeObject(result2.rows[0])
      const t = jwt.sign(sanitizedUser, JWT_SECRET)
      const data = {
        user: sanitizedUser,
        type: 'Bearer',
        accessToken: t,
        expiresIn: JWT_EXPIRES_IN,
      }
      attachCookie(res, 't', t)
      handleResponse(res, 201, true, false, data, 'User created')
    } else {
      handleResponse(res, 400, false, true, null, 'Failed to create')
    }
  } catch (error) {
    handleError(next, error)
  }
}

const signIn = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return handleResponse(res, 400, false, true, null, errors.array())
  }

  try {
    const result1 = await userRepository.getUserByEmail(req.body.email)
    if (!result1.rowCount > 0) {
      handleResponse(res, 400, false, true, null, 'Invalid credentials')
    }

    const user = result1.rows[0]

    const isAuthenticated = bcrypt.compareSync(req.body.password, user.password)
    if (!isAuthenticated) {
      return handleResponse(res, 400, false, true, null, 'Invalid credentials')
    }

    const sanitizedUser = sanitizeObject(user)
    const t = jwt.sign(sanitizedUser, JWT_SECRET)
    const data = {
      user: sanitizedUser,
      type: 'Bearer',
      accessToken: t,
      expiresIn: JWT_EXPIRES_IN,
    }

    attachCookie(res, 't', t)
    handleResponse(res, 200, true, false, data, 'Logged in')
  } catch (error) {
    handleError(next, error)
  }
}

const signOut = async (req, res) => {
  removeCookie(res, 't')
  handleResponse(res, 200, true, false, null, 'Logged out')
}

const hasAuthentication = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const isAuthenticated = jwt.verify(token, JWT_SECRET)

    if (isAuthenticated) {
      next()
    } else {
      handleResponse(res, 401, false, true, null, 'Unauthenticated')
    }
  } catch (error) {
    handleError(next, error)
  }
}

const hasAuthorization = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.decode(token)
    const isAuthorized = decoded.id == req.params.userId

    if (isAuthorized) {
      next()
    } else {
      handleResponse(res, 403, false, true, null, 'Unauthorized')
    }
  } catch (error) {
    handleError(next, error)
  }
}

export default {
  signUp,
  signIn,
  signOut,
  hasAuthentication,
  hasAuthorization,
}
