import crypto from 'crypto'

// Generate a random string
const random = () => crypto.randomBytes( 128 ).toString( 'base64' )

const authentication = ( salt: string, password: string ) =>
  crypto.createHmac( 'sha256', [ salt, password ].join( '/' ) ) // Create a hash of the salt and password
    .update( process.env.SECRET as string ) // Update the hash with the secret
    .digest( 'hex' ) // Digest the hash

export {
  random,
  authentication
}