import { Collection, Db, MongoClient } from 'mongodb'

import dotenv from 'dotenv'
dotenv.config()
const databaseUserName = process.env.USERS_DATABASE_USER
const databasePassword = process.env.USERS_DATABASE_PASSWORD

console.log(databaseUserName)

const uri = `mongodb+srv://${databaseUserName}:${databasePassword}@cluster0.gius7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db('main_DB')
  }
  run = async () => {
    try {
      await this.client.connect()
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch {
      console.log('Cannot connect to database')
    }
  }
  getCollection = (collectionName: string): Collection => {
    return this.db.collection(collectionName)
  }
}
export const databaseService = new DatabaseService()
