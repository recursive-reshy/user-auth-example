import { Request, Response, NextFunction } from 'express'

import { get, merge } from 'lodash'

import asyncWrapper from './asyncWrapper.js'

import { getUserBySessionToken } from '../models/Users.js'

const isAuthenticated = asyncWrapper( async( request: Request, response: Response, next: NextFunction ) => {
  const sessionToken = request.cookies[ process.env.COOKIE_NAME as string ]

  if( !sessionToken ) {
    return response.sendStatus( 403 )
  }

  const existingUser = await getUserBySessionToken( sessionToken )

  if( !existingUser ) {
    return response.sendStatus( 403 )
  }

  // merge the existingUser object into the request object
  merge( request, { identity: existingUser } )

  return next()
} )

const isOwner = asyncWrapper( async ( request: Request, response: Response, next: NextFunction ) => {
  const { id } = request.params

  // identity is the user object that is merged into the request object by the isAuthenticated middleware
  const currentUserId = get( request, 'identity._id' )

  if( !currentUserId ) {
    return response.sendStatus( 403 )
  }

  if( id != currentUserId ) {
    return response.sendStatus( 403)
  }

  return next()
} )

export { isAuthenticated, isOwner }