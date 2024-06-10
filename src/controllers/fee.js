const { createReceipt, getAllReceipts, getStudentsNotPaid, getReceiptByMssv, pay } = require('~/models/phieuthuhocphi')

exports.createReceipt = async (req, res, next) => {
    try {
        const newReceipt = await createReceipt(req.body)
        if (newReceipt) res.status(201).json(newReceipt)
    } catch (err) {
        next(err)
    }
}

exports.getAllReceipts = async (req, res, next) => {
    try {
        const list = await getAllReceipts(req.query)
        if (list) res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}

exports.getStudentsNotPaid = async (req, res, next) => {
    try {
        const list = await getStudentsNotPaid(req.query)
        if (list) res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}

exports.getReceiptByMssv = async (req, res, next) => {
    try {
        const receipt = await getReceiptByMssv(req.params)
        if (receipt) res.status(200).json(receipt)
    } catch (err) {
        next(err)
    }
}

exports.pay = async (req, res, next) => {
    try {
        const result = await pay(req.params, req.body)
        if (result) res.status(200).json(result)
    } catch (err) {
        next(err)
    }
}