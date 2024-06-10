const { SinhVien } = require('~/models/sinhvien')
const { TaiKhoan } = require('~/models/taikhoan')
const bcrypt = require('bcrypt')
exports.createNewStudent = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10)

    const { hovaten, ngaysinh, huyen, quan, nganhhoc, gioitinh } = req.body
    const queQuan = `${quan}, ${huyen}`
    try {
        const mssv = `2252${Math.floor(Math.random() * (9999-1000) + 1000)}`
        const newUser = await TaiKhoan.create({
            taiKhoan: mssv,
            matKhau: bcrypt.hashSync(mssv, salt),
            role: 0
        })
        await SinhVien.create({
            mssv,
            hoTen: hovaten,
            ngaySinh: ngaysinh,
            gioiTinh: gioitinh,
            queQuan: queQuan,
            doiTuong: 1,
            nganhHoc: nganhhoc,
            soTienDangCo: 0,
            IDtaiKhoan: newUser.id
        })
        const allStudents = await SinhVien.findAll()
        if (allStudents) res.status(201).json(allStudents)
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
        const allStudents = await SinhVien.findAll({ order: [['createdAt', 'ASC']] })
        res.status(200).json(allStudents)
    } catch (err) {
        next(err)
    }
}

exports.getStudentByMssv = async (req, res, next) => {
    try {
        const student = await SinhVien.findOne( { where: { mssv: req.params.mssv } } )
        if (student) res.status(200).json(student)
    } catch (err) {
        next(err)
    }
}

exports.updateSTDC = async (req, res, next) => {
    try {
        const { mssv, stdc } = req.params
        const result = await SinhVien.update( { soTienDangCo: stdc }, { where: { mssv } } )
        if (result) res.status(200).json(result)
    } catch (err) {
        next(err)
    }
}