import { ENVIRONMENT, JWT_EXPIRES_IN } from '../constants'

export const sanitizeObject = (obj, sensitiveProperties = ['password']) => {
  const sanitizedObject = { ...obj }
  for (const property of sensitiveProperties) {
    if (Object.prototype.hasOwnProperty.call(sanitizedObject, property)) {
      delete sanitizedObject[property]
    }
  }
  return sanitizedObject
}

export const makeResponse = (success, error, data, message) => {
  return { success, error, data, message }
}

export const attachCookie = (res, key, value) => {
  res.cookie(key, value, {
    httpOnly: true,
    secure: ENVIRONMENT === 'production',
    expire: JWT_EXPIRES_IN,
  })
}

export const removeCookie = (res, key) => {
  res.clearCookie(key)
}

export const handleResponse = (res, status, success, error, data, message) => {
  const response = makeResponse(success, error, data, message)
  res.status(status).json(response)
}

export const handleError = (next, error) => {
  console.log(error)
  next(error)
}
