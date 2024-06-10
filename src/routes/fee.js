import { createReceipt, getAllReceipts, getReceiptByMssv, getStudentsNotPaid, pay } from '~/controllers/fee'

const express = require('express')

const feeRouter = express.Router()

feeRouter.post('/create', createReceipt)
feeRouter.get('/allreceipts', getAllReceipts)
feeRouter.get('/studentsnotpaid', getStudentsNotPaid)
feeRouter.get('/receiptbymssv/:mssv', getReceiptByMssv)
feeRouter.put('/pay/:soPhieu', pay)
export default feeRouter