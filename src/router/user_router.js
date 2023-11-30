const Router = require('koa-router')
const {
  create,
  list,
  detail,
  update,
  remove,
  updatePass,
} = require('../controller/user_controller')
const verifyToken = require('../middleware/verify_token')
const verifyPermission = require('../middleware/verify_permission')

const userRouter = new Router({ prefix: '/v1' })

//用户列表
userRouter.get('/user', verifyToken, verifyPermission, list)
//创建用户
userRouter.post('/user', verifyToken, verifyPermission, create)
//用户详情
userRouter.get('/user/:id', verifyToken, verifyPermission, detail)
//更新用户
userRouter.patch('/user/:id', verifyToken, verifyPermission, update)
//删除用户
userRouter.delete('/user/:id', verifyToken, verifyPermission, remove)
//修改密码
userRouter.patch(
  '/user/:id/password',
  verifyToken,
  verifyPermission,
  updatePass,
)

module.exports = userRouter
