import express from 'express'
import userCtrl from '../user/user.controller'
import authCtrl from './auth.controller'

const router = express.Router()
router.post('/auth/sign-up', ...userCtrl.validateUserBody, authCtrl.signUp)
router.post('/auth/sign-in', ...userCtrl.validateUserCredentials, authCtrl.signIn)
router.post('/auth/sign-out', authCtrl.signOut)

export default router
