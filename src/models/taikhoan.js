const Sequelize = require('sequelize')

const sequelize = require('../config/database')

const TaiKhoan = sequelize.define('taikhoan', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  taiKhoan: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  matKhau: {
    type:Sequelize.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = {
  TaiKhoan
}