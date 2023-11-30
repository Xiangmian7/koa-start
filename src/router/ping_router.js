const Router = require('koa-router')
const verifyToken = require('../middleware/verify_token')

const pingRouter = new Router()
const { success } = require('../common/response')
const verifyPermission = require('../middleware/verify_permission')

pingRouter.get('/', async (ctx, next) => {
  success(ctx, {})
})
pingRouter.get('/ping', async (ctx, next) => {
  success(ctx, { info: 'The server is running properly' })
})

pingRouter.get(
  '/test/:id/:name/:age/:gender',
  verifyToken,
  verifyPermission,
  async (ctx, next) => {
    success(ctx, {})
  },
)

module.exports = pingRouter
