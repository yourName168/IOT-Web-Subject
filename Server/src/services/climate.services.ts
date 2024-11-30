import { Climate } from '~/models/schema/Climate.Schema'
import { databaseService } from './database.services'
import plantAPIService from './GenarativeAI.services'

class ClimateServices {
  async addClimateData(temperature: number, soilMoisture: number, airHumidity: number) {
    const currentTime = new Date()
    console.log(airHumidity)
    const result = await databaseService
      .getCollection('climate-collection')
      .insertOne(new Climate(temperature, soilMoisture, airHumidity, currentTime))
    return result
  }
  async getClimate(dataNumber: number) {
    const result = await databaseService
      .getCollection('climate-collection')
      .find()
      .sort({ time: -1 }) // Sắp xếp giảm dần theo currentTime (từ mới nhất đến cũ nhất)
      .limit(dataNumber) // Giới hạn số lượng kết quả
      .toArray()
    // console.log(result)
    const pumpStatus = await databaseService.getCollection('pump-status').findOne()
    return {
      climateData: result,
      pumpStatus: pumpStatus?.status
    }
  }
  async getPumpStatus() {
    const result = await databaseService.getCollection('pump-status').findOne()
    return result
  }
  async updatePumpStatus({
    status,
    isManualPump,
    temperature,
    soilMoisture,
    airHumidity
  }: {
    status?: string
    isManualPump?: boolean
    temperature?: string
    soilMoisture?: string
    airHumidity?: string
  }) {
    const oldPumpStatus = await databaseService.getCollection('pump-status').findOne()
    const result = await databaseService.getCollection('pump-status').updateOne(
      {},
      {
        $set: {
          status: status || oldPumpStatus?.status,
          isManualPump: isManualPump || oldPumpStatus?.isManualPump,
          temperature: temperature || oldPumpStatus?.temperature,
          soilMoisture: soilMoisture || oldPumpStatus?.soilMoisture,
          airHumidity: airHumidity || oldPumpStatus?.airHumidity
        }
      }
    )
    return result
  }
  async addPumpHistory({
    status,
    isManualPump,
    temperature,
    soilMoisture,
    airHumidity
  }: {
    status?: string
    isManualPump?: boolean
    temperature?: string
    soilMoisture?: string
    airHumidity?: string
  }) {
    const currentTime = new Date()
    const result = await databaseService.getCollection('pump-history').insertOne({
      status,
      time: currentTime,
      isManualPump,
      temperature,
      soilMoisture,
      airHumidity
    })
    return result
  }
  async getPlantEnvironment(plantName: string) {
    if (!plantName) {
      throw new Error('Plant name is required')
    }
    try {
      const result = await plantAPIService.getPlantEnvironment(plantName)
      return result
    } catch (error) {
      console.error('Error:', error)
    }
  }
}
export const climateServices = new ClimateServices()
