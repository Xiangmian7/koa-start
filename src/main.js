const app = require('./initialize')
const { APP_PORT } = require('./initialize/config')

app.listen(APP_PORT, () => {
  console.log(`服务启动成功，端口：${APP_PORT}`)
})
