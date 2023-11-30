const apiService = require('../service/api_service')
const { success } = require('../common/response')
const Joi = require('joi')
class ApiController {
  //创建接口
  async create(ctx, next) {
    const req = await Joi.object({
      apiName: Joi.string().required(),
      apiPath: Joi.string().required(),
      apiMethod: Joi.string().required(),
      category: Joi.string().required(),
    }).validateAsync(ctx.request.body)
    const res = await apiService.create(req)
    success(ctx, { info: res })
  }
  //接口列表
  async list(ctx, next) {
    const req = await Joi.object({
      limit: Joi.number().required(),
      offset: Joi.number().required(),
    }).validateAsync(ctx.request.query)
    const res = await apiService.list(req)
    success(ctx, { list: res })
  }
  //接口详情
  async detail(ctx, next) {
    const req = await Joi.object({
      id: Joi.number().required(),
    }).validateAsync(ctx.request.params)
    const res = await apiService.detail(req)
    success(ctx, { detail: res })
  }
  //接口删除
  async remove(ctx, next) {
    const req = await Joi.object({
      id: Joi.number().required(),
    }).validateAsync(ctx.request.params)
    const res = await apiService.remove(req)
    success(ctx, { affectedRows: res })
  }
  //接口更新
  async update(ctx, next) {
    const req = await Joi.object({
      id: Joi.number().required(),
      apiName: Joi.string().required(),
      apiPath: Joi.string().required(),
      apiMethod: Joi.string().required(),
      category: Joi.string().required(),
    }).validateAsync({ ...ctx.request.body, ...ctx.request.params })
    const res = await apiService.update(req)
    success(ctx, { affectedRows: res })
  }
}

module.exports = new ApiController()
