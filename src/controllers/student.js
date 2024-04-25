const { SinhVien } = require('~/models/sinhvien')
const { TaiKhoan } = require('~/models/taikhoan')
const bcrypt = require('bcrypt')
exports.createNewStudent = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10)

    const { hoTen, ngaySinh, gioiTinh, queQuan, doiTuong, nganhHoc } = req.body

    try {
        const mssv = `2252${Math.floor(Math.random() * (9999-1000) + 1000)}`
        const newUser = await TaiKhoan.create({
            taiKhoan: mssv,
            matKhau: bcrypt.hashSync(mssv, salt),
            role: 1
        })
        const newStudent = await SinhVien.create({
            mssv,
            hoTen,
            ngaySinh,
            gioiTinh,
            queQuan,
            doiTuong,
            nganhHoc,
            IDtaiKhoan: newUser.id
        })
        res.status(201).json(newStudent)
    } catch (err) {
        next(err)
    }
}

exports.editStudent = async (req, res, next) => {
    const { mssv } = req.params
    try {
        await SinhVien.update(
            {
                ...req.body
            },
            {
                where: {
                    mssv: mssv
                }
            }
        )
        const editedStudent = await SinhVien.findOne( { where: { mssv } })
        res.status(200).json(editedStudent)
    } catch (err) {
        next(err)
    }
}

exports.deleteStudent = async (req, res, next) => {
    const { mssv } = req.params
    try {
        await SinhVien.destroy( {
            where: {
                mssv
            }
        })
        await TaiKhoan.destroy({
            where: {
                taiKhoan: mssv
            }
        })
        res.status(200).json(`deleted mssv ${mssv}`)
    } catch (err) {
        next(err)
    }
}

exports.getAllStudents = async (req, res, next) => {
    try {
        const allStudents = await SinhVien.findAll()
        res.status(200).json(allStudents)
    } catch (err) {
        next(err)
    }
}