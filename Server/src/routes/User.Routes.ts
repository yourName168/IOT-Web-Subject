import { Router } from 'express'
import { loginController } from '~/controllers/Users.Controller'

const usersRoute = Router()
/**
 * Description. login a new user
 * path: /login
 * method: POST
 * Body:{password:string,email:string}
 */
usersRoute.post('/login', loginController)

export default usersRoute
