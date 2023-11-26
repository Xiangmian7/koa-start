const { Sequelize } = require('sequelize')
const config = require('./config')

const sequelize = new Sequelize(
  config.MYSQL_DATABASE,
  config.MYSQL_USER,
  config.MYSQL_PASS,
  {
    host: config.MYSQL_HOST,
    port: config.MYSQL_PORT,
    dialect: 'mysql',
    logging: config.SEQUELIZE_LOGGING === 'true',
    timezone: '+08:00',
  },
)

;(async () => {
  try {
    await sequelize.authenticate()
    console.log('mysql连接成功')
  } catch (error) {
    console.error('mysql连接失败', error)
  }
})()
;(async () => {
  try {
    await sequelize.sync()
    console.log('模型同步成功')
  } catch (error) {
    console.log('模型同步失败')
  }
})()

module.exports = sequelize
