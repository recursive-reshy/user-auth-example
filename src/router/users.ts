import { Router } from 'express'

// Middlewares
import { isAuthenticated, isOwner } from '../middleware/authenthicationHelper.js'

// Controllers
import { getAllUsers, updateUser, deleteUser } from '../controllers/users.js'

const router = Router()

router.route( '/' ).get( isAuthenticated, getAllUsers )

router.route( '/:id' )
  .put( isAuthenticated, isOwner, updateUser )
  .delete( isAuthenticated, isOwner, deleteUser )

export default router
