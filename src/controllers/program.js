const { ChuongTrinhHoc } = require('~/models/chuongtrinhhoc')
const { MonHoc } = require('~/models/monhoc')

exports.createNewProgram = async (req, res, next) => {
    const { nganhhoc, khoa, hocky, tenmonhoc } = req.body

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
        let subject = await MonHoc.findOne({ where: { tenmonhoc } })
        await ChuongTrinhHoc.create({
            nganhHoc: nganhhoc,
            khoa: khoa,
            hocKi: Number.parseInt(hocKy),
            maMonHoc: subject.maMonHoc
        })
        const result = []
        const allPrograms = await ChuongTrinhHoc.findAll({})
        for (let i = 0; i < allPrograms.length; i++) {
            subject = await MonHoc.findOne({ where: { maMonHoc: allPrograms[i].dataValues.maMonHoc } })

            allPrograms[i].dataValues['tenMonHoc'] = subject.tenMonHoc
            result.push(allPrograms[i])
        }
        if (result) return res.status(201).json(result)
    } catch (err) {
        next(err)
    }
}

exports.getAllPrograms = async (req, res, next) => {
    try {
        const allPrograms = await ChuongTrinhHoc.findAll()
        const newData = []
        for (let i = 0; i < allPrograms.length; i++) {
            const subject = await MonHoc.findOne({ where: { maMonHoc: allPrograms[i].maMonHoc } })
            newData.push({
                id: allPrograms[i].id,
                nganhHoc: allPrograms[i].nganhHoc,
                khoa: allPrograms[i].khoa,
                hocKi: allPrograms[i].hocKi,
                tenMonHoc: subject.tenMonHoc,
                createdAt: allPrograms[i].createdAt,
                updatedAt: allPrograms[i].updatedAt
            })
        }
        if (newData) res.status(200).json(newData)
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