const sequelize = require('../initialize/mysql')
const { DataTypes } = require('sequelize')

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '用户id',
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: '用户名',
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '昵称',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '密码',
    },
    gender: {
      type: DataTypes.TINYINT,
      comment: '性别',
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '所属角色id',
    },
  },
  {
    freezeTableName: true,
    tableName: 'xm_user',
  },
)

module.exports = User
