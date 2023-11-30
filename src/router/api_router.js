const Router = require('koa-router')
const {
  create,
  list,
  detail,
  update,
  remove,
} = require('../controller/api_controller')
const verifyToken = require('../middleware/verify_token')
const verifyPermission = require('../middleware/verify_permission')

const apiRouter = new Router({ prefix: '/v1' })

//用户列表
apiRouter.get('/api', verifyToken, verifyPermission, list)
//创建用户
apiRouter.post('/api', verifyToken, verifyPermission, create)
//用户详情
apiRouter.get('/api/:id', verifyToken, verifyPermission, detail)
//更新用户
apiRouter.put('/api/:id', verifyToken, verifyPermission, update)
//删除用户
apiRouter.delete('/api/:id', verifyToken, verifyPermission, remove)

module.exports = apiRouter
