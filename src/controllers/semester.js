const { HocKi } = require('~/models/hocki')
const { MonHoc } = require('~/models/monhoc')

exports.createNewSemester = async (req, res, next) => {
    const { hocKi, namHoc, tenMonHoc } = req.body
    try {
        const subject = await MonHoc.findOne({ where: { tenMonHoc } })
        const newSemester = await HocKi.create({
            hocKi,
            namHoc,
            maMonHoc: subject.maMonHoc
        })
        res.status(201).json(newSemester)
    } catch (err) {
        next(err)
    }
}

exports.editSemester = async (req, res, next) => {
    const { id } = req.params
    try {
        await HocKi.update(
            {
                ...req.body
            },
            {
                where: {
                    id
                }
            }
        )
        const editedSemester = await HocKi.findOne( { where: { id } })
        res.status(200).json(editedSemester)
    } catch (err) {
        next(err)
    }
}

exports.deleteSemester = async (req, res, next) => {
    const { id } = req.params
    try {
        const result = await HocKi.destroy({
            where: {
                id
            }
        })
        result ? res.status(200).json('deleted successfully') : res.status(400).json('id not found')
    } catch (err) {
        next(err)
    }
}

exports.getAllSemesters = async (req, res, next) => {
    try {
        const allSemesters = await HocKi.findAll()
        res.status(200).json(allSemesters)
    } catch (err) {
        next(err)
    }
}