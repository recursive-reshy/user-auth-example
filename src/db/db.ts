import mongoose from 'mongoose'

const connectDB = ( uri: string ) => mongoose.connect( 
  uri,
  // { 
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true 
  // }
)

export default connectDB
