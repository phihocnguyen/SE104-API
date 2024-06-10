const { TaiKhoan } = require('~/models/taikhoan')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SinhVien } = require('~/models/sinhvien')
exports.login = async (req, res, next) => {
    const { username, password } = req.body

    try {
        const existUser = await TaiKhoan.findOne({ where: {
            taiKhoan: username
        } })
        let existStudent = {}
        let correctPassword = false
        if (existUser) {
            existStudent = await SinhVien.findOne({
                where: {
                    IDtaikhoan: existUser.id
                }
            })
            correctPassword = await bcrypt.compareSync(password, existUser.matKhau)
        }
        if (existUser && correctPassword && existStudent) {
            const accessToken = jwt.sign({
                id: existUser.id,
                role: existUser.role,
                name: existStudent.hoTen,
                mssv: existStudent.mssv,
                stdc: existStudent.soTienDangCo
            }, process.env.TOKEN_SECRET, { expiresIn: '365d' })

            res.cookie('token', accessToken).json({ id: existUser.id, username: existUser.taiKhoan, role: existUser.role, name: existStudent.hoTen, mssv: existStudent.mssv, stdc: existStudent.soTienDangCo })

        } else if (existUser && correctPassword) {
            const accessToken = jwt.sign({
                id: existUser.id,
                role: existUser.role
            }, process.env.TOKEN_SECRET, { expiresIn: '365d' })
            res.cookie('token', accessToken).json({ id: existUser.id, username: existUser.taiKhoan, role: existUser.role })
        } else res.status(401).json('Unauthorized')
    } catch (err) {
        next(err)
    }
}

exports.register = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10)
    try {
        const newUser = await TaiKhoan.create({
            taiKhoan: req.body.taiKhoan,
            matKhau: bcrypt.hashSync(req.body.matKhau, salt),
            role: req.body.role
        })
        if (newUser) res.status(201).json(newUser)
    } catch (err) {
        next(err)
    }
}

exports.getUser = (req, res, next) => {
    try {
        if (req.user) res.status(200).json(req.user)
        else res.status(500).json('Wrong credentials')
    } catch (err) {
        next(err)
    }
}

exports.logout = (req, res, next) => {
    try {
        res.clearCookie('token').json('logout succesfully')
    } catch (err) {
        next(err)
    }
}

exports.register = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10)
    try {
        const newUser = await TaiKhoan.create({
            taiKhoan: req.body.taiKhoan,
            matKhau: bcrypt.hashSync(req.body.matKhau, salt),
            role: req.body.role
        })
        if (newUser) res.status(201).json(newUser)
    } catch (err) {
        next(err)
    }
}

exports.getUser = (req, res, next) => {
    try {
        if (req.user) res.status(200).json(req.user)
        else res.status(500).json('Wrong credentials')
    } catch (err) {
        next(err)
    }
}

exports.logout = (req, res, next) => {
    try {
        res.clearCookie('token').json('logout succesfully')
    } catch (err) {
        next(err)
    }
}