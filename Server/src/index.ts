import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express } from 'express'
import userRoute from './routes/User.Routes'
import { databaseService } from './services/database.services'
import { getPlantRequirements } from './utils/openAI'
import climateRoutes from './routes/Climate.Routes'
import { mqttService } from './services/MQTT.services'
import { Climate } from './models/schema/Climate.Schema'

const generateClimateData = (): Climate[] => {
  const climateDataList: Climate[] = []

  for (let i = 0; i < 20; i++) {
    const temperature = Math.random() * (35 - 10) + 10 // Nhiệt độ ngẫu nhiên từ 10 đến 35
    const soilMoisture = Math.floor(Math.random() * 101) // Độ ẩm đất ngẫu nhiên từ 0 đến 100
    const airHumidity = Math.floor(Math.random() * 101) // Độ ẩm không khí ngẫu nhiên từ 0 đến 100
    const time = new Date() // Thời gian hiện tại

    const climateData = new Climate(temperature, soilMoisture, airHumidity, time)
    climateDataList.push(climateData)
  }

  return climateDataList
}

const demoData = generateClimateData()
const count = 0

// setInterval(async () => {
//   const index = count % demoData.length
//   const data = JSON.stringify(demoData[index])
//   await mqttService.publish('esp8266/sendData', data)
// }, 10000)

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})

databaseService.run()
mqttService.connect()
// .then(async () => {
//   await mqttService.subscribe('esp8266/sendData')
//   await mqttService.onMessage((topic, message) => {
//     const environmentData = JSON.parse(message)
//     receiveEnvironmentDataController(environmentData)
//   })
// })
app.use(express.json())
app.use(cors())
app.use('/users', userRoute)
app.use('/climate', climateRoutes)
