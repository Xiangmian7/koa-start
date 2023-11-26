const svgCaptcha = require('svg-captcha')
const { randomUUID } = require('crypto')
// 生成验证码
const makeCaptcha = async () => {
  const key = randomUUID()
  const captcha = svgCaptcha.create({
    size: 4, // 字符数
    noise: 2, // 干扰线条数
    ignoreChars: '0o1i',
    color: true,
    width: 120,
    height: 50,
  })
  return { key, ...captcha }
}

module.exports = makeCaptcha
