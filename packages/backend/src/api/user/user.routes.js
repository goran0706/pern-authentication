import express from 'express'
import authCtrl from '../auth/auth.controller'
import userCtrl from './user.controller'

const router = express.Router()

router.use('/api/v1/users/:userId', authCtrl.hasAuthentication, authCtrl.hasAuthorization)

router
  .route('/api/v1/users')
  .get(userCtrl.getUsers)
  .post(...userCtrl.validateUserBody, userCtrl.createUser)

router
  .route('/api/v1/users/:userId')
  .get(...userCtrl.validateUserParams, userCtrl.getUserById)
  .put(...userCtrl.validateUserParams, ...userCtrl.validateUserBody, userCtrl.updateUser)
  .delete(...userCtrl.validateUserParams, userCtrl.deleteUser)

export default router
