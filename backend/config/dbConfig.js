import mongoose from "mongoose";

export const connectToDb = (url) => {
    mongoose.connect(`${url}/Appointment_booking`)
    .then(() => console.log('Connected to db.'))
    .catch((err) => console.log(`DB error ${err.message}`))
}