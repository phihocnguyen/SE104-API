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
    },
    hocKi: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    namHoc: {
        type: Sequelize.STRING,
        allowNull: false
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false
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

const createEnrollment = async (data) => {

    const { maMonHoc, mssv, hocKi, namHoc, state } = data
    try {
        const existEnrollment = await DKHocPhan.findOne({ where: { maMonHoc } })
        if (existEnrollment) {
            return false
        }
        const newEnrollment = await DKHocPhan.create({
            maMonHoc,
            hocKi,
            namHoc,
            mssv,
            state
        })
        const subject = await MonHoc.findOne({ where: { maMonHoc } })
        newEnrollment.dataValues['tenMonHoc'] = subject.tenMonHoc
        newEnrollment.dataValues['loaiMon'] = subject.loaiMon

        let tinChi = 0
        if (subject.loaiMon === 'Lý thuyết') tinChi = Math.floor(Number.parseInt(subject.soTiet) / 15)
        else tinChi = Math.floor(Number.parseInt(subject.soTiet) / 30)

        newEnrollment.dataValues['tinChi'] = tinChi
        if (newEnrollment) return newEnrollment
    } catch (err) {
        throw new Error(err)
    }
}

const getEnrollmentsByMssv= async (mssv) => {
    try {
        const enrollments = await DKHocPhan.findAll(
            {
                where: { mssv }
            }
        )
        const result = []
        for (let i = 0; i < enrollments.length; i++) {
            const subject = await MonHoc.findOne({ where: { maMonHoc: enrollments[i].maMonHoc } })

            enrollments[i].dataValues['tenMonHoc'] = subject.tenMonHoc
            let credits = 0
            if (subject.loaiMon === 'Lý thuyết') credits = Number.parseInt(subject.soTiet) / 15
            else credits = Number.parseInt(subject.soTiet) / 30

            enrollments[i].dataValues['tinChi'] = Math.floor(credits)
            result.push({
                id: enrollments[i].dataValues.id,
                tenMonHoc: enrollments[i].dataValues.tenMonHoc,
                tinChi: enrollments[i].dataValues.tinChi
            })
        }
        if (result) return result
    } catch (err) {
        throw new Error(err)
    }
}

const getEnrollmentsBySemester = async (hocKi, namHoc) => {

    switch (hocKi) {
    case 'Học kỳ 1':
        hocKi = 1
        break
    case 'Học kỳ 2':
        hocKi = 2
        break
    default:
        hocKi = 3
        break
    }

    try {
        const enrollments = await DKHocPhan.findAll({
            where: { hocKi, namHoc },
            attributes: ['mssv'],
            group: ['mssv']
        })
        const result = []
        for (let i = 0; i < enrollments.length; i++) {
            const student = await SinhVien.findOne({ where: { mssv: enrollments[i].mssv } })

            enrollments[i].dataValues['hoTen'] = student.hoTen
            result.push(enrollments[i])
        }
        if (result) return result
    } catch (err) {
        throw new Error(err)
    }
}

const getAllEnrollments = async () => {
    try {
        const allEnrollments = await DKHocPhan.findAll({})
        for (let i = 0; i < allEnrollments.length; i++) {
            const subject = await MonHoc.findOne({ where: { maMonHoc: allEnrollments[i].dataValues.maMonHoc } })
            allEnrollments[i].dataValues['tenMonHoc'] = subject.tenMonHoc
            allEnrollments[i].dataValues['loaiMon'] = subject.loaiMon
            let tinChi = 0
            if (subject.loaiMon === 'Lý thuyết') tinChi = Math.floor(Number.parseInt(subject.soTiet) / 15)
            else tinChi = Math.floor(Number.parseInt(subject.soTiet) / 30)
            allEnrollments[i].dataValues['tinChi'] = tinChi
        }
        if (allEnrollments) return allEnrollments
    } catch (err) {
        throw new Error(err)
    }
}

const deleteEnrollment = async ({ maMonHoc } ) => {
    try {
        const result = await DKHocPhan.findOne({ where: { maMonHoc } })
        await DKHocPhan.destroy({ where: { maMonHoc } })
        if (result) return result
    } catch (err) {
        throw new Error(err)
    }
}

module.exports = {
    DKHocPhan,
    createEnrollment,
    getEnrollmentsByMssv,
    getEnrollmentsBySemester,
    getAllEnrollments,
    deleteEnrollment
}
