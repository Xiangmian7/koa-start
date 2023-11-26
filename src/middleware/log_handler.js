const log4js = require('log4js')
const logger = log4js.getLogger()
logger.level = 'all'
const logHandler = () => {
  return async (ctx, next) => {
    const url = ctx.request.url
    const path = ctx.request.path
    const ip = ctx.request.header.host
    const method = ctx.request.method
    logger.debug(url, method, ip)
    await next()
  }
}

module.exports = logHandler
