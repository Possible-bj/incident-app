import mongoose from 'mongoose'
import connectDB from './db/mongoose.js'
import User from './models/userModel.js'
import Incident from './models/incidentModel.js'
import incidents from './data/incidents.js'
import users from './data/users.js'
import chalk from 'chalk'
connectDB()

const importData = async () => {
  try {
    await Incident.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id
    const sampleIncidents = incidents.map(incident => ({
      ...incident,
      user: adminUser
    }))
    await Incident.insertMany(sampleIncidents)
    console.log(chalk.green.inverse('Data Imported!'))
    process.exit()
  } catch (e) {
    console.error(chalk.red.inverse(`${e}`))
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Incident.deleteMany()
    await User.deleteMany()

    console.log(chalk.red.inverse('Data Destroyed!'))
    process.exit()
  } catch (e) {
    console.error(chalk.red.inverse(`${e}`))
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
// ~/mongodb/bin/mongod.exe --dbpath=/c/Users/DELL/hms-mongodb-data
