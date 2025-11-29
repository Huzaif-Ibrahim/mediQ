import express from 'express'
import upload from '../middlewares/multer.js'
import { adminAuth } from '../middlewares/adminAuth.js'
import {
    addDoctor,
    adminDashboard,
    adminLogin,
    allDoctors,
    appointmentCancel,
    appointmentsAdmin
} from '../controllers/adminControllers.js'
import { changeAvailability } from '../controllers/doctorControllers.js'

const adminRoutes = express.Router()

adminRoutes.post('/add-doctor', upload.single("image"), adminAuth, addDoctor)
adminRoutes.post('/login', adminLogin)
adminRoutes.get('/all-doctors', adminAuth, allDoctors)
adminRoutes.get('/appointments', adminAuth, appointmentsAdmin)
adminRoutes.post('/cancel-appointment', adminAuth, appointmentCancel)
adminRoutes.get('/dashboard', adminAuth, adminDashboard)
adminRoutes.post('/change-availability', adminAuth, changeAvailability)

export default adminRoutes