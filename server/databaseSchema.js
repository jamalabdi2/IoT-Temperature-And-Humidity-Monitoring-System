const  mongoose = require("mongoose")

const sensorDataSchema = new mongoose.Schema({
    humidity: {
        type: Number,
        required: [true,"Humidity value is required"]
    },
    temperature: {
        type: Number,
        required: [true,"Temperature value is required"]
    },
    timestamp: {
        type: String,
        required: [true,"Timestamp value is required"]
    }
},{timestamps: true})

const sensorDataModel = mongoose.model("SensorData", sensorDataSchema)

module.exports = sensorDataModel