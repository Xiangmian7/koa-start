const sequelize = require('../initialize/mysql')
const { DataTypes } = require('sequelize')

const OperateLog = sequelize.define(
  'OperateLog',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '操作日志id',
    },
    ip: {
      type: DataTypes.STRING,
      comment: 'ip地址',
    },
    requestTime: {
      type: DataTypes.DATE,
      comment: '请求时间',
    },
    time: {
      type: DataTypes.INTEGER,
      comment: '耗时',
    },
    req: {
      type: DataTypes.TEXT,
      comment: '请求参数',
    },
    res: {
      type: DataTypes.TEXT,
      comment: '响应参数',
    },
  },
  {
    freezeTableName: true,
    updatedAt: false,
    tableName: 'xm_operate_log',
  },
)

module.exports = OperateLog
