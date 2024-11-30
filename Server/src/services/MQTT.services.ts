import mqtt, { MqttClient, IClientOptions } from 'mqtt'

class MQTTService {
  private client: MqttClient | null = null
  private uri: string
  private options: IClientOptions

  constructor(uri: string, options: IClientOptions) {
    this.uri = uri
    this.options = options
  }

  // Hàm connect để khởi tạo kết nối
  connect = async (): Promise<void> => {
    try {
      this.client = mqtt.connect(this.uri, this.options)

      this.client.on('connect', () => {
        console.log('Connected to MQTT server')
      })

      this.client.on('error', (err) => {
        console.error('MQTT connection error:', err.message)
      })

      this.client.on('close', () => {
        console.warn('MQTT connection closed.')
      })

      console.log('Connecting to MQTT server...')
    } catch (error) {
      console.error('Failed to connect to MQTT server:', error)
    }
  }

  // Publish a message to a topic
  public publish = async (topic: string, message: string) => {
    if (this.client) {
      await this.client.publish(topic, message, {}, (err) => {
        if (err) {
          console.error(`Failed to publish to topic "${topic}":`, err.message)
        } else {
          console.log(`Message published to topic "${topic}": ${message}`)
        }
      })
    } else {
      console.warn('Cannot publish. MQTT client is not connected.')
    }
  }

  // Subscribe to a topic
  public subscribe = async (topic: string) => {
    if (this.client) {
      await this.client.subscribe(topic, (err) => {
        if (!err) {
          console.log(`Subscribed to topic "${topic}"`)
        } else {
          console.error(`Failed to subscribe to topic "${topic}":`, err.message)
        }
      })
    } else {
      console.warn('Cannot subscribe. MQTT client is not connected.')
    }
  }

  // Unsubscribe from a topic
  public unsubscribe = (topic: string): void => {
    if (this.client) {
      this.client.unsubscribe(topic, (err) => {
        if (!err) {
          console.log(`Unsubscribed from topic "${topic}"`)
        } else {
          console.error(`Failed to unsubscribe from topic "${topic}":`, err.message)
        }
      })
    } else {
      console.warn('Cannot unsubscribe. MQTT client is not connected.')
    }
  }

  // Handle incoming messages
  public onMessage = async (callback: (topic: string, message: string) => void) => {
    if (this.client) {
      await this.client.on('message', (topic, message) => {
        callback(topic, message.toString())
      })
    } else {
      console.warn('Cannot set message handler. MQTT client is not connected.')
    }
  }

  // Disconnect from the MQTT broker
  public disconnect = (): void => {
    if (this.client) {
      this.client.end(() => {
        console.log('Disconnected from MQTT broker.')
        this.client = null
      })
    } else {
      console.warn('MQTT client is not connected.')
    }
  }

  // Get the MQTT client instance
  public getClient = (): MqttClient | null => {
    return this.client
  }
}

export const mqttService = new MQTTService('wss://857b1e599d53407db9d3ae30eb7404dc.s1.eu.hivemq.cloud:8884/mqtt', {
  clientId: 'web_' + Math.random().toString(16).substr(2, 8),
  username: 'quangnv',
  password: 'Qnv123456',
  clean: true
})
