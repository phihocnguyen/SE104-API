const Sequelize = require('sequelize')

const sequelize = require('../config/database')
const { DKHocPhan, getEnrollmentsByMssv } = require('./dkhocphan')
const { SinhVien } = require('./sinhvien')
const { MonHoc } = require('./monhoc')

const PhieuDKHocPhan = sequelize.define('phieudkhocphan', {
    id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey: true
    },
    soPhieu: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ngayLap: {
        type: Sequelize.STRING,
        allowNull: false
    },
    hocKi: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    namHoc: {
        type: Sequelize.STRING,
        allowNull: false
    },
    trangThai: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

DKHocPhan.hasOne(PhieuDKHocPhan)
PhieuDKHocPhan.belongsTo(DKHocPhan, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

PhieuDKHocPhan.belongsTo(SinhVien, {
    foreignKey: 'mssv',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

const createForm = async (data) => {
    let { masosinhvien, ngaylap, hocky, namhoc } = data

    switch (hocky) {
    case 'Học kỳ 1':
        hocky = 1
        break
    case 'Học kỳ 2':
        hocky = 2
        break
    default:
        hocky = 3
    }

    let soPhieu = Math.random() * (99999 - 10000 + 1) + 10000
    try {
        const allEnrollments = await getEnrollmentsByMssv(masosinhvien)
        const result = []
        for (let i = 0; i < allEnrollments.length; i++) {
            const newForm = await PhieuDKHocPhan.create({
                soPhieu,
                ngayLap: ngaylap,
                hocKi: hocky,
                namHoc: namhoc,
                dkhocphanId: allEnrollments[i].id,
                mssv: masosinhvien,
                trangThai: 'Chưa lập phiếu'
            })
            result.push(newForm)
        }
        if (result) return result
    } catch (err) {
        throw new Error(err)
    }
}

const getFormBySerial = async (serial) => {
    try {
        const list = await PhieuDKHocPhan.findAll({
            where: {
                soPhieu: serial
            }
        })

        for (let i = 0; i < list.length; i++) {
            const enrollment = await DKHocPhan.findOne({
                where: {
                    id: list[i].dkhocphanId
                }
            })
            const subject = await MonHoc.findOne({
                where: {
                    maMonHoc: enrollment.maMonHoc
                }
            })

            list[i].dataValues['maMonHoc'] = subject.maMonHoc
            list[i].dataValues['loaiMon'] = subject.loaiMon

            let tinChi = 0
            if (subject.loaiMon === 'Lý thuyết') tinChi = Math.floor(Number.parseInt(subject.soTiet) / 15)
            else tinChi = Math.floor(Number.parseInt(subject.soTiet) / 30)

            list[i].dataValues['tinChi'] = tinChi
        }

        if (list) return list
    } catch (err) {
        throw new Error(err)
    }
}

const getAllFormsBySemester = async (data) => {
    let { hocKi, namHoc } = data
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
        const allForms = await PhieuDKHocPhan.findAll({
            where: { hocKi, namHoc },
            attributes: ['soPhieu', 'mssv', 'ngayLap', 'trangThai'],
            group: ['soPhieu', 'mssv', 'ngayLap', 'trangThai']
        })
        if (allForms) return allForms
    } catch (err) {
        throw new Error(err)
    }
}

module.exports = {
    PhieuDKHocPhan,
    createForm,
    getFormBySerial,
    getAllFormsBySemester
}