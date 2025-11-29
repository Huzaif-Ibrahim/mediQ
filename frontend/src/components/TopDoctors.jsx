import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import DoctorCard from './DoctorCard'

const TopDoctors = () => {

    const { navigate, doctors } = useContext(AppContext)

  return (
    <div className='px-4 lg:px-0 py-16 lg:py-12 flex flex-col items-center justify-center text-zinc-800'>
        <div className='flex flex-col text-center'>
            <h2 className='font-medium text-3xl lg:text-3xl'>Top Doctors to Book</h2>
            <p className='text-sm mt-4'>Simply browse through our extensive list of trusted doctors.</p>
        </div>

        <div className='mt-8 grid grid-cols-1 lg:grid-cols-5 gap-6'>
            {
                doctors.slice(0,10).map((doctor, indx) => {
                    return <DoctorCard key={indx} doctor={doctor} />
                })
            }
        </div>

        <button onClick={() => navigate('/doctors')} className='mt-16 bg-[#4fd19f]/30 cursor-pointer px-12 py-3 rounded-full'>more</button>
    </div>
  )
}

export default TopDoctors