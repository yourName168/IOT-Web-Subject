import { config } from 'dotenv' // Import dotenv for environment variable management
import { GoogleGenerativeAI } from '@google/generative-ai'

// Load environment variables from the .env file
config()

interface PlantEnvironment {
  temperature: string
  soilMoisture: string
  airHumidity: string
  light: string
  plantName: string
}

class PlantEnvironmentAPIService {
  private apiKey: string

  constructor() {
    // Access the environment variable for the API key
    this.apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? ''

    // Validate that the API key is available
    if (!this.apiKey) {
      console.error('ERROR: Gemini API key not found in environment variables')
      process.exit(1) // Exit the process if API key is missing
    }
  }

  // Method to validate data format
  private validateFormat(value: string, field: string): void {
    if (field === 'light') {
      if (typeof value !== 'string' || value.trim() === '') {
        throw new Error(`Invalid ${field} format: ${value}`)
      }
      return
    }

    // Validate temperature and humidity values
    const pattern = /^\d+-\d+\s*[°%]C?$/
    if (!pattern.test(value)) {
      throw new Error(`Invalid ${field} format: ${value}`)
    }
  }

  // Method to get the plant environment data
  public async getPlantEnvironment(plantName: string): Promise<any> {
    if (!plantName) {
      throw new Error('Plant name is required')
    }

    try {
      // Use the Gemini API model with the API key
      const model = new GoogleGenerativeAI(this.apiKey).getGenerativeModel({ model: 'gemini-1.5-flash' })

      const prompt = `Provide the ideal environmental conditions for the plant "${plantName}".
            Return ONLY a JSON object in this exact format, with no additional text or formatting:
            {
                "temperature": "min-max °C",
                "soilMoisture": "min-max %",
                "airHumidity": "min-max %",
                "light": ""
            }`

      const result = await model.generateContent(prompt)
      const response = result.response
      let text = response.text()

      // Clean the response text (remove code blocks, extra spaces, etc.)
      text = text
        .replace(/```json\n|\n```/g, '')
        .replace(/[\u200B-\u200D\uFEFF]/g, '')
        .trim()

      let parsedResponse: PlantEnvironment
      try {
        parsedResponse = JSON.parse(text)
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError)
        throw new Error('Invalid response format')
      }

      const { temperature, soilMoisture, airHumidity, light } = parsedResponse

      if (!temperature || !soilMoisture || !airHumidity || !light) {
        throw new Error('Incomplete data in response')
      }

      // Validate the format of the data
      this.validateFormat(temperature, 'temperature')
      this.validateFormat(soilMoisture, 'soilMoisture')
      this.validateFormat(airHumidity, 'airHumidity')
      this.validateFormat(light, 'light')

      return {
        temperature,
        soilMoisture,
        airHumidity,
        light,
        plantName: plantName
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
}

// Example usage:
const plantAPIService = new PlantEnvironmentAPIService()
export default plantAPIService
