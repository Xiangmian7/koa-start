const errorTypes = require('./error_types')
const success = (ctx, data) => {
  const res = {
    code: 200,
    status: 'success',
    data,
  }
  ctx.body = res
  ctx.state.status = 'success'
  ctx.state.res = res
}

const fail = (ctx, err) => {
  console.log(err.message)
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
        msg = err.message
        break
    }
  } else {
    code = 400
    msg = err.details[0].message
  }
  const res = {
    code,
    msg,
    status: 'error',
    data: null,
  }
  ctx.body = res
  ctx.state.status = 'error'
  ctx.state.res = res
}

module.exports = { success, fail }
