const userService = require('../service/user_service')
const { success } = require('../common/response')
const Joi = require('joi')
class UserController {
  //创建用户
  async create(ctx, next) {
    const req = await Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
      nickname: Joi.string().required(),
      gender: Joi.number().required(),
    }).validateAsync(ctx.request.body)
    const res = await userService.create(req)
    success(ctx, 'success', { info: res })
  }
  //用户列表
  async list(ctx, next) {
    const req = await Joi.object({
      limit: Joi.number().required(),
      offset: Joi.number().required(),
    }).validateAsync(ctx.request.query)
    const res = await userService.list(req)
    success(ctx, 'success', { list: res })
  }
  //用户详情
  async detail(ctx, next) {
    const req = await Joi.object({
      id: Joi.number().required(),
    }).validateAsync(ctx.request.params)
    const res = await userService.detail(req)
    success(ctx, 'success', { detail: res })
  }
  //用户删除
  async remove(ctx, next) {
    const req = await Joi.object({
      id: Joi.number().required(),
    }).validateAsync(ctx.request.params)
    const res = await userService.remove(req)
    success(ctx, 'success', { affectedRows: res })
  }
  //用户更新
  async update(ctx, next) {
    const req = await Joi.object({
      id: Joi.number().required(),
      username: Joi.string().required(),
      nickname: Joi.string().required(),
      gender: Joi.number().required(),
    }).validateAsync({ ...ctx.request.body, ...ctx.request.params })
    const res = await userService.update(req)
    success(ctx, 'success', { affectedRows: res[0] })
  }
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
    const res = await userService.login(req)
    success(ctx, 'success', { token: res })
  }
  //获取验证码
  async captcha(ctx, next) {
    const res = await userService.captcha()
    ctx.cookies.set('captcha', res.key)
    ctx.type = 'svg'
    ctx.body = res.data
  }
}

module.exports = new UserController()
