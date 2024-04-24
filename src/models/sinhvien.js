const Sequelize = require('sequelize')
const { TaiKhoan } = require('./taikhoan')
const sequelize = require('../config/database')

const SinhVien = sequelize.define('sinhvien', {
  mssv: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  hoTen: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ngaySinh: {
    type: Sequelize.TIME,
    allowNull: false
  },
  gioiTinh: {
    type: Sequelize.STRING,
    allowNull: false
  },
  queQuan: {
    type: Sequelize.STRING,
    allowNull: false
  },
  doiTuong: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nganhHoc: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

TaiKhoan.hasOne(SinhVien, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
SinhVien.belongsTo(TaiKhoan)

module.exports = {
  SinhVien
}