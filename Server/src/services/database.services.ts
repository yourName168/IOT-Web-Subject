import { Collection, Db, MongoClient } from 'mongodb'

import dotenv from 'dotenv'
dotenv.config()
const databaseUserName = process.env.USERS_DATABASE_USER
const databasePassword = process.env.USERS_DATABASE_PASSWORD

const uri = `mongodb+srv://${databaseUserName}:${databasePassword}@useraccount.p0jlcj2.mongodb.net/?retryWrites=true&w=majority`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
class DatabaseService {
  private client: MongoClient
  constructor() {
    this.client = new MongoClient(uri)
  }
  run = async () => {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await this.client.connect()
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch {
      console.log('Cannot connect to database')
    }
  }
}
export const databaseService = new DatabaseService()
