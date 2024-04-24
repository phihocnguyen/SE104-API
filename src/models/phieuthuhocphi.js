const Sequelize = require('sequelize')

const sequelize = require('../config/database')
const { SinhVien } = require('./sinhvien')
const { PhieuDKHocPhan } = require('./phieudkhocphan')

const PhieuThuHocPhi = sequelize.define('phieuthuhocphi', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  ngayLap: {
    type: Sequelize.TIME,
    allowNull: false
  },
  soTienThu: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  soTienPhaiDong: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  soTienConLai: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

SinhVien.hasMany(PhieuThuHocPhi, {
  foreignKey: 'mssv',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
PhieuDKHocPhan.hasMany(PhieuThuHocPhi, {
  foreignKey: 'soPhieu',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

module.exports = {
  PhieuThuHocPhi
}