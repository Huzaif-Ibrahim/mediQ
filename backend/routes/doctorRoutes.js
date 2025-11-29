import express from 'express'
import { 
    loginDoctor,
    changeAvailability,
    appointmentsDoctor,
    doctorList,
    appointmentComplete,
    doctorDashboard,
    doctorProfile,
    updateDoctorProfile
} from '../controllers/doctorControllers.js'
import { doctorAuth } from '../middlewares/doctorAuth.js'
import { appointmentCancel } from '../controllers/adminControllers.js'
import upload from '../middlewares/multer.js'

const doctorRoutes = express.Router()

doctorRoutes.post('/login', loginDoctor)
doctorRoutes.get('/list', doctorList)
doctorRoutes.get('/change-availability',doctorAuth, changeAvailability)
doctorRoutes.get('/appointments', doctorAuth, appointmentsDoctor)
doctorRoutes.post('/complete-appointment', doctorAuth, appointmentComplete)
doctorRoutes.post('/cancel-appointment', doctorAuth, appointmentCancel)
doctorRoutes.get('/dashboard', doctorAuth, doctorDashboard)
doctorRoutes.get('/profile', doctorAuth, doctorProfile)
doctorRoutes.post('/update-profile', doctorAuth,upload.none(), updateDoctorProfile)

export default doctorRoutes