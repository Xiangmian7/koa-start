const errorTypes = require('./error_types')
const success = (ctx, msg, data) => {
  ctx.statusCode = 200
  ctx.body = {
    msg,
    data,
  }
}

const fail = (ctx, err) => {
  let code
  let msg
  if (!err.details?.length) {
    switch (err) {
      case errorTypes.UserAlreadyExists:
        code = 400
        msg = errorTypes.UserAlreadyExists.message
        break
      case errorTypes.UserDoesNotExists:
        code = 400
        msg = errorTypes.UserDoesNotExists.message
        break
      case errorTypes.PasswordError:
        code = 400
        msg = errorTypes.PasswordError.message
        break
      case errorTypes.UnAuthorized:
        code = 401
        msg = errorTypes.UnAuthorized.message
        break
      case errorTypes.CaptchaError:
        code = 400
        msg = errorTypes.CaptchaError.message
        break
      default:
        code = 500
        msg = errorTypes.InternalServerError.message
        break
    }
  } else {
    code = 400
    msg = err.details[0].message
  }
  ctx.status = code
  ctx.body = {
    msg,
  }
}

module.exports = { success, fail }
