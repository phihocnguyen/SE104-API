const { ChuongTrinhHoc } = require('~/models/chuongtrinhhoc')
const { HocKi } = require('~/models/hocki')
const { MonHoc } = require('~/models/monhoc')

exports.createNewSemester = async (req, res, next) => {
    const { hocky, namhoc, tenmonhoc } = req.body

    let hocKy = 0
    switch (hocky) {
    case 'Học kỳ 1': {
        hocKy = 1
        break
    }
    case 'Học kỳ 2': {
        hocKy = 2
        break
    }
    default: {
        hocKy = 3
        break
    }
    }

    try {
        if (tenmonhoc === 'Chọn môn học') throw new Error()
        let subject = await MonHoc.findOne({ where: { tenmonhoc } })
        await HocKi.create({
            hocKi: Number.parseInt(hocKy),
            namHoc: namhoc,
            maMonHoc: subject.maMonHoc
        })
        const allSemester = await HocKi.findAll()
        for (let i = 0; i < allSemester.length; i++) {
            subject = await MonHoc.findOne({ where: { maMonHoc: allSemester[i].dataValues.maMonHoc } })
            allSemester[i].dataValues['tenMonHoc'] = subject.tenMonHoc
        }
        if (allSemester) res.status(201).json(allSemester)
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
        const result = []

        for (let i = 0; i < allSemesters.length; i++) {
            const subject = await MonHoc.findOne({ where: { maMonHoc: allSemesters[i].maMonHoc } })
            result.push({
                id: allSemesters[i].id,
                namHoc: allSemesters[i].namHoc,
                hocKi: allSemesters[i].hocKi,
                tenMonHoc: subject.tenMonHoc,
                createdAt: allSemesters[i].createdAt,
                updatedAt: allSemesters[i].updatedAt
            })
        }

        if (result) res.status(200).json(result)
    } catch (err) {
        next(err)
    }
}

exports.getSubjectsBySemester = async (req, res, next) => {
    try {
        let { namHoc, hocKy } = req.query
        switch (hocKy) {
        case 'Học kỳ 1':
            hocKy = 1
            break
        case 'Học kỳ 2':
            hocKy = 2
            break
        default:
            hocKy = 3
            break
        }
        const result = await HocKi.findAll({
            where: {
                namHoc,
                hocKi: hocKy
            }
        })

        const subjects = []

        for (let i = 0; i < result.length; i++) {
            const subject = await MonHoc.findOne({
                where: {
                    maMonHoc: result[i].dataValues.maMonHoc
                }
            })

            if (subject.dataValues.loaiMon === 'Lý thuyết') {
                subject.dataValues['tinChi'] = Math.floor(Number.parseInt(subject.dataValues.soTiet) / 15)
            } else subject.dataValues['tinChi'] = Math.floor(Number.parseInt(subject.dataValues.soTiet) / 30)

            if (subject) subjects.push(subject)
        }

        if (subjects) res.status(200).json(subjects)
    } catch (err) {
        next(err)
    }
}

exports.getAllSubjectsBySemester = async (req, res, next) => {
    try {
        let { hocKy } = req.params
        switch (hocKy) {
        case 'Học kỳ 1':
            hocKy = 1
            break
        case 'Học kỳ 2':
            hocKy = 2
            break
        default:
            hocKy = 3
            break
        }
        const result = await ChuongTrinhHoc.findAll({
            where: {
                hocKi: hocKy
            }
        })
        const subjects = []
        for (let i = 0; i < result.length; i++) {
            const subject = await MonHoc.findOne({
                where: {
                    maMonHoc: result[i].dataValues.maMonHoc
                }
            })

            if (subject) subjects.push(subject)
        }

        if (subjects) res.status(200).json(subjects)
    } catch (err) {
        next(err)
    }
}
