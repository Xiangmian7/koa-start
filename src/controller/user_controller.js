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
    delete res.dataValues.password
    success(ctx, { info: res.dataValues })
  }
  //用户列表
  async list(ctx, next) {
    const req = await Joi.object({
      limit: Joi.number().required(),
      offset: Joi.number().required(),
    }).validateAsync(ctx.request.query)
    const res = await userService.list(req)
    success(ctx, { list: res })
  }
  //用户详情
  async detail(ctx, next) {
    const req = await Joi.object({
      id: Joi.number().required(),
    }).validateAsync(ctx.request.params)
    const res = await userService.detail(req)
    success(ctx, { detail: res })
  }
  //用户删除
  async remove(ctx, next) {
    const req = await Joi.object({
      id: Joi.number().required(),
    }).validateAsync(ctx.request.params)
    const res = await userService.remove(req)
    success(ctx, { affectedRows: res })
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
    success(ctx, { affectedRows: res[0] })
  }
  //修改密码
  async updatePass(ctx, next) {
    const req = await Joi.object({
      id: Joi.number().required(),
      password: Joi.string().required(),
    }).validateAsync({ ...ctx.request.params, ...ctx.request.body })
    const res = await userService.updatePass(req)
    success(ctx, { affectedRows: res[0] })
  }
}

module.exports = new UserController()
