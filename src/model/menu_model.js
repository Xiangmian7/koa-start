const sequelize = require('../initialize/mysql')
const { DataTypes } = require('sequelize')

const Menu = sequelize.define(
  'menu',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '菜单id',
    },
    menuName: {
      type: DataTypes.STRING,
      comment: '菜单名称',
    },
    routePath: {
      type: DataTypes.STRING,
      comment: '路由路径',
    },
    componentPath: {
      type: DataTypes.STRING,
      comment: '组件路径',
    },
    iconName: {
      type: DataTypes.STRING,
      comment: '图标名称',
    },
    keepAlive: {
      type: DataTypes.TINYINT,
      comment: '是否保活',
    },
    isHide: {
      type: DataTypes.TINYINT,
      comment: '是否隐藏',
    },
    pid: {
      type: DataTypes.INTEGER,
      comment: '父id',
    },
  },
  {
    freezeTableName: true,
    tableName: 'xm_menu',
  },
)

module.exports = Menu
