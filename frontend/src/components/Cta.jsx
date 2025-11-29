import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Cta = () => {

    const { navigate } = useContext(AppContext)

    return (
        <>
            <div className='mt-16 mb-24 bg-[#4fd19f] lg:h-86 relative w-full rounded-lg flex flex-col lg:flex-row lg:items-center justify-between'>
                <div className="flex flex-col gap-4 p-6 lg:px-16 lg:py-12">
                    <h1 className='text-left lg:leading-14 text-xl lg:text-5xl text-white font-semibold'>Book Appointment <br /> With 100+ Trusted Doctors</h1>
                    <button onClick={()=>navigate('/login')} className='cursor-pointer px-6 w-fit flex font-light text-sm items-center gap-2 rounded-full py-3 outline-0 bg-white text-zinc-700 hover:scale-105 transition-all duration-300'>Create Account</button>
                </div>

                <div className='hidden lg:block'>
                    <img src={assets.appointment_img} className='h-98 absolute bottom-0 right-16' alt="" />
                </div>
            </div>
        </>
    )
}

export default Cta