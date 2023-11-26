const Redis = require('ioredis')
const config = require('./config')

const redis = new Redis({
  port: config.REDIS_PORT,
  host: config.REDIS_HOST,
  password: config.REDIS_PASS,
  db: config.REDIS_DATABASE,
})

module.exports = redis
