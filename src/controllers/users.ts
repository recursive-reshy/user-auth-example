import { Request, Response } from 'express'

import asyncWrapper from '../middleware/asyncWrapper.js'

import { getUsers, getUserById, updateUserById, deleteUserById } from '../models/Users.js'

const getAllUsers = asyncWrapper( async ( request: Request, response: Response ) => {
  const users = await getUsers()

  return response.status( 200 ).json( users )
} )

const updateUser = asyncWrapper( async ( request: Request, response: Response ) => {
  const { id } = request.params
  const { username, email } = request.body

  if( !username || !email ) {
    return response.sendStatus( 400 )
  }

  const user = await getUserById( id )

  if( !user ) {
    return response.sendStatus( 404 )
  }

  const updatedUser = await updateUserById( id, { username, email } )

  return response.json( updatedUser )
} )

const deleteUser = asyncWrapper( async ( request: Request, response: Response ) => {
  const { id } = request.params

  const deletedUser = await deleteUserById( id )

  return response.json( deletedUser )
} )

export { getAllUsers, updateUser, deleteUser }
