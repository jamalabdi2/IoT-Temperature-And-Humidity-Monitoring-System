const mongoose = require("mongoose")
require("dotenv").config()


const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI
        await mongoose.connect(MONGO_URI)
        console.log('Successfully connected to the Database')        
    } catch (error) {
        console.error('Error connected to the database: ', error.message)
        process.exit(1)
        
    }
}

module.exports = connectDB
