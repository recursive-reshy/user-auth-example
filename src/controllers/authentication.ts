import { Request, Response } from 'express'

import { random, authentication } from '../utils/index.js'
import asyncWrapper from '../middleware/asyncWrapper.js'

import { createUser, getUserByEmail } from '../models/Users.js'

const signup = asyncWrapper( async ( request: Request, response: Response ) => {
  const { username, email, password } = request.body

  if ( !username || !email || !password ) {
    return response.sendStatus( 400 )
  }

  const existingUser = await getUserByEmail( email )

  if( existingUser ) {
    return response.sendStatus( 400 )
  }

  const salt = random()

  const user = await createUser( { 
    username,
    email,
    authentication: {
      salt,
      password: authentication( salt, password ),
    }
  } )

  return response.status( 200 ).json( user ).end() // end() is used to end the response
} )

const login = asyncWrapper( async ( request: Request, response: Response ) => {
  const { email, password } = request.body

  if( !email || !password ) {
    return response.sendStatus( 400 )
  }

  const user = await getUserByEmail( email )
    .select( '+authentication.salt +authentication.password' ) // select is used to select the fields that are not included in the response

  if( !user || !user.authentication ) {
    return response.sendStatus( 400 )
  }

  const expectedHash = authentication( user.authentication.salt, password )

  if( expectedHash != user.authentication.password ) {
    return response.sendStatus( 403 )
  }

  user.authentication.sessionToken = authentication( random(), user._id.toString() )

  await user.save()

  response.cookie( 
    process.env.COOKIE_NAME as string, // name of the cookie
    user.authentication.sessionToken, // value of the cookie
    { domain: 'localhost', // domain of the cookie
      path: '/' // path of the cookie
    }
  )

  return response.status( 200 ).json( user ).end()
} )

export { signup, login }