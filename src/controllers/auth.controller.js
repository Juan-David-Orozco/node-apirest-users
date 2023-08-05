import { connectDB, sql } from '../database'

export const login = async (req, res) => {
  try {
    const {email, password} = req.body
    console.log(email, password)
    const pool = await connectDB()
    const result = await pool.request()
      .input('i_email', sql.VarChar(100), email)
      .input('i_password', sql.VarChar(100), password)
      .execute('Login')
    
    const userLogin = result.recordset[0]
    console.log(userLogin)
    if(!userLogin) return res.status(400).json({msg: 'User Not Found'})
    res.status(200).json({mesagge:'Login', userLogin})
  } catch (error) {
    res.status(500).json({error: error})
  }
}