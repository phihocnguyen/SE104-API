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
    hocKi: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    namHoc: {
        type: Sequelize.STRING,
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