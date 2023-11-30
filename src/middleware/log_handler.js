const log4js = require('log4js')
const path = require('path')
const { APP_MODE } = require('../initialize/config')

log4js.configure({
  appenders: {
    // 控制台输出
    console: { type: 'console' },
    //输出到文件
    loginFile: {
      type: 'file',
      filename: path.join(__dirname, '../common/logs/server-login.log'),
    },
    operateFile: {
      type: 'file',
      filename: path.join(__dirname, '../common/logs/server-operate.log'),
    },
  },
  categories: {
    default: { appenders: ['console'], level: 'debug' },
    login: { appenders: ['loginFile'], level: 'info' },
    operate: { appenders: ['operateFile'], level: 'info' },
  },
})

const defaultLogger = log4js.getLogger()
const operateLogger = log4js.getLogger('operate')
const loginLogger = log4js.getLogger('login')
const logHandler = () => {
  return async (ctx, next) => {
    const nowTime = new Date() //当前时间
    const startTime = nowTime.getTime() //请求开始时间

    await next()

    const currentDateTime = nowTime.toLocaleString() //格式化请求时间
    const endTime = new Date().getTime() //请求结束时间
    const time = endTime - startTime + 'ms' //请求耗时
    const url = ctx.request.url //url地址
    const path = ctx.request.path //请求路径
    const ip = ctx.request.header.host //请求ip地址
    const method = ctx.request.method //请求方法
    const userAgent = ctx.request.header['user-agent'] //请求浏览器标识
    const status = ctx.state.status //请求结果
    const res = JSON.stringify(ctx.state.res) //请求响应的数据
    const req = JSON.stringify({
      params: ctx.request.params,
      query: ctx.request.query,
      body: ctx.request.body,
    }) //请求参数
    if (APP_MODE === 'debug') {
      defaultLogger.debug(method, url, ip)
      return
    }
    const info = [
      currentDateTime,
      time,
      method,
      url,
      ip,
      userAgent,
      status,
      req,
      res,
    ]
    if (method === 'GET') {
      //get请求，判断数据获取是否成功，失败则打印日志，成功不做处理
      if (status === 'error') {
        operateLogger.error(...info)
        return
      }
      return
    }
    //post、patch、delete、put等日志，操作日志和登录日志分开打印
    if (path === '/v1/login' && method === 'POST') {
      //打印登录日志
      if (status === 'error') {
        loginLogger.error(...info)
        return
      }
      //登录失败
      loginLogger.info(...info)

      //登录成功
      return
    }
    //打印操作日志
    if (status === 'error') {
      operateLogger.error(...info)
      return
    }
    //操作成功
    //操作失败
    operateLogger.info(...info)
  }
}

module.exports = logHandler
