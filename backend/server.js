import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectToDb } from './config/dbConfig.js'
import connectCloudinary from './config/cloudinary.js'
import adminRoutes from './routes/adminRoutes.js'
import doctorRoutes from './routes/doctorRoutes.js'
import userRoutes from './routes/userRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'

const app = express()
const port = process.env.PORT
connectToDb(process.env.MONGO_URI)
connectCloudinary()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/admin' ,adminRoutes)
app.use('/api/doctor' ,doctorRoutes)
app.use('/api/user' ,userRoutes)
app.use('/api/payment', paymentRoutes)
app.get('/', (req,res) => {
    res.send('App is working')
})

app.listen(process.env.PORT, () => {
    console.log('App is running')
})