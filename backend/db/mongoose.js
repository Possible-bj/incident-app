import mongoose from 'mongoose'
import chalk from 'chalk'
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    })
    console.log(
      chalk.blue.underline(`MongoDB Connected: ${conn.connection.host}`)
    )
  } catch (e) {
    console.error(chalk.red.bold(`Error: ${e.message}`))
    process.exit(1)
  }
}

export default connectDB
