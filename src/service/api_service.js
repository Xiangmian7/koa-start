const errorTypes = require('../common/error_types')
const Api = require('../model/api_model')

class ApiService {
  async create(req) {
    const res = await Api.create({
      apiName: req.apiName,
      apiPath: req.apiPath,
      apiMethod: req.apiMethod,
      category: req.category,
    })
    return res.dataValues
  }

  async list(req) {
    return await Api.findAndCountAll({
      limit: req.limit,
      offset: req.offset,
      order: [['id', 'DESC']],
    })
  }

  async detail(req) {
    return await Api.findOne({
      where: { id: req.id },
    })
  }
  async remove(req) {
    return await Api.destroy({ where: { id: req.id } })
  }
  async update(req) {
    //更新角色信息
    const res = await Api.update(
      {
        apiName: req.apiName,
        apiPath: req.apiPath,
        apiMethod: req.apiMethod,
        category: req.category,
      },
      { where: { id: req.id } },
    )
    return res[0]
  }
}

module.exports = new ApiService()
