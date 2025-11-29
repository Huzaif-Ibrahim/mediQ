import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"

const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body

        if(!email || !password){
            return res.json({ success: false, message: 'Incomplete credientials.' })
        }

        const doctor = await doctorModel.findOne({ email })
        if(!doctor) return res.json({ success: false, message: "No doctor found." })

        const isMatch = await bcrypt.compare(password, doctor.password)
        if(!isMatch){
            return res.json({ success: false, message: "Password is wrong." })
        }

        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const changeAvailability = async (req, res) => {
    try {
        const { docId } = req

        const docData = await doctorModel.findById(docId)

        if(!docData){
            return res.json({
                success: false,
                message: "Unauthorized doctor."
            })
        }

        await doctorModel.findByIdAndUpdate(docId, {
            available: !docData.available
        })

        res.json({ success: true, message: "Changed availability." })


    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password','-email'])

        res.json({ success: true, doctors })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const appointmentsDoctor = async (req, res) => {
    try {
        const { docId } = req
        const appointments = await appointmentModel.find({ docId })

        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const appointmentComplete  = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const { docId } = req

        const appointmentData = await appointmentModel.findById(appointmentId)

        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId, {
                isCompleted: true
            })
        }

        res.json({ success: true, message: "Updated successfully." })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

const appointmentCancel  = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const { docId } = req

        const appointmentData = await appointmentModel.findById(appointmentId)

        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId, {
                cancelled: true
            })
        }

        res.json({ success: true, message: "Cancelled successfully." })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

const doctorDashboard  = async (req, res) => {
    try {
        const { docId } = req
        const appointments = await appointmentModel.find({ docId })

        let earnings = 0

        appointments.map((e) => {
            if(e.isCompleted || e.payment){
                earnings+=e.amount
            }
        })

        let patients = []

        appointments.map(e => {
            if(!patients.includes(e.userId)){
                patients.push(e.userId)
            }
        })

        const dashData = {
            earnings,
            patients: patients.length,
            appointments: appointments.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success })
    }
}

const doctorProfile = async (req, res) => {
    try {
        const { docId } = req
        const profileData = await doctorModel.findById(docId)
        
        res.json({ success: true, profileData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const updateDoctorProfile = async (req, res) => {
    try {
        const { fees, address, available } = req.body
        const { docId } = req

        await doctorModel.findByIdAndUpdate(docId, { fees, address:JSON.parse(address), available })

        res.json({ success: true, message: "Updated successfully." })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    loginDoctor,
    changeAvailability,
    appointmentsDoctor,
    doctorList,
    appointmentComplete,
    appointmentCancel,
    doctorDashboard,
    doctorProfile,
    updateDoctorProfile
}