import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const Appointments = () => {

    const { token, backend_url, navigate, CircularProgress, loading, setLoading } = useContext(AppContext)

    const [appointments, setAppointments] = useState([])
    const [razorpayLoading, setRazorpayLoading] = useState(false)

    const fetchAppointments = async () => {
        setLoading(true)
        try {
            const response = await axios.post(backend_url + '/api/user/appointments', {}, { headers: { token } })
            if (response.data.success) {
                setAppointments(response.data.appointments)
            } else {
                toast.error('Error while fetching data.')
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const cancleAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backend_url + '/api/user/cancel-appointment', { appointmentId: appointmentId }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                window.location.reload()
                toast.info('Appointment cancelled')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const initPay = async (order) => {
        await loadRazorpay()
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Order payment',
            description: 'Order payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                console.log(response)
                try {
                    const { data } = await axios.post(backend_url + '/api/payment/verify-razorpay', { razorpay_order_id: response.razorpay_order_id, razorpay_payment_id: response.razorpay_payment_id, razorpay_signature: response.razorpay_signature }, { headers: { token } })
                    if (data.success) {
                        window.location.reload()
                        toast.success('Payment successfull')
                    }
                } catch (error) {
                    toast.error(error.message)
                }
            }
        }
        setRazorpayLoading(false)
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const handleRazorpay = async (appointmentId) => {
        setRazorpayLoading(true)
        try {
            const { data } = await axios.post(backend_url + '/api/payment/razorpay', { appointmentId }, { headers: { token } })
            if (data.success) {
                initPay(data.order)
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
            {loading ? <div className='w-full h-screen flex items-center justify-center'><CircularProgress varient="determinate" /></div> :
                appointments.length > 0 ? <p className='text-zinc-600 pb-4'>My Appointments</p> : <p className='text-zinc-600'>No Appointments booked</p>}
            {
                appointments.length > 0 && (
                    appointments.reverse().map((item, indx) => {
                        return <div key={indx} className='py-2 lg:py-4 grid grid-cols-[2fr_4fr] grid-rows-[1fr_0.3fr] lg:grid-rows-1 lg:grid-cols-[1fr_6fr_1.5fr] gap-2 lg:gap-4 border-b border-zinc-300'>
                            <img src={item.docData.image} alt="" className='h-full w-full border border-zinc-100 rounded' />
                            <div className='flex flex-col items-start'>
                                <p className='text-sm lg:text-xl text-zinc-800'>{item.docData.name}</p>
                                <p className='text-xs lg:text-sm text-zinc-500'>{item.docData.speciality}</p>
                                <div className='flex flex-col mt-2 text-zinc-500 text-xs lg:text-base'>
                                    <p className='text-zinc-700'>Address: </p>
                                    <p>{item.docData.address.line1}</p>
                                    <p>{item.docData.address.line2}</p>
                                </div>
                                <p className='text-zinc-500 text-xs lg:text-base mt-2'><span className='text-zinc-700'>Date & Time: </span>{item.slotDate.replace(/_/g, ".")} | {item.slotTime}</p>
                            </div>

                            {
                                item.cancelled === true ? <div className='col-span-2 lg:col-span-1 flex items-center justify-center'><p className='text-red-500 text-sm lg:text-base'>Appointment cancelled</p></div> : item.isCompleted === true ? <div className='col-span-2 lg:col-span-1 flex items-center justify-center'><p className='text-green-500 text-sm lg:text-base'>Appointment Completed</p></div> : item.payment === true ? <div className='col-span-2 lg:col-span-1 flex flex-col items-center justify-center'>
                                    <p className='text-yellow-500 text-center text-sm lg:text-base'>Payment completed</p>
                                </div> : <div className='col-span-2 lg:col-span-1 flex flex-col justify-center gap-2 lg:gap-4'>
                                    <button onClick={() => handleRazorpay(item._id)} className='text-white cursor-pointer w-full flex items-center justify-center py-2 text-xs lg:text-base rounded bg-[#4fd19f]'>{
                                        !razorpayLoading ? 'Pay here' : <svg className='h-4 w-4 lg:h-6 lg:w-6' fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="4" cy="12" r="3" opacity="1">
                                                <animate id="spinner_qYjJ" begin="0;spinner_t4KZ.end-0.25s" attributeName="opacity" dur="0.75s" values="1;.2" fill="freeze" />
                                            </circle>
                                            <circle cx="12" cy="12" r="3" opacity=".4">
                                                <animate begin="spinner_qYjJ.begin+0.15s" attributeName="opacity" dur="0.75s" values="1;.2" fill="freeze" />
                                            </circle>
                                            <circle cx="20" cy="12" r="3" opacity=".3">
                                                <animate id="spinner_t4KZ" begin="spinner_qYjJ.begin+0.3s" attributeName="opacity" dur="0.75s" values="1;.2" fill="freeze" />
                                            </circle>
                                        </svg>


                                    }</button>
                                    <button onClick={() => cancleAppointment(item._id)} className='text-zinc-500 text-xs lg:text-base w-full flex cursor-pointer items-center justify-center py-2 border border-zinc-300 rounded bg-white'>Cancle appointment</button>
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