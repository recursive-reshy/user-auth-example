import express from 'express'
import http from 'http'	
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'

// DB
import connectDB from './db/db'

// App config
const PORT = process.env.PORT || 5000
const app = express()

// Middlewares
app.use( cors( { credentials: true } ) )
app.use( compression() )
app.use( cookieParser() )
app.use( bodyParser.json() )

const server = http.createServer( app )

const start = async () => {
  try {
    console.log( 'Connecting to DB...' )
    await connectDB( process.env.MONGO_URI || '' )
    console.log( 'Connected to DB' )

    console.log( 'Starting server...' )
    server.listen( PORT, () => {
      console.log( `Server is running on port ${PORT}` )
    } )
    
  } catch (error) {
    console.log( `Error starting server: ${error}` )
  }
}

start()