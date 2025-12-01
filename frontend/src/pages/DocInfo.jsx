import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import Navbar from '../components/Navbar'
import RelatedDoctors from '../components/RelatedDoctors'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DocInfo = () => {

    const { docId } = useParams()
    const { doctors, backend_url, navigate, token, fetchDoctors, loading, setLoading, CircularProgress } = useContext(AppContext)

    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')
    const [docInfo, setDocInfo] = useState({})
    const [book_loading, setbook_loading] = useState(false)

    const fetchDoctorInfo = async () => {
        const info = doctors.find(item => item._id === docId)
        setDocInfo(info)
    }

    const getAvailableSlots = () => {
        setDocSlots([])
        let today = new Date()

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            if (currentDate.getDate() === today.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = []

            while (currentDate < endTime) {
                let filteredTime = currentDate.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                })

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + '_' + month + '_' + year
                const slotTime = filteredTime

                const isSlotAvailable = docInfo?.slots_booked?.[slotDate] && docInfo?.slots_booked?.[slotDate].includes(slotTime) ? false : true

                if (isSlotAvailable) {
                    timeSlots.push({
                        dateTime: new Date(currentDate),
                        time: filteredTime
                    })
                }
                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }
            setDocSlots((prev) => [...prev, timeSlots])
        }
    }


    const submitHandler = async () => {
        setLoading(true)
        setbook_loading(true)
        if (token) {
            try {

                const date = docSlots[slotIndex][0].dateTime

                let day = date.getDate()
                let month = date.getMonth() + 1
                let year = date.getFullYear()

                const slotDate = day + '_' + month + '_' + year

                const response = await axios.post(backend_url + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
                console.log(response)
                if (response.data.success) {
                    toast.success("Appointment booked successfully!")
                    fetchDoctors()
                    navigate('/appointments')
                } else {
                    toast.error(response.data.message)
                }
            } catch (error) {
                toast.error(error.message)
            } finally {
                setbook_loading(false)
                setLoading(false)
            }
        } else {
            navigate('/login')
            toast.info('You need to login to start booking')
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        fetchDoctorInfo()
    }, [docId, doctors])

    useEffect(() => {
        getAvailableSlots()
    }, [docInfo])

    return (
        docInfo &&
        <>
            <div className='pt-6 min-h-screen'>
                {
                    loading ? <div className='w-full h-screen flex items-center justify-center'><CircularProgress varient="determinate" /></div> :
                        <>
                            <div className='grid grid-cols-1 lg:grid-cols-[1fr_3fr] lg:gap-4'>
                                <div className='bg-[#4fd19f] w-full h-fit rounded-lg z-1'>
                                    <img src={docInfo.image} className='h-full w-full' alt="" />
                                </div>
                                <div className='border border-zinc-400 rounded-lg p-8 z-2 flex flex-col -translate-y-16 mx-2 lg:translate-y-0 lg:mx-0 bg-white'>
                                    <h1 className='flex items-center gap-2 text-2xl lg:text-3xl font-medium text-zinc-700'>{docInfo.name} <span><img src={assets.verified_icon} className='w-5' alt="" /></span></h1>
                                    <p className='flex items-center justify-start gap-2 text-zinc-600 mt-1'>{docInfo.degree} - {docInfo.speciality} <span className='py-1 px-2 border border-zinc-200 rounded-2xl text-xs'>{docInfo.experience}</span></p>

                                    <div className='flex flex-col gap-1 text-sm text-zinc-600 mt-4'>
                                        <p className='text-black flex items-center gap-1'>About <span><img src={assets.info_icon} className='w-3' alt="" /></span></p>
                                        <p className='max-w-2xl'>{docInfo.about}</p>
                                    </div>

                                    <p className='text-zinc-800 flex items-center mt-6 font-medium'><span className='text-zinc-600 text-base mr-1'>Appointment fee:</span> ₹{docInfo.fees}</p>
                                </div>
                            </div>

                            <div className='grid grid-cols-1 lg:grid-cols-[1fr_3fr] lg:gap-4 py-0 lg:pt-6 -translate-y-8 lg:translate-y-0'>
                                <div className='w-full'></div>

                                <div className='w-full overflow-hidden'>
                                    <p className='text-zinc-600 font-medium'>Booking Slots</p>
                                    <div className={`flex items-center gap-2 overflow-x-scroll w-full py-2 my-2`}>
                                        {
                                            docSlots.map((item, indx) => {
                                                return <div onClick={() => { setSlotIndex(indx) }} key={indx} className={`border border-zinc-300 shrink-0 w-16 py-6 cursor-pointer rounded-full flex flex-col items-center justify-center ${indx === slotIndex ? 'bg-[#4fd19f] text-white border-0' : 'text-zinc-600 bg-white'}`}>
                                                    <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                                                    <p>{item[0] && item[0].dateTime.getDate()}</p>
                                                </div>
                                            })
                                        }
                                    </div>

                                    <div className='flex items-center gap-2 overflow-x-scroll py-2'>
                                        {
                                            docSlots.length &&
                                            docSlots[slotIndex].map((item, indx) => {
                                                return <p onClick={() => setSlotTime(item.time)} key={indx} className={`border border-zinc-300 px-8 py-2 cursor-pointer rounded-full text-sm flex-shrink-0 ${item.time === slotTime ? 'bg-[#4fd19f] text-white border-0' : 'text-zinc-600 bg-white'}`}>
                                                    {item.time.toLowerCase()}
                                                </p>
                                            })
                                        }
                                    </div>

                                    <button onClick={submitHandler} className='px-24 flex items-center justify-center text-sm w-full lg:w-fit py-3 cursor-pointer bg-[#4fd19f] text-white rounded-full mt-4'>{book_loading ? <div role="status">
                                        <svg aria-hidden="true" class="w-6 h-6 text-[#4fd19f] animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                    </div> : 'Book an appointment'}</button>
                                </div>
                            </div>
                        </>
                }
            </div>
            <RelatedDoctors speciality={docInfo.speciality} docId={docInfo._id} />
        </>
    )
}

export default DocInfo