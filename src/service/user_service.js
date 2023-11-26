const User = require('../model/user_model')
const errorTypes = require('../common/error_types')
const { makeToken } = require('../util/jwt')
const { encryptPass, comparePass } = require('../util/crypto')
const makeCaptcha = require('../util/captcha')
const redis = require('../initialize/redis')

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
    return await User.findAll({
      limit: req.limit,
      offset: req.offset,
      order: [['id', 'DESC']],
    })
  }

  async detail(req) {
    return await User.findOne({ where: { id: req.id } })
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
  async login(req) {
    //判断验证码是否正确
    const val = await redis.get(req.captchaKey)
    if (req.captchaVal.toLowerCase() !== val?.toLowerCase()) {
      //验证码错误
      throw errorTypes.CaptchaError
    }
    //判断用户是否存在
    const res = await User.findAll({ where: { username: req.username } })
    if (!res.length) {
      //用户不存在
      throw errorTypes.UserDoesNotExists
    }
    //比对密码
    if (!comparePass(req.password, res[0].password)) {
      throw errorTypes.PasswordError
    }
    //发放token
    const token = makeToken(res[0].id, res[0].username)
    await redis.set(`${req.username}-token`, token)
    redis.expire(`${req.username}-token`, 3600 * 12)
    return token
  }
  async captcha() {
    const res = await makeCaptcha()
    //保存 key:key,value:text 到redis，生效时间为3min
    await redis.set(res.key, res.text)
    await redis.expire(res.key, 180)
    //返回key,data
    return res
  }
}

module.exports = new UserService()
