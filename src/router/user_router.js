const Router = require('koa-router')
const {
  create,
  list,
  detail,
  update,
  remove,
  login,
  captcha,
} = require('../controller/user_controller')
const verifyToken = require('../middleware/verify_token')
const verifyPermission = require('../middleware/verify_permission')

const userRouter = new Router()

//用户列表
userRouter.get('/user', verifyToken, verifyPermission, list)
//创建用户
userRouter.post('/user', verifyToken, verifyPermission, create)
//用户详情
userRouter.get('/user/:id', verifyToken, verifyPermission, detail)
//更新用户
userRouter.put('/user/:id', verifyToken, verifyPermission, update)
//删除用户
userRouter.delete('/user/:id', verifyToken, verifyPermission, remove)
//用户登录
userRouter.post('/login', login)
//获取验证码
userRouter.get('/captcha', captcha)

module.exports = userRouter
