const Sequelize = require('sequelize')

const sequelize = require('../config/database')
const { SinhVien } = require('./sinhvien')
const { getFormBySerial, PhieuDKHocPhan } = require('./phieudkhocphan')

const PhieuThuHocPhi = sequelize.define('phieuthuhocphi', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
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
    soTinChiDangKy: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    soTinChiLyThuyet: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    soTinChiThucHanh: {
        type: Sequelize.INTEGER,
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
    },
    soPhieu: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

SinhVien.hasMany(PhieuThuHocPhi, {
    foreignKey: 'mssv',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

const createReceipt = async (data) => {
    const { sophieu, ngaylap, masosinhvien } = data
    let soTienThu = 0
    let soTienPhaiDong = 0
    let hocKi = 0
    let namHoc = ''
    let soTinChiDangKy = 0
    let soTinChiLyThuyet = 0
    let soTinChiThucHanh = 0
    try {
        const registrationList = await getFormBySerial(sophieu)
        for (let i = 0; i < registrationList.length; i++) {
            if (registrationList[i].dataValues.loaiMon === 'Lý thuyết') {
                soTinChiLyThuyet += registrationList[i].dataValues.tinChi
                soTienThu += registrationList[i].dataValues.tinChi * 27000
            }
            else {
                soTinChiThucHanh += registrationList[i].dataValues.tinChi
                soTienThu += registrationList[i].dataValues.tinChi * 37000
            }
            soTinChiDangKy += registrationList[i].dataValues.tinChi
            hocKi = registrationList[i].dataValues.hocKi
            namHoc = registrationList[i].dataValues.namHoc
        }
        const student = await SinhVien.findOne({
            where: {
                mssv: masosinhvien
            }
        })
        switch (student.dataValues.doiTuong) {
        case 1:
            soTienPhaiDong = Number.parseInt(soTienThu) * 0.7
            break
        case 2:
            soTienPhaiDong = Number.parseInt(soTienThu) * 0.5
            break
        case 3:
            soTienPhaiDong = Number.parseInt(soTienThu) * 0.2
            break
        default:
            break
        }
        const allEnrollmentsByNumber = await PhieuDKHocPhan.findAll( { where: { soPhieu: Number.parseInt(sophieu) } } )
        for (let i = 0; i < allEnrollmentsByNumber.length; i++) {
            await PhieuDKHocPhan.update({ trangThai: 'Đã lập phiếu' }, { where : { soPhieu: Number.parseInt(sophieu) } } )
        }
        const newReceipt = PhieuThuHocPhi.create({
            ngayLap: ngaylap,
            hocKi,
            namHoc,
            soTinChiDangKy,
            soTinChiLyThuyet,
            soTinChiThucHanh,
            soTienThu,
            soTienPhaiDong,
            soTienConLai: soTienPhaiDong,
            mssv: masosinhvien,
            soPhieu: Number.parseInt(sophieu)
        })
        if (newReceipt) return newReceipt
    } catch (err) {
        throw new Error(err)
    }
}

const getAllReceipts = async ({ hocKi, namHoc }) => {
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
        const list = await PhieuThuHocPhi.findAll({
            order: [
                ['mssv', 'DESC']
            ],
            where: {
                hocKi: hocKi,
                namHoc: namHoc
            }
        })
        if (list) return list
    } catch (err) {
        throw new Error(err)
    }
}

const getStudentsNotPaid = async ({ hocKi, namHoc }) => {

    switch (hocKi) {
    case 'Học kỳ 1':
        hocKi = 1
        break
    case 'Học kỳ 2':
        hocKi = 2
        break
    case 'Học kỳ 3':
        hocKi = 3
        break
    }

    try {
        const list = await PhieuThuHocPhi.findAll({
            where: {
                soTienConLai: {
                    [Sequelize.Op.gt]: 0
                },
                hocKi,
                namHoc
            }
        })
        if (list) return list
    } catch (err) {
        throw new Error(err)
    }
}

const getReceiptByMssv = async ( { mssv } ) => {
    try {
        const receipt = await PhieuThuHocPhi.findOne({ where: { mssv } })
        if (receipt) return receipt
    } catch (err) {
        throw new Error(err)
    }
}

const pay = async ( { soPhieu }, { mssv, price }) => {
    try {
        price = Number.parseInt(price)
        const receipt = await PhieuThuHocPhi.findOne({
            where: {
                soPhieu
            }
        })
        const student = await SinhVien.findOne({ where: { mssv } })
        if (receipt.soTienConLai === 0) return [receipt, student]
        receipt.soTienConLai -= price
        student.soTienDangCo -= price
        receipt.save()
        student.save()
        return [receipt, student]
    } catch (err) {
        throw new Error(err)
    }
}

module.exports = {
    PhieuThuHocPhi,
    createReceipt,
    getAllReceipts,
    getStudentsNotPaid,
    getReceiptByMssv,
    pay
}