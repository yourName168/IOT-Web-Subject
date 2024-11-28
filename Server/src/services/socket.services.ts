import { Server, Socket } from 'socket.io'

// Define the events we expect to handle
interface SocketEvents {
  message: string
  disconnect: void
  welcome: { message: string }
}

class SocketService {
  private io: Server

  constructor(io: Server) {
    this.io = io
    this.setupSocketEvents()
  }

  private setupSocketEvents() {
    this.io.on('connection', (socket: Socket) => {
      console.log(`Client connected: ${socket.id}`)

      // Handle the 'message' event from clients
      socket.on('message', (message: string) => {
        console.log(`Received message from ${socket.id}: ${message}`)
        // Optionally, send a response to the client
        socket.emit('message', `Received: ${message}`)
      })

      // Send a 'welcome' message to the client on connection
      socket.emit('welcome', { message: 'Welcome to the Socket.IO server!' })

      // Handle disconnect event
      socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`)
      })
    })
  }

  // You can add additional methods for emitting events or broadcasting
  public sendToAll(event: string, data: any) {
    this.io.emit(event, data)
  }

  public sendToClient(socketId: string, event: string, data: any) {
    const socket = this.io.sockets.sockets.get(socketId)
    if (socket) {
      socket.emit(event, data)
    }
  }
}

export default SocketService
