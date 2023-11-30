const User = require('../model/user_model')
const errorTypes = require('../common/error_types')
const { encryptPass } = require('../util/crypto')

class UserService {
  async create(req) {
    //判断用户是否已存在
    const res = await User.findAll({ where: { username: req.username } })
    if (res.length) {
      //用户已存在
      throw errorTypes.UserAlreadyExists
    }
    //不存在，创建用户
    return await User.create({
      username: req.username,
      password: encryptPass(req.password),
      gender: req.gender,
      nickname: req.nickname,
    })
  }

  async list(req) {
    return await User.findAndCountAll({
      limit: req.limit,
      offset: req.offset,
      order: [['id', 'DESC']],
      attributes: [
        'id',
        'username',
        'nickname',
        'gender',
        'createdAt',
        'updatedAt',
      ],
    })
  }

  async detail(req) {
    return await User.findOne({
      where: { id: req.id },
      attributes: [
        'id',
        'username',
        'nickname',
        'gender',
        'createdAt',
        'updatedAt',
      ],
    })
  }

  async remove(req) {
    return await User.destroy({ where: { id: req.id } })
  }

  async update(req) {
    return await User.update(
      { username: req.username, nickname: req.nickname, gender: req.gender },
      { where: { id: req.id } },
    )
  }
  async updatePass(req) {
    return await User.update(
      { password: encryptPass(req.password) },
      { where: { id: req.id } },
    )
  }
}

module.exports = new UserService()
