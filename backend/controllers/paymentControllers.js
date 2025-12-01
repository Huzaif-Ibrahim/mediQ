import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'
import crypto from 'crypto'

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

export const razorpayPayment = async (req, res) => {
    try {
        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData) return res.json({ success: false, message: 'An error occured' })

        const options = {
            amount: appointmentData.amount * 100,
            currency: 'INR',
            receipt: appointmentId.toString(),
            notes: { appointmentId }
        }

        const order = await razorpayInstance.orders.create(options)

        res.json({ success: true, order })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

        const body = razorpay_order_id + '|' + razorpay_payment_id
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex")

        if (razorpay_signature !== expectedSignature) return res.json({ success: false, message: 'Invalid signature' })

        const paymentInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        const { appointmentId } = paymentInfo.notes

        if (paymentInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true })
            res.json({ success: true, message: 'Payment successfull' })
        } else {
            res.json({ success: false, message: 'Payment failed' })
        }
        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}