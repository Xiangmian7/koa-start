const { fail } = require('../common/response')
const errorHandler = () => {
  return async (ctx, next) => {
    //全局错误捕获
    try {
      await next()
    } catch (err) {
      //错误处理
      console.log(err)
      fail(ctx, err)
    }
  }
}

module.exports = errorHandler
