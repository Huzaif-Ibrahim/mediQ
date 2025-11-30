import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { backend_url } from '../../context/context'
import { useEffect } from 'react'
import { assets } from '../../../../frontend/src/assets/assets'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';

const DoctorProfile = () => {

  const { getProfileData, docData, loading, changeAvailability, dtoken } = useContext(DoctorContext)

  const [submitLoading, setSubmitLoading] = useState(false)
  const [edit, setEdit] = useState(false)
  const [fees, setFees] = useState(0)
  const [available, setAvailable] = useState(docData?.available)
  const [address, setAddress] = useState({
    line1: '',
    line2: ''
  })

  const updateProfile = async (e) => {
    e.preventDefault()
    setSubmitLoading(true)

    try {
      const formdata = new FormData()
      formdata.append('fees', fees)
      formdata.append('address', JSON.stringify(address))
      formdata.append('available', available)
      const { data } = await axios.post(backend_url + '/api/doctor/update-profile', formdata, { headers: { dtoken } })
      if (data.success) {
        toast.success(data.message)
        setEdit(false)
        getProfileData()
        setFees(0)
        setAddress({
          line1: '',
          line2: ''
        })
        setAvailable(docData?.available)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error('Something went wrong')
    } finally {
      setSubmitLoading(false)
    }
  }

  useEffect(() => {
    getProfileData()
  }, [])

  return (
    <div className='p-4 lg:p-8 bg-[#4fd19f]/5 h-[calc(100vh-64px)] w-full overflow-y-scroll pb-16 lg:pb-0'>
      <p className='text-zinc-900 font-medium mb-6'>Profile</p>

      {
        loading ? <div className='w-full h-full flex items-center justify-start'><CircularProgress varient="determinate" /></div> :
          <div className='w-full lg:w-[600px] flex flex-col items-start justify-center gap-4'>
            <div className='w-full h-full lg:w-[300px] lg:h-[300px] bg-[#4fd19f] rounded-lg'>
              <img src={docData.image} className='h-full w-full' alt="" />
            </div>

            <div className='rounded-lg bg-white p-6 flex flex-col items-start justify-start'>
              <h1 className='flex items-center gap-2 text-2xl lg:text-3xl font-medium text-zinc-700'>{docData.name} <span><img src={assets.verified_icon} className='w-5' alt="" /></span></h1>
              <p className='flex items-center justify-start gap-2 text-zinc-600 mt-1'>{docData.degree} - {docData.speciality} <span className='py-1 px-2 border border-zinc-200 rounded-2xl text-xs'>{docData.experience}</span></p>

              <div className='flex flex-col gap-1 text-sm text-zinc-600 mt-4'>
                <p className='text-black flex items-center gap-1'>About <span><img src={assets.info_icon} className='w-3' alt="" /></span></p>
                <p className='max-w-2xl'>{docData.about}</p>
              </div>

              <div className='flex items-center mt-6'>
                <p className='text-zinc-600 text-base mr-1 font-medium'>Fees:</p>
                {
                  !edit ?
                    <p className='text-zinc-700  font-medium'> ₹{docData.fees}</p> :
                    <input type="number" onChange={(e) => setFees(e.target.value)} className='w-full ml-4 outline-0 p-2 border rounded bg-zinc-50 mt-4 border-zinc-300' required />
                }
              </div>

              <div className='flex items-start justify-start mt-3 text-zinc-600 font-medium '>
                <p className='text-base mr-4'>Address:</p>
                <div className='flex flex-col items-start justify-start gap-1'>
                  {
                    !edit ?
                      <>
                        <p className='text-zinc-700'>{docData?.address?.line1}</p>
                        <p className='text-zinc-700'>{docData?.address?.line2}</p>
                      </> :
                      <>
                        <input value={address.line1} onChange={(e) => setAddress(prev => ({ ...prev, line1: e.target.value }))} type="text" className='w-full outline-0 p-1 border rounded bg-zinc-50 border-zinc-300' placeholder='City and landmark' required />
                        <input value={address.line2} onChange={(e) => setAddress(prev => ({ ...prev, line2: e.target.value }))} type="text" className='w-full outline-0 p-1 border rounded bg-zinc-50 border-zinc-300' placeholder='Country' />
                      </>
                  }
                </div>
              </div>

              <form className='flex items-center text-sm text-zinc-600 gap-2 mt-2'>
                {
                  !edit ?
                    <input onClick={() => changeAvailability()} type="checkbox" defaultChecked={docData.available} /> :
                    <input type="checkbox" onChange={(e) => setAvailable(e.target.checked)} />
                }
                <p>Available</p>
              </form>

              <button onClick={(e) => { !edit ? setEdit(true) : updateProfile(e) }} className='cursor-pointer mt-8 px-6 py-1 bg-white text-zinc-800 border border-zinc-800 rounded-full'>
                {
                  submitLoading ? <CircularProgress size={15} /> : edit ? 'Save' : 'Edit'
                }
              </button>

            </div>
          </div>
      }
    </div>
  )
}

export default DoctorProfile