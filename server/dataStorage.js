const  fs = require("fs")
const createCsvWriter = require("csv-writer").createObjectCsvWriter
const path = require("path")
const sensorDataModel = require("./databaseSchema")


const saveToMongoDB = async (sensorData) => {
    try {
        const newSensorData = new sensorDataModel(sensorData)
        await newSensorData.save()
        console.log('Data saved to MongoDB.');

    } catch (error) {
        console.error('Error saving to MongoDB:', error.message);
    }

}

const saveToJSON = async (sensorData,fileName) => {
    
    const filePath = path.join(__dirname,"Sensor Data",fileName)

    fs.readFile(filePath, "utf-8", (error, data) => {
        if(error && error.code !== "ENOENT"){
            console.error(`Error reading file ${fileName}: `,error.name)
            return
        }
        
        const jsonData = data ? JSON.parse(data) : []
        jsonData.push(sensorData)

        const jsonDataStringFied = JSON.stringify(jsonData, null, 2)

        fs.writeFile(filePath,jsonDataStringFied, (error) => {
            if(error) {
                console.error(`Error writting to file: ${fileName}`)
            }else{
                console.log(`Sensor data saved to file: ${fileName}`)
            }
        })

    })
    
}


const saveToCSV = async (sensorData, fileName) => {
    const filePath = path.join(__dirname, "Sensor Data", fileName) 

    const csvWriter = createCsvWriter({
        path: filePath,
        header: [
            {id: 'timestamp',title: 'Timestamp'},
            {id: 'temperature',title: 'Temperature'},
            {id: 'humidity',title: 'Humidity'},
        ],
        append: true
    })

    try {
        await csvWriter.writeRecords([sensorData])
        console.log(`Data saved to ${fileName}`)
    } catch (error) {
        console.error(`Error occured while writting to file: ${fileName}: `,error.message)
    }

    
}


module.exports = {
    saveToCSV,
    saveToJSON,
    saveToMongoDB
}
