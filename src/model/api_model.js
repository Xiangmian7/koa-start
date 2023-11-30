const sequelize = require('../initialize/mysql')
const { DataTypes } = require('sequelize')

const Api = sequelize.define(
  'api',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '接口id',
    },
    apiName: {
      type: DataTypes.STRING,
      comment: '接口名称',
    },
    apiPath: {
      type: DataTypes.STRING,
      comment: '请求路径',
    },
    apiMethod: {
      type: DataTypes.STRING,
      comment: '请求方法',
    },
    category: {
      type: DataTypes.STRING,
      comment: '接口分类',
    },
  },
  {
    freezeTableName: true,
    tableName: 'xm_api',
  },
)

module.exports = Api
