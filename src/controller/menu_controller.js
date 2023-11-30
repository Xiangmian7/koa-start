const menuService = require('../service/menu_service')
const { success } = require('../common/response')
const Joi = require('joi')
class MenuController {
  //创建角色
  async create(ctx, next) {
    const req = await Joi.object({
      menuName: Joi.string().required(),
      routePath: Joi.string().allow(''),
      componentPath: Joi.string().allow(''),
      iconName: Joi.string().required(),
      keepAlive: Joi.number().required(),
      isHide: Joi.number().required(),
      pid: Joi.number().required(),
    }).validateAsync(ctx.request.body)
    const res = await menuService.create(req)
    success(ctx, { info: res })
  }
  //角色列表
  async list(ctx, next) {
    const req = await Joi.object({
      limit: Joi.number().required(),
      offset: Joi.number().required(),
    }).validateAsync(ctx.request.query)
    const res = await menuService.list(req)
    success(ctx, { list: res })
  }
  //角色详情
  async detail(ctx, next) {
    const req = await Joi.object({
      id: Joi.number().required(),
    }).validateAsync(ctx.request.params)
    const res = await menuService.detail(req)
    success(ctx, { detail: res })
  }
  //角色删除
  async remove(ctx, next) {
    const req = await Joi.object({
      id: Joi.number().required(),
    }).validateAsync(ctx.request.params)
    const res = await menuService.remove(req)
    success(ctx, { affectedRows: res })
  }
  //角色更新
  async update(ctx, next) {
    const req = await Joi.object({
      id: Joi.number().required(),
      menuName: Joi.string().required(),
      routePath: Joi.string().allow(''),
      componentPath: Joi.string().allow(''),
      iconName: Joi.string().required(),
      keepAlive: Joi.number().required(),
      isHide: Joi.number().required(),
      pid: Joi.number().required(),
    }).validateAsync({ ...ctx.request.body, ...ctx.request.params })
    const res = await menuService.update(req)
    success(ctx, { affectedRows: res[0] })
  }
}

module.exports = new MenuController()
