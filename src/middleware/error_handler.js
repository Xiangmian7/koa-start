const errorHandler = () => {
  return async (ctx, next) => {
    //全局错误捕获
    try {
      await next()
    } catch (err) {
      //发出错误事件
      console.log('出错了~~')
      ctx.app.emit('error', ctx, err)
    }
  }
}

module.exports = errorHandler
