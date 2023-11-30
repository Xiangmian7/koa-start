const errorTypes = require('../common/error_types')
const { Op } = require('sequelize')
const Menu = require('../model/menu_model')
const sequelize = require('../initialize/mysql')

class MenuService {
  async create(req) {
    const res = await Menu.create({
      menuName: req.menuName,
      routePath: req.routePath,
      componentPath: req.componentPath,
      iconName: req.iconName,
      keepAlive: req.keepAlive,
      isHide: req.isHide,
      pid: req.pid,
    })
    return res.dataValues
  }

  async list(req) {
    return await Menu.findAndCountAll({
      limit: req.limit,
      offset: req.offset,
      order: [['id', 'DESC']],
    })
  }

  async detail(req) {
    return await Menu.findOne({
      where: { id: req.id },
    })
  }
  async remove(req) {
    return await Menu.destroy({ where: { id: req.id } })
  }
  async update(req) {
    //更新角色信息
    return await Menu.update(
      {
        menuName: req.menuName,
        routePath: req.routePath,
        componentPath: req.componentPath,
        iconName: req.iconName,
        keepAlive: req.keepAlive,
        isHide: req.isHide,
        pid: req.pid,
      },
      { where: { id: req.id } },
    )
  }
}

module.exports = new MenuService()
