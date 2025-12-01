import express from 'express'
import userAuth from '../middlewares/userAuth.js'
import { razorpayPayment, verifyPayment } from '../controllers/paymentControllers.js'

const paymentRoutes = express.Router()

paymentRoutes.post('/razorpay', userAuth, razorpayPayment)
paymentRoutes.post('/verify-razorpay', userAuth, verifyPayment)

export default paymentRoutes
