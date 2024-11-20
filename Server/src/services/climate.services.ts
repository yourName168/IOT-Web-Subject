import { Climate } from '~/models/schema/Climate.Schema'
import { databaseService } from './database.services'

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
    console.log(result)
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
  async updatePumpStatus({ status, isManualPump }: { status: string; isManualPump: boolean }) {
    const result = await databaseService.getCollection('pump-status').updateOne({}, { $set: { status, isManualPump } })
    return result
  }
}
export const climateServices = new ClimateServices()
