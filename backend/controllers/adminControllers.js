import { v2 as cloudinary } from 'cloudinary'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'

const addDoctor = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            speciality,
            degree,
            experience,
            about,
            fees,
            address
        } = req.body
        const imageFile = req.file

        if(
            !name ||
            !email ||
            !password ||
            !speciality ||
            !degree ||
            !experience ||
            !about ||
            !fees ||
            !address
        ){
            return res.json({ success: false, message: "Missing details." })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image"
        })
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            image: imageUrl,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({ success: true, message: "Doctor added." })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if(!email || !password){
            return res.json({
                success: false,
                message: "Incomplete credentials."
            })
        }

        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.json({
                success: false,
                message: "Incorrect email or password."
            })
        }

        const token = jwt.sign(email, process.env.JWT_SECRET)

        res.json({
            success: true,
            token
        })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find()
        res.json({ success: true, doctors })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        message: error.message
    }
}

const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        await appointmentModel.findByIdAndUpdate(appointmentId, {
            cancelled: true
        })

        const { docId, slotDate, slotTime } = appointmentData
        const docData = await doctorModel.findById(docId)

        const slots_booked = docData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(
            (e) => e !== slotTime
        )

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: "Appointment cancelled" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const adminDashboard = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({})
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    addDoctor,
    adminLogin,
    allDoctors,
    appointmentsAdmin,
    appointmentCancel,
    adminDashboard
}