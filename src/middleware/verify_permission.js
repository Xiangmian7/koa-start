const Api = require('../model/api_model')
const Role = require('../model/role_model')
const sequelize = require('../initialize/mysql')
const { Op } = require('sequelize')
// 权限验证中间件
const verifyPermission = async (ctx, next) => {
  const { url, method, path } = ctx.request

  //redis中没有该角色的api缓存，查询数据库
  const info = await Role.findOne({
    where: { id: ctx.state.user.roleId },
    include: {
      model: Api,
      through: {
        attributes: [],
      },
    },
  })
  const role = JSON.parse(JSON.stringify(info))
  const hasApis = role.apis
  console.log(hasApis)
  //判断是不是动态路由
  if (Object.keys(ctx.request.params).length === 0) {
    console.log('普通路由')
    const result = hasApis.some(item => {
      return item.apiMethod === method && item.apiPath === path
    })
    if (result) {
      console.log('普通路由,success')
    } else {
      console.log('普通路由,error')
    }
    console.log(url, path)
  } else {
    console.log('动态路由')
    console.log(path)
    // const keys = Object.keys(ctx.request.params)
    // const values = Object.values(ctx.request.params)
    // console.log(keys, values)
    const e = Object.fromEntries(Object.entries(ctx.request.params))
    //是动态路由
    //拿到该角色所属角色拥有的所有该请求方法的接口权限列表

    //开始循环比对是否匹配该请求

    //select * from api where apiPath like %':id:name:age:gender'%

    // const res = keys.reduce((prev, currentValue, currentIndex) => {
    //   return prev.replace(values[currentIndex], ':' + currentValue)
    // }, path)
    // console.log('res', res)
    const result = hasApis.some(item => {
      if (item.apiMethod === method) {
        return (
          item.apiPath.replace(/:([a-zA-Z0-9_]+)/g, (match, p1) => {
            return e[p1] || match
          }) === path
        )
      }
    })

    // console.log('res', res)
    if (!result) {
      console.log('权限验证失败')
    } else {
      console.log('权限验证通过')
    }

    //   /test/1/kerwin/30/nan ===
  }
  await next()
}

module.exports = verifyPermission
