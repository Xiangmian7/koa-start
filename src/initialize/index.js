const Koa = require('koa')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const errorHandler = require('../middleware/error_handler')
const useRoutes = require('../router')
const logHandler = require('../middleware/log_handler')

const app = new Koa()
//日志处理
app.use(logHandler())
//cors跨域
app.use(cors())
//解析body参数
app.use(bodyParser())
//全局错误处理
app.use(errorHandler())
//注册路由
useRoutes(app)

module.exports = app
