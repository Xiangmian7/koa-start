// 权限验证中间件
const verifyPermission = async (ctx, next) => {
  const { url, method } = ctx.request
  //判断是不是动态路由
  if (Object.keys(ctx.request.params).length === 0) {
    console.log('普通路由')
  } else {
    //是动态路由
    console.log('动态路由')
    const paramKeys = Object.keys(ctx.request.params)
  }
  await next()
}

module.exports = verifyPermission
