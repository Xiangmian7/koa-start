const redis = require('../initialize/redis')
const errorTypes = require('../common/error_types')
const User = require('../model/user_model')
const { comparePass } = require('../util/crypto')
const { makeToken } = require('../util/jwt')
const makeCaptcha = require('../util/captcha')

class AuthService {
  async login(req) {
    //判断验证码是否正确
    const val = await redis.get(req.captchaKey)
    if (req.captchaVal.toLowerCase() !== val?.toLowerCase()) {
      await redis.expire(req.captchaKey, -2)
      //验证码错误
      throw errorTypes.CaptchaError
    }
    //清除redis中的验证码
    await redis.expire(req.captchaKey, -2)
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
    return makeToken(res[0].id, res[0].roleId, res[0].username)
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

module.exports = new AuthService()
