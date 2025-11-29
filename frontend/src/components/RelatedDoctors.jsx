import React, { useContext } from 'react'
import DoctorCard from './DoctorCard'
import { AppContext } from '../context/AppContext'

const RelatedDoctors = ({ speciality, docId }) => {

    const { doctors } = useContext(AppContext)

    const filtered_doctors = doctors.filter(elem => {
        return elem.speciality === speciality && elem._id !== docId 
    })

  return filtered_doctors.length > 0 && (
    <div className='mb-18 mt-18 lg:mt-0'>
        <div className='flex flex-col text-center'>
            <h2 className='font-medium text-3xl lg:text-3xl'>Related Doctors</h2>
            <p className='text-sm mt-4'>Simply browse through our extensive list of trusted doctors.</p>
        </div>

        <div className='mt-8 grid grid-cols-2 lg:grid-cols-5 gap-6'>
            {
                filtered_doctors.map((doctor, indx) => {
                    return <DoctorCard key={indx} doctor={doctor} />
                })
            }
        </div>

    </div>
  )
}

export default RelatedDoctors