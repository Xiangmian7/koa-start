const roleService = require('../service/role_service')
const { success } = require('../common/response')
const Joi = require('joi')
class RoleController {
  //创建角色
  async create(ctx, next) {
    const req = await Joi.object({
      roleName: Joi.string().required(),
      roleVal: Joi.string().required(),
    }).validateAsync(ctx.request.body)
    const res = await roleService.create(req)
    success(ctx, { info: res.dataValues })
  }
  //角色列表
  async list(ctx, next) {
    const req = await Joi.object({
      limit: Joi.number().required(),
      offset: Joi.number().required(),
    }).validateAsync(ctx.request.query)
    const res = await roleService.list(req)
    success(ctx, { list: res })
  }
  //角色详情
  async detail(ctx, next) {
    const req = await Joi.object({
      id: Joi.number().required(),
    }).validateAsync(ctx.request.params)
    const res = await roleService.detail(req)
    success(ctx, { detail: res })
  }
  //角色删除
  async remove(ctx, next) {
    const req = await Joi.object({
      id: Joi.number().required(),
    }).validateAsync(ctx.request.params)
    const res = await roleService.remove(req)
    success(ctx, { affectedRows: res })
  }
  //角色更新
  async update(ctx, next) {
    const req = await Joi.object({
      id: Joi.number().required(),
      roleName: Joi.string().required(),
      roleVal: Joi.string().required(),
    }).validateAsync({ ...ctx.request.body, ...ctx.request.params })
    const res = await roleService.update(req)
    success(ctx, { affectedRows: res[0] })
  }
  //为角色分配菜单（目录，页面，按钮）权限
  async updateMenus(ctx, next) {
    const req = await Joi.object({
      menus: Joi.array().required(),
    }).validateAsync(ctx.request.body)
    const res = await roleService.updateMenus(req)
    success(ctx, {})
  }
}

module.exports = new RoleController()
