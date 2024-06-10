const DKHocPhan = require('~/models/dkhocphan')

exports.createEnrollment = async (req, res, next) => {
    try {
        const newEnrollment = await DKHocPhan.createEnrollment(req.body)
        if (newEnrollment) res.status(201).json(newEnrollment)
        else return res.status(400).json(req.body.maMonHoc)
    } catch (err) {
        next(err)
    }
}

exports.getEnrollmentsByMssv = async (req, res, next) => {
    try {
        const { mssv } = req.params

        const enrollments = await DKHocPhan.getEnrollmentsByMssv(mssv)
        if (enrollments) res.status(200).json(enrollments)
        else res.status(404).json([])
    } catch (err) {
        next(err)
    }
}

exports.getEnrollmentsBySemester = async (req, res, next) => {
    try {
        const { hocKy, namHoc } = req.query

        const enrollments = await DKHocPhan.getEnrollmentsBySemester(hocKy, namHoc)
        if (enrollments) res.status(200).json(enrollments)
        else res.status(404).json([])
    } catch (err) {
        next(err)
    }
}

exports.getAllEnrollments = async (req, res, next) => {
    try {
        const allEnrollments = await DKHocPhan.getAllEnrollments()
        if (allEnrollments) res.status(200).json(allEnrollments)
    } catch (err) {
        next(err)
    }
}

exports.deleteEnrollment = async (req, res, next) => {
    try {
        const deletedEnrollment = await DKHocPhan.deleteEnrollment(req.params)
        if (deletedEnrollment) res.status(200).json(deletedEnrollment)
        else res.status(400)
    } catch (err) {
        next(err)
    }
}