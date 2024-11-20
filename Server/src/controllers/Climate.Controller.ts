import { Request, Response } from 'express'
import { Climate } from '~/models/schema/Climate.Schema'
import { climateServices } from '~/services/climate.services'

export const addDataController = async (req: Request, res: Response) => {
  const { temperature, soilMoisture, airHumidity } = req.body as unknown as Climate
  const result = await climateServices.addClimateData(temperature, soilMoisture, airHumidity)
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
  const result = await climateServices.updatePumpStatus(req.body)
  if (result) {
    return res.status(200).json({ message: 'update Pump Status successfully' })
  } else {
    return res.status(500).json({ message: 'Failed to update pump status' })
  }
}
