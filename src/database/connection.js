import sql from 'mssql'
import config from '../config'

const dbConfig = {
  user: config.MSSQL.user,
  password: config.MSSQL.password,
  database: config.MSSQL.dbname,
  server: "localhost",
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
}

export const connectDB = async () => {
  try {
    const pool = await sql.connect(dbConfig)
    return pool
  } catch (error) {
    console.log(error)
  }
}

export { sql }