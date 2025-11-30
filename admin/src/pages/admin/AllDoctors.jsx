import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/context'

const AllDoctors = () => {

  const { doctors, getAllDoctors, changeAvailability, atoken, loading } = useContext(AdminContext)
  const { CircularProgress } = useContext(AppContext)

  useEffect(() => {
    getAllDoctors()
  }, [atoken])

  return (
    <div className='p-4 lg:p-8 bg-[#4fd19f]/5 h-[calc(100vh-64px)] w-full overflow-y-scroll pb-8 lg:pb-0'>
      <p className='text-zinc-900 font-medium mb-6'>All Doctors</p>

      {loading ? <div className='w-full h-full flex items-center justify-center'><CircularProgress varient="determinate" /></div> : <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-6 lg:mt-0'>
        {
          doctors.map((item, indx) => {
            return <div key={indx} className='overflow-hidden w-full h-90 rounded-2xl border border-[#4fd19f]/50 flex flex-col cursor-pointer hover:-translate-y-3 transition-all duration-500'>
              <div className='pt-4 bg-[#4fd19f]/20 flex items-end h-fit'>
                <img src={item.image} alt="" />
              </div>
              <div className='flex flex-col justify-between h-full p-4'>
                <div>
                  <p className='font-medium text-lg'>{item.name}</p>
                  <p className='text-sm text-zinc-600'>{item.speciality}</p>
                </div>
                <form className='flex items-center text-sm text-zinc-600 gap-2 mt-2'>
                  <input onClick={() => changeAvailability(item._id)} type="radio" checked={item.available} />
                  <p>Available</p>
                </form>
              </div>
            </div>
          })
        }
      </div>
      }
    </div>
  )
}

export default AllDoctors