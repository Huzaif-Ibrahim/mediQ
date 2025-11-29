import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { toast } from 'react-toastify'

const Navbar = () => {

    const navigate = useNavigate()
    const { setAtoken, atoken } = useContext(AdminContext)
    const { setDtoken, dtoken } = useContext(DoctorContext)

  return (
    <nav className='p-4 border-b border-zinc-300'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center justify-center gap-2'>
              <img src={assets.logo1} onClick={() => navigate('/')} className='w-28 cursor-pointer' alt="" />
              <div className='px-2 py-1 text-[10px] border border-zinc-400 rounded-full'>
                {
                  atoken ? <p>Admin</p> : dtoken ? <p>Doctor</p> : null
                }
              </div>
            </div>
            <button onClick={() => { 
              if(atoken){
                setAtoken('')
                localStorage.removeItem('atoken')
                navigate('/')
                toast.info('Logged out')
              }else{
                setDtoken('')
                localStorage.removeItem('dtoken')
                navigate('/')
                toast.info('Logged out')
              }
             }} className='bg-[#4fd19f] rounded-full px-6 py-2 text-white cursor-pointer'>Logout</button>
        </div>
    </nav>
  )
}

export default Navbar