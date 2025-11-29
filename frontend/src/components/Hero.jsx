import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Hero = () => {

    const { navigate } = useContext(AppContext)

    return (
        <div className='w-full h-fit bg-[#4fd19f] my-3 lg:my-6 rounded-lg px-6 lg:px-20'>
            <div className='pt-6 lg:pt-18'>
                <div className='grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-4 lg:gap-8'>
                    <div className='flex flex-col items-center lg:items-start justify-center gap-4'>
                        <h1 className='text-center lg:text-left lg:leading-14 text-3xl lg:text-5xl text-white font-semibold'>Book Appointment <br /> With Trusted Doctors</h1>
                        <div className='flex flex-col lg:flex-row items-center justify-center text-center lg:text-left lg:gap-4'>
                            <img src={assets.group_profiles} className='w-20 lg:w-28' alt="" />
                            <p className='text-white font-light text-sm lg:text-base'>Simply browse through our extensive list of trusted doctors,
                                schedule your appointment hassle-free.</p>
                        </div>
                            <button onClick={() => navigate('/doctors')} className='cursor-pointer px-6 w-fit flex font-light text-sm items-center gap-2 rounded-full py-3 outline-0 bg-white text-zinc-700 hover:scale-105 transition-all duration-300'><p>Book appointment</p><img src={assets.arrow_icon} className='w-3' alt="" /></button>
                    </div>

                    <div>
                        <img src={assets.header_img} className='' alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero