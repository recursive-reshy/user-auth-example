import { Router } from 'express'

// Routes
import authentication from './authentication.js'
import users from './users.js'

const router = Router()

router.use( '/auth', authentication )
router.use( '/users', users )

export default router
