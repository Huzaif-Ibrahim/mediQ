import express from 'express'
import userAuth from '../middlewares/userAuth.js'
import upload from '../middlewares/multer.js'
import {
    bookAppointment,
    cancleAppointment,
    getProfile,
    listAppointment,
    loginUser,
    registerUser,
    updateProfile
} from '../controllers/userControllers.js'

const userRoutes = express.Router()

userRoutes.post('/register', registerUser)
userRoutes.post('/login', loginUser)
userRoutes.post('/get-profile', userAuth, getProfile)
userRoutes.post('/update-profile', upload.single("image"), userAuth, updateProfile)
userRoutes.post('/book-appointment', userAuth, bookAppointment)
userRoutes.post('/appointments', userAuth, listAppointment)
userRoutes.post('/cancel-appointment', userAuth, cancleAppointment)

export default userRoutes