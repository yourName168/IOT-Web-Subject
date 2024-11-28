import { Router } from 'express'
import {
  getClimateController,
  addDataController,
  updatePumpStatusController,
  getPumpStatusController,
  getPlantEnvironmentController
} from '~/controllers/Climate.Controller'
const climateRoutes = Router()

climateRoutes.post('/update-climate', addDataController)
/*
  method: GET
  body: {temperature: number, soilMoisture: number, airHumidity: number}
  description: update the climate data
*/

climateRoutes.get('/get-climate', getClimateController)
/*
  method: GET
  body: {}
  description: get the climate data
*/

climateRoutes.put('/update-pump-status', updatePumpStatusController)
/*
  method: PUT
  body: {status: string, isManualPump: boolean}
  description: update the pump status
*/
climateRoutes.get('/get-pump-status', getPumpStatusController)
/*
  method: GET
  body: {}
  description: get the pump status
*/
climateRoutes.post('/get-plant-environment', getPlantEnvironmentController)
/*
  method: GET
  body: {plantName: string}
  description: get the plant environment
*/

export default climateRoutes
