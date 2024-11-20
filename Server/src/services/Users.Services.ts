import { databaseService } from './database.services'

class UserService {
  async login(userName: string, password: string) {
    const result = await databaseService.getCollection('user-collection').findOne({ userName, password })
    console.log(result)
    return result
  }
}
export const userService = new UserService()
