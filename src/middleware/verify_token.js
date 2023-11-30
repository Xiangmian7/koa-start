const { parseToken } = require('../util/jwt')
const errorTypes = require('../common/error_types')
// token验证中间件
const verifyToken = async (ctx, next) => {
  //拿到token
  const tokenString = ctx.request.header.authorization?.split(' ')[1]
  if (!tokenString) {
    //未验证
    throw errorTypes.UnAuthorized
  }
  //token解析
  const { id, roleId, username } = parseToken(tokenString)
  ctx.state.user = { id, roleId, username }
  //储存用户信息
  await next()
}

module.exports = verifyToken
