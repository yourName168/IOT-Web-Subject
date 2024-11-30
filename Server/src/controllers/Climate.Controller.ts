import { Request, Response } from 'express'
import { Climate } from '~/models/schema/Climate.Schema'
import { climateServices } from '~/services/climate.services'
import { mqttService } from '~/services/MQTT.services'

const checkCondition = (value: number, min: number, max: number) => {
  return value >= min && value <= max
}

export const addDataController = async (req: Request, res: Response) => {
  const { temperature, soilMoisture, airHumidity } = req.body as unknown as Climate
  const result = await climateServices.addClimateData(temperature, soilMoisture, airHumidity)
  const pumpData = (await climateServices.getPumpStatus()) as any
  const [minTemPerature, maxTemperature] = pumpData.temperature.split('-')
  const [minSoilMoisture, maxSoilMoisture] = pumpData.soilMoisture.split('-')
  const [minAirHumidity, maxAirHumidity] = pumpData.airHumidity.split('-')

  let newPumpStatus = 'off'

  if (
    checkCondition(temperature, Number(minTemPerature), Number(maxTemperature)) &&
    checkCondition(soilMoisture, Number(minSoilMoisture), Number(maxSoilMoisture)) &&
    checkCondition(airHumidity, Number(minAirHumidity), Number(maxAirHumidity))
  ) {
    newPumpStatus = 'on'
  }

  if (newPumpStatus !== pumpData.status && pumpData.isManualPump) {
    await mqttService.publish('esp8266/pumpStatus', newPumpStatus)
    await climateServices.updatePumpStatus({
      ...pumpData,
      status: newPumpStatus
    })
  }

  if (result) {
    return res.status(200).json({ message: 'update Climate successfully' })
  } else {
    return res.status(500).json({ message: 'Failed to update climate' })
  }
}

export const getClimateController = async (req: Request, res: Response) => {
  const dataNumber = Number(req.query.dataNumber)
  const result = await climateServices.getClimate(dataNumber)
  if (result) {
    return res.status(200).json({ message: 'get Climate successfully', data: result })
  } else {
    return res.status(500).json({ message: 'Failed to get climate' })
  }
}

export const getPumpStatusController = async (req: Request, res: Response) => {
  const result = await climateServices.getPumpStatus()
  if (result) {
    return res.status(200).json({ message: 'get Pump Status successfully', data: result })
  } else {
    return res.status(500).json({ message: 'Failed to get pump status' })
  }
}

export const updatePumpStatusController = async (req: Request, res: Response) => {
  const { status } = req.body
  if (status) {
    await mqttService.publish('esp8266/pumpStatus', status)
  }
  const result = await climateServices.updatePumpStatus(req.body)
  await climateServices.addPumpHistory(req.body)
  if (result) {
    return res.status(200).json({ message: 'update Pump Status successfully' })
  } else {
    return res.status(500).json({ message: 'Failed to update pump status' })
  }
}

export const getPlantEnvironmentController = async (req: Request, res: Response) => {
  const { plantName } = req.body
  const result = await climateServices.getPlantEnvironment(plantName as string)
  if (result) {
    return res.status(200).json({ message: 'get Plant Environment successfully', data: result })
  } else {
    return res.status(500).json({ message: 'Failed to get plant environment' })
  }
}
