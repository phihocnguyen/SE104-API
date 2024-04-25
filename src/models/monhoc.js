const Sequelize = require('sequelize')

const sequelize = require('../config/database')

const MonHoc = sequelize.define('monhoc', {
    maMonHoc: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    tenMonHoc: {
        type: Sequelize.STRING,
        allowNull: false
    },
    loaiMon: {
        type: Sequelize.STRING,
        allowNull: false
    },
    soTiet: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = {
    MonHoc
}