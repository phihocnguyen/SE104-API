const Sequelize = require('sequelize')

const sequelize = require('../config/database')
const { SinhVien } = require('./sinhvien')
const { MonHoc } = require('./monhoc')

const DKHocPhan = sequelize.define('dkhocphan', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
})

SinhVien.hasMany(DKHocPhan, {
    foreignKey: 'mssv',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
MonHoc.hasMany(DKHocPhan, {
    foreignKey: 'maMonHoc',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

module.exports = {
    DKHocPhan
}