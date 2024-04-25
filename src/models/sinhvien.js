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
        type: Sequelize.STRING,
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
    foreignKey: 'IDtaiKhoan',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
SinhVien.belongsTo(TaiKhoan, {
    foreignKey: 'IDtaiKhoan'
})

module.exports = {
    SinhVien
}