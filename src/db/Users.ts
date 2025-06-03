import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema( {
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  authentication: {
    password: { type: String, required: true, select: false }, // select: false means that the password is not included in the response
    salt: { type: String, required: true, select: false }, // salt is used to hash the password
    sessionToken: { type: String, select: false },
  }
} )

const UserModel = mongoose.model( 'User', UserSchema )

// Create
const createUser = async ( newUser: Record< string, any > ) => {
  try {
    const user = await new UserModel( newUser ).save()
    return user.toObject()
  } catch ( error ) {
    console.log( `Error creating ${ newUser.username }: ${ error }` )
  }
}

// Read
const getUsers = () => UserModel.find()
const getUserById = ( id: string ) => UserModel.findById( id )
const getUserByEmail = ( email: string ) => UserModel.findOne( { email } )
const getUserBySessionToken = ( sessionToken: string ) => UserModel.findOne( { 'authentication.sessionToken': sessionToken } )

// Update
const updateUserById = ( id: string, values: Record< string, any > ) => UserModel.findByIdAndUpdate( id, values )

// Delete
const deleteUserById = ( id: string ) => UserModel.findOneAndDelete( { _id: id } )

export {
  createUser,
  getUsers,
  getUserById,
  getUserByEmail,
  getUserBySessionToken,
  updateUserById,
  deleteUserById
}
