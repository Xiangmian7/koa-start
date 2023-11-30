const sequelize = require('../initialize/mysql')
const { DataTypes } = require('sequelize')
const Api = require('./api_model')
const Menu = require('./menu_model')

const Role = sequelize.define(
  'role',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '角色id',
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: '角色名',
    },
    roleVal: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '角色值',
    },
  },
  {
    freezeTableName: true,
    tableName: 'xm_role',
  },
)

const RoleApi = sequelize.define(
  'role_api',
  {},
  { timestamps: false, freezeTableName: true, tableName: 'xm_role_api' },
)
const RoleMenu = sequelize.define(
  'role_menu',
  {},
  { timestamps: false, freezeTableName: true, tableName: 'xm_role_menu' },
)

Api.belongsToMany(Role, { through: RoleApi, constraints: false })
Role.belongsToMany(Api, { through: RoleApi, constraints: false })
Menu.belongsToMany(Role, { through: RoleMenu, constraints: false })
Role.belongsToMany(Menu, { through: RoleMenu, constraints: false })

module.exports = Role
