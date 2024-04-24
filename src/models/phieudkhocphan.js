const Sequelize = require('sequelize')

const sequelize = require('../config/database')
const { DKHocPhan } = require('./dkhocphan')

const PhieuDKHocPhan = sequelize.define('phieudkhocphan', {
  soPhieu: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  ngayLap: {
    type: Sequelize.TIME,
    allowNull: false
  },
  hocKi: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  namHoc: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

DKHocPhan.hasOne(PhieuDKHocPhan)
PhieuDKHocPhan.belongsTo(DKHocPhan, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

module.exports = {
  PhieuDKHocPhan
}