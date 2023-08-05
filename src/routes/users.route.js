import { Router } from 'express'
import { getUsers, createUser, deleteUser, updateUser, getUser, getTotalUsers } from '../controllers/users.controller'

const router = Router()

router.get('/users', getUsers)

router.post('/users', createUser)

router.get('/users/count', getTotalUsers)

router.get('/users/:id', getUser)

router.delete('/users/:id', deleteUser)

router.put('/users/:id', updateUser)

export default router