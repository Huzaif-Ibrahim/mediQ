import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const Appointments = () => {

    const { token, backend_url, navigate } = useContext(AppContext)
    const location = useLocation()

    const [appointments, setAppointments] = useState([])

    const fetchAppointments = async () => {
        try {
            const response = await axios.post(backend_url + '/api/user/appointments', {}, { headers: { token } })
            if (response.data.success) {
                setAppointments(response.data.appointments)
            } else {
                toast.error('Error while fetching data.')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const cancleAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backend_url + '/api/user/cancel-appointment', { appointmentId: appointmentId }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                window.location.reload()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            fetchAppointments()
        }
    }, [token])

    return (
        <div className='min-h-screen py-4 mb-32'>
            {appointments.length > 0 ? <p className='text-zinc-600 pb-4'>My Appointments</p> : <p className='text-zinc-600'>No Appointments booked</p>}
            {
                appointments.length > 0 && (
                    appointments.reverse().map((item, indx) => {
                        return <div key={indx} className='py-4 flex flex-col lg:grid lg:grid-cols-[1fr_6fr_1.5fr] gap-4 border-b border-zinc-400'>
                            <img src={item.docData.image} alt="" className='w-full h-full' />
                            <div className='flex flex-col items-start'>
                                <p className='text-xl text-zinc-800'>{item.docData.name}</p>
                                <p className='text-sm text-zinc-500'>{item.docData.speciality}</p>
                                <div className='flex flex-col mt-2 text-zinc-500'>
                                    <p className='text-zinc-700'>Address: </p>
                                    <p>{item.docData.address.city}</p>
                                    <p>{item.docData.address.country}</p>
                                </div>
                                <p className='text-zinc-500 mt-2'><span className='text-zinc-700'>Date & Time: </span>{item.slotDate.replace(/_/g, ".")} | {item.slotTime}</p>
                            </div>

                            {
                                item.cancelled === true ? <div className='flex items-center justify-center'><p className='text-red-500'>Appointment cancelled</p></div> : item.isCompleted === true ? <div className='flex items-center justify-center'><p className='text-green-500'>Appointment Completed</p></div> : item.payment === true ? <div className='flex flex-col justify-end gap-4'>
                                    <p className='text-yellow-500 text-center'>Payment completed</p>
                                    <button onClick={() => cancleAppointment(item._id)} className='text-zinc-500 w-full flex cursor-pointer items-center justify-center py-2 border border-zinc-300 rounded bg-white'>Cancle appointment</button>
                                </div> : <div className='flex flex-col justify-end gap-4'>
                                    <button className='text-white cursor-pointer w-full flex items-center justify-center py-2 rounded bg-[#4fd19f]'>Pay here</button>
                                    <button onClick={() => cancleAppointment(item._id)} className='text-zinc-500 w-full flex cursor-pointer items-center justify-center py-2 border border-zinc-300 rounded bg-white'>Cancle appointment</button>
                                </div>
                            }
                        </div>
                    })
                )
            }
        </div>
    )
}

export default Appointments