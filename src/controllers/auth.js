const { TaiKhoan } = require('~/models/taikhoan')
const bcrypt = require('bcrypt')
exports.login = async (req, res, next) => {
    const { username, password } = req.body
    try {
        const existUser = await TaiKhoan.findOne({ where: {
            taiKhoan: username
        } })
        const correctPassword = await bcrypt.compareSync(password, existUser.matKhau)
        if (existUser && correctPassword) {
            res.status(200).json(existUser)
        } else {
            res.status(401).json('Unauthorized')
        }
    } catch (err) {
        next(err)
    }
}