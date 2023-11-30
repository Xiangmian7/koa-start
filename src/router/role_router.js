const Router = require('koa-router')
const {
  create,
  list,
  detail,
  update,
  remove,
} = require('../controller/role_controller')
const verifyToken = require('../middleware/verify_token')
const verifyPermission = require('../middleware/verify_permission')

const roleRouter = new Router({ prefix: '/v1' })

//用户列表
roleRouter.get('/role', verifyToken, verifyPermission, list)
//创建用户
roleRouter.post('/role', verifyToken, verifyPermission, create)
//用户详情
roleRouter.get('/role/:id', verifyToken, verifyPermission, detail)
//更新用户
roleRouter.put('/role/:id', verifyToken, verifyPermission, update)
//删除用户
roleRouter.delete('/role/:id', verifyToken, verifyPermission, remove)

module.exports = roleRouter
