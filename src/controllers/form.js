const PhieuDKHocPhan = require('~/models/phieudkhocphan')

exports.createForm = async (req, res, next) => {
    try {
        const newForm = await PhieuDKHocPhan.createForm(req.body)
        if (newForm) res.status(201).json(newForm)
    } catch (err) {
        next(err)
    }
}

exports.getFormBySerial = async (req, res, next) => {
    try {
        const list = await PhieuDKHocPhan.getFormBySerial(req.params.serial)
        if (list) res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}

exports.getAllFormsBySemester = async (req, res, next) => {
    try {
        const list = await PhieuDKHocPhan.getAllFormsBySemester(req.query)
        if (list) res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}
