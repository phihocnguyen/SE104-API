const Sequelize = require('sequelize')
const { MonHoc } = require('./monhoc')
const sequelize = require('../config/database')

const HocKi = sequelize.define('hocki', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  nganhHoc: {
    type: Sequelize.STRING,
    allowNull: false
  },
  khoa: {
    type: Sequelize.STRING,
    allowNull: false
  },
  hocKi: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

MonHoc.hasMany(HocKi, {
  foreignKey: 'maMonHoc',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

module.exports = {
  HocKi
}