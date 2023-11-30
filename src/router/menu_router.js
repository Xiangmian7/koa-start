const Router = require('koa-router')
const {
  create,
  list,
  detail,
  update,
  remove,
} = require('../controller/menu_controller')
const verifyToken = require('../middleware/verify_token')
const verifyPermission = require('../middleware/verify_permission')

const menuRouter = new Router({ prefix: '/v1' })

//用户列表
menuRouter.get('/menu', verifyToken, verifyPermission, list)
//创建用户
menuRouter.post('/menu', verifyToken, verifyPermission, create)
//用户详情
menuRouter.get('/menu/:id', verifyToken, verifyPermission, detail)
//更新用户
menuRouter.put('/menu/:id', verifyToken, verifyPermission, update)
//删除用户
menuRouter.delete('/menu/:id', verifyToken, verifyPermission, remove)

module.exports = menuRouter
