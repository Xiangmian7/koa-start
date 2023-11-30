const UserAlreadyExists = new Error('用户已存在')
const UserDoesNotExists = new Error('用户不存在')
const PasswordError = new Error('密码错误')
const UnAuthorized = new Error('未授权')
const CaptchaError = new Error('验证码错误')
const NoPermission = new Error('无权限')
const RepeatRoleNameOrRoleVal = new Error('角色名或角色值重复')
const RoleHasOwningUser = new Error('该角色用用户归属')

module.exports = {
  UserAlreadyExists,
  UserDoesNotExists,
  PasswordError,
  UnAuthorized,
  CaptchaError,
  NoPermission,
  RepeatRoleNameOrRoleVal,
  RoleHasOwningUser,
}
