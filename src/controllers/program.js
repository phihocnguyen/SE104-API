const { ChuongTrinhHoc } = require('~/models/chuongtrinhhoc')
const { MonHoc } = require('~/models/monhoc')

exports.createNewProgram = async (req, res, next) => {
    const { nganhHoc, khoa, hocKi, tenMonHoc } = req.body
    try {
        const subject = await MonHoc.findOne({ where: { tenMonHoc } })
        const newProgram = await ChuongTrinhHoc.create({
            nganhHoc,
            khoa,
            hocKi,
            maMonHoc: subject.maMonHoc
        })
        res.status(200).json(newProgram)
    } catch (err) {
        next(err)
    }
}

exports.getAllPrograms = async (req, res, next) => {
    try {
        const allPrograms = await ChuongTrinhHoc.findAll()
        res.status(200).json(allPrograms)
    } catch (err) {
        next(err)
    }
}

exports.editProgram = async (req, res, next) => {
    const { id } = req.params
    try {
        await ChuongTrinhHoc.update({ ...req.body }, { where: { id } })
        const editedSubject = await ChuongTrinhHoc.findOne({ where: { id } })
        res.status(200).json(editedSubject)
    } catch (err) {
        next(err)
    }
}

exports.deleteProgram = async (req, res, next) => {
    const { id } = req.params
    try {
        const result = await ChuongTrinhHoc.destroy({ where: { id } })
        result ? res.status(200).json('Deleted successfully') : res.status(400).json('id not found')
    } catch (err) {
        next(err)
    }
}