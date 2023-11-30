const Redis = require('ioredis')
const config = require('./config')

const redis = new Redis({
  port: config.REDIS_PORT,
  host: config.REDIS_HOST,
  password: config.REDIS_PASS,
  db: config.REDIS_DATABASE,
})

redis.on('ready', () => {
  console.log('redis连接成功')
})

redis.on('error', error => {
  console.log('redis连接失败', error)
})

module.exports = redis
