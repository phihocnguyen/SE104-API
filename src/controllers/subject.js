const { MonHoc } = require('~/models/monhoc')

exports.createNewSubject = async (req, res, next) => {
    const { mamonhoc, tenmonhoc, loaimon, sotiet } = req.body
    try {
        if (mamonhoc) {
            const existSubject = await MonHoc.findOne({ where: { maMonHoc: mamonhoc } })
            if (existSubject) {
                res.status(400).json('bad request')
                return
            }
        }
        await MonHoc.create({
            maMonHoc: mamonhoc,
            tenMonHoc: tenmonhoc,
            loaiMon: loaimon,
            soTiet: Number.parseInt(sotiet)
        })
        const allSubjects = await MonHoc.findAll({})
        if (allSubjects) res.status(201).json(allSubjects)
    } catch (err) {
        next(err)
    }
}

exports.editSubject = async (req, res, next) => {
    const { mmh } = req.params
    try {
        await MonHoc.update(
            {
                ...req.body
            },
            {
                where: {
                    maMonHoc: mmh
                }
            }
        )

        const editedSubject = await MonHoc.findOne({ where: { maMonHoc: mmh } })

        res.status(200).json(editedSubject)

    } catch (err) {
        next(err)
    }
}

exports.deleteSubject = async (req, res, next) => {
    const { mmh } = req.params
    try {
        await MonHoc.destroy({ where: { maMonHoc: mmh } })
        res.status(200).json(`deleted subject ${mmh}`)
    } catch (err) {
        next(err)
    }
}

exports.getAllSubjects = async (req, res, next) => {
    try {
        const allSubjects = await MonHoc.findAll({
            group: ['tenMonHoc']
        })
        res.status(200).json(allSubjects)
    } catch (err) {
        next(err)
    }
}