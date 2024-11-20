export class Climate {
  temperature: number
  soilMoisture: number
  airHumidity: number
  time: Date
  constructor(temperature: number, soilMoisture: number, airHumidity: number, time: Date) {
    this.temperature = temperature
    this.soilMoisture = soilMoisture
    this.airHumidity = airHumidity
    this.time = time
  }
}
