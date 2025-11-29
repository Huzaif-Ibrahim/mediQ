import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { specialityData } from '../assets/assets'
import DoctorCard from '../components/DoctorCard'
import { AppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'

const Doctors = () => {

  const { navigate, doctors } = useContext(AppContext)
  const { speciality } = useParams()


  const filterDoctors = doctors.filter(elem => {
    return speciality ? elem.speciality === speciality : elem
  })

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])


  return (
    <>
      <div className='min-h-screen mt-6 mb-32'>
        <p className='text-zinc-600'>Browse through the doctors specialist.</p>

        <div className='flex flex-col lg:flex-row lg:items-start gap-4 my-4 w-full'>
          <div className='flex flex-wrap justify-center lg:flex-col w-full gap-2 lg:max-w-48'>
              <div onClick={() => navigate('/doctors')} className={`w-fit lg:w-full text-left cursor-pointer border rounded-lg p-2 px-6 text-sm ${!speciality ? 'bg-[#4fd19f]/20 border-[#4fd19f]/30 text-black' : 'bg-white text-zinc-600 border-zinc-300'}`}><p>All</p></div>

            {
              specialityData.map((item, indx) => {
                return <div key={indx} onClick={() => navigate(`/doctors/${item.speciality}`)} className={`w-fit lg:w-full text-left cursor-pointer border rounded-lg p-2 text-sm ${speciality == item.speciality ? 'bg-[#4fd19f]/20 border-[#4fd19f]/30 text-black' : 'bg-white text-zinc-600 border-zinc-300'}`}><p>{item.speciality}</p></div>
              })
            }
          </div>

          {
            filterDoctors.length > 0 ? <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6 lg:mt-0'>
            {
                filterDoctors.map((doctor, indx) => {
                    return <DoctorCard key={indx} doctor={doctor} />
                })
            }
          </div> : <p className='text-zinc-600'>Sorry, No doctor available!</p>
          }
        </div>
      </div>
    </>
  )
}

export default Doctors