import { connectDB, sql } from '../database'

export const login = async (req, res) => {
  try {
    const {email, password} = req.body
    // Validate Fields required
    if(email === null ||  email === "") return res.status(400).json({mesagge: "Email Required"})
    if(password === null || password === "") return res.status(400).json({mesagge: "Password Required"})
    const pool = await connectDB()
    const result = await pool.request()
      .input('i_email', sql.VarChar(100), email)
      .input('i_password', sql.VarChar(100), password)
      .execute('Login')
    const userLogin = result.recordset[0]
    // return userLogin Client
    if(!userLogin) return res.status(400).json({msg: 'User Not Found'})
    res.status(200).json({mesagge:'Login Success', userLogin})
  } catch (error) {
    res.status(500).json({error: error})
  }
}

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body
    let { phone, city, address } = req.body
    // Validate Fields required
    if(username === undefined ||  username === "") return res.status(400).json({mesagge: "Username Required"})
    if(email === undefined ||  email === "") return res.status(400).json({mesagge: "Email Required"})
    if(password === undefined || password === "") return res.status(400).json({mesagge: "Password Required"})
    const pool = await connectDB()
    // Verification if user already exist
    const result = await pool.request()
      .input('i_email', sql.VarChar(100), email)
      .execute('getUserEmail')
    // if user exits - return Email Duplicated (status 400 )
    const userExist = result.recordset[0]
    if(userExist) return res.status(400).json({mesagge: "Email Duplicated"})
    // execute register
    const response = await pool.request()
      .input('i_username', sql.VarChar(50), username)
      .input('i_email', sql.VarChar(100), email)
      .input('i_password', sql.VarChar(100), password)
      .input('i_typeId', sql.Int, 2)
      .input('i_active', sql.Bit, true)
      .input('i_phone', sql.VarChar(100), phone)
      .input('i_city', sql.VarChar(100), city)
      .input('i_address', sql.VarChar(100), address)
      .execute('Register')
    const userRegister = response.recordset[0]
    res.status(201).json({mesagge: "Register Success", userRegister})
  } catch (error) {
    res.status(500).json({error: error})
  }
}