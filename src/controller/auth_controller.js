const Joi = require('joi')
const authService = require('../service/auth_service')
const { success } = require('../common/response')

class AuthController {
  //用户登录
  async login(ctx, next) {
    const req = await Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
      captchaKey: Joi.string().required(),
      captchaVal: Joi.string().required(),
    }).validateAsync({
      ...ctx.request.body,
      captchaKey: ctx.cookies.get('captcha'),
    })
    const res = await authService.login(req)
    success(ctx, { token: res })
  }
  //获取验证码
  async captcha(ctx, next) {
    const res = await authService.captcha()
    ctx.cookies.set('captcha', res.key)
    ctx.type = 'svg'
    ctx.body = res.data
  }
}

module.exports = new AuthController()
