import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import userModel from '../models/userModel.js'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.json({
                success: false,
                message: 'Incomplete information'
            })
        }
        const isUserPresent = await userModel.findOne({ email })
        if (isUserPresent) {
            return res.json({
                success: false,
                message: 'User present with same email.'
            })
        }
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: 'Please enter an valid email.'
            })
        }
        if (password.length < 8) {
            return res.json({
                success: false, message: 'Passowrd must exceed 8 characters.'
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.json({
                success: false,
                message: 'Incomplete fields.'
            })
        }

        const user = await userModel.findOne({ email })
        if (!user) return res.json({ success: false, message: 'No user found.' })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.json({ success: false, message: 'Wrong credentials.' })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    } catch (error) {
        consol.log(error)
        res.json({ success: false, message: error.message })
    }
}

const getProfile = async (req, res) => {
    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId).select("-password")

        res.json({ success: true, userData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, email, gender, dob, address } = req.body
        const imageFile = req.file

        if (!name || !phone || !gender || !dob) {
            return res.json({ success: false, message: "Incomplete credientials." })
        }

        await userModel.findByIdAndUpdate(userId, {
            name,
            email,
            phone,
            gender,
            dob,
            address: JSON.parse(address)
        })

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: "image"
            })
            const imageUrl = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageUrl })
        }

        res.json({ success: true, message: "Profiled Updated." })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body

        const docData = await doctorModel.findById(docId).select("-password")
        const userData = await userModel.findById(userId).select('-password')

        if(!docData.available) return res.json({success: false, message: 'Doctor unavailable'})

        let slots_booked = docData.slots_booked

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot already booked." })
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            slotDate,
            slotTime,
            userData,
            docData,
            amount: docData.fees,
            date: Date.now(),
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: "Appointment booked successfully." })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const listAppointment = async (req, res) => {
    try {
        const {userId} = req.body
        const appointments = await appointmentModel.find({ userId })

        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const cancleAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body

        const appointmantData = await appointmentModel.findById(appointmentId)

        if(appointmantData.userId !== userId){
            return res.json({ success: false, message: "Unauthorized action." })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, {
            cancelled: true
        })

        // removing appointment in doctor model

        const { docId, slotDate, slotTime } = appointmantData

        const docData = await doctorModel.findById(docId)

        let slots_booked = docData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(
            (e) => e !== slotTime
        )
        
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: "Appointment cancelled." })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    bookAppointment,
    listAppointment,
    cancleAppointment
}