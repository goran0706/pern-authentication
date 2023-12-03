import bcrypt from 'bcrypt'
import { body, param, validationResult } from 'express-validator'
import { handleError, handleResponse, sanitizeObject } from '../../utils'
import userRepository from './user.repository'

const getUsers = async (_req, res, next) => {
  try {
    const result = await userRepository.getUsers()
    if (result.rowCount > 0) {
      const users = result.rows.map((user) => sanitizeObject(user))
      handleResponse(res, 200, true, false, users, 'Retrieved users')
    } else {
      handleResponse(res, 200, true, false, null, 'No users found')
    }
  } catch (error) {
    handleError(next, error)
  }
}

const getUserById = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return handleResponse(res, 400, false, true, null, errors.array())
  }

  try {
    const result = await userRepository.getUserById(req.params.userId)
    if (result.rowCount > 0) {
      const user = sanitizeObject(result.rows[0])
      handleResponse(res, 200, true, false, user, 'User retrieved')
    } else {
      handleResponse(res, 404, true, false, null, 'No user found')
    }
  } catch (error) {
    handleError(next, error)
  }
}

const createUser = async (req, res, next) => {
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
      const user = sanitizeObject(result2.rows[0])
      handleResponse(res, 201, true, false, user, 'User created')
    } else {
      handleResponse(res, 400, false, true, null, 'Failed to create')
    }
  } catch (error) {
    handleError(next, error)
  }
}

const updateUser = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return handleResponse(res, 400, false, true, null, errors.array())
  }

  try {
    const result = await userRepository.updateUser(req.params.userId, req.body)
    if (result.rowCount > 0) {
      const user = sanitizeObject(result.rows[0])
      handleResponse(res, 200, true, false, user, 'User updated')
    } else {
      handleResponse(res, 400, true, false, null, 'Failed to update')
    }
  } catch (error) {
    handleError(next, error)
  }
}

const deleteUser = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return handleResponse(res, 400, false, true, null, errors.array())
  }

  try {
    const result = await userRepository.deleteUser(req.params.userId)
    if (result.rowCount > 0) {
      const user = sanitizeObject(result.rows[0])
      handleResponse(res, 200, true, false, user, 'User deleted')
    } else {
      handleResponse(res, 400, false, true, null, 'Failed to delete')
    }
  } catch (error) {
    handleError(next, error)
  }
}

const validateUserParams = [
  param('userId').isInt({ min: 1 }).withMessage('userId must be a positive integer'),
]

const validateUserBody = [
  body('firstName')
    .isLength({ min: 1, max: 255 })
    .withMessage('First name must be between 1 and 255 characters.'),

  body('lastName')
    .isLength({ min: 1, max: 255 })
    .withMessage('Last name must be between 1 and 255 characters.'),

  body('email').isEmail().withMessage('Invalid email address.'),

  body('password')
    .isLength({ min: 8, max: 255 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      'Password must contain at least one lowercase letter, one uppercase letter, and one digit',
    ),
]

const validateUserCredentials = [
  body('email').isEmail().withMessage('Invalid email address.'),

  body('password')
    .isLength({ min: 8, max: 255 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      'Password must contain at least one lowercase letter, one uppercase letter, and one digit',
    ),
]

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  validateUserParams,
  validateUserBody,
  validateUserCredentials,
}
