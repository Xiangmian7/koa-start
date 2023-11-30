const Router = require('koa-router')
const { login, captcha } = require('../controller/auth_controller')

const authRouter = new Router({ prefix: '/v1' })

//用户登录
authRouter.post('/auth/login', login)
//获取验证码
authRouter.get('/auth/captcha', captcha)

module.exports = authRouter
