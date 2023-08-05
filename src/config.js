import { config } from 'dotenv'
config()

export default {
  PORT: process.env.PORT || 5000,
  MSSQL : {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dbname: process.env.DB_NAME
  }
}