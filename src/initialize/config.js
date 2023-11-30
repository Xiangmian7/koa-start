const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

dotenv.config()

const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, '../common/keys/private.key'),
)

const PUBLIC_KEY = fs.readFileSync(
  path.resolve(__dirname, '../common/keys/public.key'),
)

const {
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_PASS,
  MYSQL_PORT,
  MYSQL_USER,
  REDIS_DATABASE,
  REDIS_PASS,
  REDIS_PORT,
  APP_PORT,
  SEQUELIZE_LOGGING,
  REDIS_HOST,
  APP_MODE,
} = process.env

module.exports = {
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_PASS,
  MYSQL_PORT,
  MYSQL_USER,
  REDIS_DATABASE,
  REDIS_PASS,
  REDIS_PORT,
  APP_PORT,
  SEQUELIZE_LOGGING,
  REDIS_HOST,
  PRIVATE_KEY,
  PUBLIC_KEY,
  APP_MODE,
}
