import { connectDB, sql } from '../database'
import moment from 'moment'

export const getUsers = async (req, res) => {
  try {
    const pool = await connectDB()
    const result = await pool.request()
      .execute('getAllUsers')
    const users = result.recordset
    res.status(200).json({msg: "Get All Users", users})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

export const getUser = async (req, res) => {
  try {
    const pool = await connectDB()
    const response = await pool.request()
      .input('i_id', sql.Int, req.params.id)
      .execute('getUser')
    const user = response.recordset[0]
    console.log(user)
    if(!user) return res.status(404).json({msg: "User not found"})
    res.status(200).json({msg: "Get User", user})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

export const createUser = async (req, res) => {
  const { username, email, password } = req.body
  let { phone, city, address, type } = req.body
  // validacion parametros requeridos
  if(username == null || email == null || password == null) {
    return res.status(400).json({msg: "Bad Request, Fields required"})
  }
  // reasignacion parametro - type
  if(type === "admin") type = 1
  else if(type === "customer" || type === undefined) type = 2
  else {return res.status(400).json({msg: "UserType not exists"})}  
  // parametros opcionales (phone, city,address)
  // if(phone === undefined) phone = "NULL"
  // if(city === undefined) city = "NULL"
  // if(address === undefined) address = "NULL"
  // mostrar consola - parametros requeridos y opcionales
  console.log(username, email, password, type)
  console.log(phone, city, address)
  try {
    const pool = await connectDB()
    await pool.request()
      .input('i_username', sql.VarChar(50), username)
      .input('i_email', sql.VarChar(100), email)
      .input('i_password', sql.VarChar(100), password)
      .input('i_typeId', sql.Int, type)
      .input('i_active', sql.Bit, true)
      .input('i_phone', sql.VarChar(100), phone)
      .input('i_city', sql.VarChar(100), city)
      .input('i_address', sql.VarChar(100), address)
      .execute('createNewUser')
    res.status(201).json({msg: "New user created"})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

export const deleteUser = async (req, res) => {
  try {
    const pool = await connectDB()
    // Found user if exists
    const response = await pool.request()
      .input('i_id', sql.Int, req.params.id)
      .execute('getUser')
    const userFound = response.recordset[0]
    // If no exists return status 404
    if(!userFound) return res.status(404).json({msg: "User not found"})
    // If exists delete user found
    await pool.request()
      .input('i_id', sql.Int, req.params.id)
      .execute('deleteUser')
    res.status(204).json()
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

export const updateUser = async (req, res) => {
  let { username, email, phone, city, address } = req.body
  console.log(username, email, phone, city, address)
  try {
    const pool = await connectDB()
    // Found user if exists
    const response = await pool.request()
      .input('i_id', sql.Int, req.params.id)
      .execute('getUser')
    const userFound = response.recordset[0]
    console.log(userFound)
    // If no exists return status 404
    if(!userFound) return res.status(404).json({msg: "User not found"})
    if(username === undefined) username = userFound.username
    if(email === undefined) email = userFound.email
    if(phone === undefined) phone = userFound.phone
    if(city === undefined) city = userFound.city
    if(address === undefined) address = userFound.address
    console.log(username, email, phone, city, address)
    await pool.request()
      .input('i_id', sql.Int, req.params.id)
      .input('i_username', sql.VarChar(50), username)
      .input('i_email', sql.VarChar(100), email)
      .input('i_phone', sql.VarChar(100), phone)
      .input('i_city', sql.VarChar(100), city)
      .input('i_address', sql.VarChar(100), address)
      .execute('updateUser')
    res.status(201).json({msg: "Update user"})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

export const getTotalUsers = async (req, res) => {
  console.log("Get Total User")
  res.status(200).json({msg: "The total users are"})
}