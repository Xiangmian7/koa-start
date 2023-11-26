const sequelize = require('../initialize/mysql')
const { DataTypes } = require('sequelize')

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '用户id',
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      comment: '用户名',
    },
    nickname: {
      type: DataTypes.STRING,
      comment: '昵称',
    },
    password: {
      type: DataTypes.STRING,
      comment: '密码',
    },
    gender: {
      type: DataTypes.BOOLEAN,
      comment: '性别',
    },
  },
  {
    freezeTableName: true,
  },
)

module.exports = User
