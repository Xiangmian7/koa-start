const Role = require('../model/role_model')
const errorTypes = require('../common/error_types')
const { Op } = require('sequelize')
const User = require('../model/user_model')
const sequelize = require('../initialize/mysql')

class RoleService {
  async create(req) {
    //判断用户是否已存在
    const res = await Role.findAll({
      where: {
        [Op.or]: [{ roleName: req.roleName }, { roleVal: req.roleVal }],
      },
    })
    console.log(res)
    if (res.length) {
      //角色名或角色值重复
      throw errorTypes.RepeatRoleNameOrRoleVal
    }
    //不重复，创建角色
    return await Role.create({
      roleName: req.roleName,
      roleVal: req.roleVal,
    })
  }

  async list(req) {
    return await Role.findAndCountAll({
      limit: req.limit,
      offset: req.offset,
      order: [['id', 'DESC']],
    })
  }

  async detail(req) {
    return await Role.findOne({
      where: { id: req.id },
    })
  }

  async remove(req) {
    //判断是否有用户属于这个角色
    const user = await User.findOne({ where: { roleId: req.id } })
    if (user) {
      //有用户属于这个角色，抛出错误，不删除
      throw errorTypes.RoleHasOwningUser
    }
    //无归属用户，删除该角色
    return await Role.destroy({ where: { id: req.id } })
  }

  async update(req) {
    //更新角色信息
    return await Role.update(
      { roleName: req.roleName, roleVal: req.roleVal },
      { where: { id: req.id } },
    )
  }
  async updateMenus(req) {
    //开启事务

    //先查该角色已有的权限
    const hasMenus = await RoleMenu.findAll({ where: { role_id: req.RoleId } })
    //通过对比，得到用户失去的权限，以及用户得到的权限

    //把失去的权限批量阐述，得到的权限批量插入
  }
}

module.exports = new RoleService()
