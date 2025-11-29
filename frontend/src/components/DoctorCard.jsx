import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const DoctorCard = ({ doctor }) => {

    const { navigate } = useContext(AppContext)

    return (
        <div onClick={() => navigate('/appointment/'+doctor._id)} className='overflow-hidden w-full h-full rounded-2xl border border-[#4fd19f]/50 flex flex-col cursor-pointer hover:-translate-y-3 transition-all duration-500'>
            <div className='pt-4 bg-[#4fd19f]/20 flex items-end h-fit'>
                <img src={doctor.image} alt="" />
            </div>
            <div className='flex flex-col p-4'>
                <div className='flex items-center gap-2'><div className={`rounded-full h-2 w-2 ${doctor.available ? 'bg-green-500' : 'bg-red-500'}`}></div><p className={`${doctor.available ? 'text-green-500' : 'text-red-500'} text-sm`}>{doctor.available ? 'Available' : 'Unavailable'}</p></div>
                <p className='font-medium text-lg'>{doctor.name}</p>
                <p className='text-sm text-zinc-600'>{doctor.speciality}</p>
            </div>
        </div>
    )
}

export default DoctorCard