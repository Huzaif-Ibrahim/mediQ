import React, { useContext } from 'react'
import { assets, specialityData } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const SpecialityMenu = () => {

    const { navigate } = useContext(AppContext)

  return (
    <div className='py-16 lg:py-12 flex flex-col items-center justify-center text-zinc-800'>
        <div className='flex flex-col text-center'>
            <h2 className='font-medium text-3xl lg:text-3xl'>Find by Speciality</h2>
            <p className='text-sm mt-4'>Simply browse through our extensive list of trusted doctors,<br/> schedule your appointment hassle-free.</p>
        </div>

        <div className='mt-8 grid grid-cols-3 grid-rows-2 lg:grid-cols-6 lg:grid-rows-1 gap-2 space-y-8'>
            {
                specialityData.map((item, indx) => {
                    return <div onClick={() => navigate('/doctors/'+item.speciality)} key={indx} className='flex flex-col items-center gap-1 cursor-pointer hover:-translate-y-3 transition-all duration-500'>
                        <img src={item.image} alt="" className='w-20 lg:w-22' />
                        <p className='text-xs lg:text-sm'>{item.speciality}</p>
                    </div>
                })
            }
        </div>
    </div>
  )
}

export default SpecialityMenu