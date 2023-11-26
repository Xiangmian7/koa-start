const UserAlreadyExists = new Error('用户已存在')
const UserDoesNotExists = new Error('用户不存在')
const InternalServerError = new Error('服务器错误')
const PasswordError = new Error('密码错误')
const UnAuthorized = new Error('未授权')
const CaptchaError = new Error('验证码错误')

module.exports = {
  UserAlreadyExists,
  UserDoesNotExists,
  InternalServerError,
  PasswordError,
  UnAuthorized,
  CaptchaError,
}
