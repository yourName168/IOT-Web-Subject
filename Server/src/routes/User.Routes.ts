import { Router } from 'express'
import { helloController } from '~/controllers/Users.Controller'

import { wrap } from '~/utils/handler'
import { validate } from '~/utils/validation'

const usersRoute = Router()
/**
 * Description. login a new user
 * path: /login
 * mothod: POST
 * Body:{password:string,email:string}
 */
usersRoute.get('/', helloController)

export default usersRoute
