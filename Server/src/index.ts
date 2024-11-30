import cors from 'cors'
import { Server as SocketServer } from 'socket.io'
import dotenv from 'dotenv'
import express, { Express } from 'express'
import http from 'http' // Import http to use with Express

import userRoute from './routes/User.Routes'
import { databaseService } from './services/database.services'
import climateRoutes from './routes/Climate.Routes'
import { mqttService } from './services/MQTT.services'
import { Climate } from './models/schema/Climate.Schema'
import SocketService from './services/socket.services'
import { addDataController } from './controllers/Climate.Controller'

dotenv.config()

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

const app: Express = express()
const server = http.createServer(app) // Create HTTP server using Express
const io = new SocketServer(server, {
  cors: {
    origin: '*', // Allow all origins (can be restricted for production)
    methods: ['GET', 'POST']
  }
})

// Instantiate the SocketService to handle socket events
new SocketService(io)

// Configure your routes
app.use(express.json())
app.use(cors())
app.use('/users', userRoute)
app.use('/climate', climateRoutes)

// Connect to the database and MQTT service
databaseService.run()
mqttService.connect().then(() => {
  mqttService.subscribe('esp8266/sendData')
  mqttService.onMessage((topic, message) => {
    console.log(`Received message on topic "${topic}": ${message.toString()}`)
    const data = JSON.parse(message.toString())
    addDataController(data)
  })
})

// Start the server with Socket.IO and Express
const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
