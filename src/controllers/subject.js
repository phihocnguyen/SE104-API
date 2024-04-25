const { MonHoc } = require('~/models/monhoc')

exports.createNewSubject = async (req, res, next) => {
    try {
        const newSubject = await MonHoc.create({
            ...req.body
        })
        res.status(201).json(newSubject)
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
        const allSubjects = await MonHoc.findAll()
        res.status(200).json(allSubjects)
    } catch (err) {
        next(err)
    }
}