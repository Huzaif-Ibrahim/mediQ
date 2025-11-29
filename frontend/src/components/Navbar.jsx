import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const Navbar = () => {

  const [menu, setMenu] = useState(false)
  const [subMenu, setSubMenu] = useState(false)
  const { navigate, token, userData, setUserData, setToken } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setUserData({})
    setToken('')
    navigate('/login')
    toast.info('You have been logged out')
  }

  return (
    <>
      <nav className='py-4 w-full border-b border-zinc-400'>
        <div className='flex items-center justify-between'>
          <NavLink to={'/'}><img src={assets.logo1} alt="" className='w-28' /></NavLink>

          <div className='hidden lg:flex items-center justify-center gap-8 text-sm font-medium tracking-wide'>
            <NavLink to={'/'} className={''}><p className=''>HOME</p> <p className='opacity-0 h-[1.5px] mt-1 w-1/2 mx-auto bg-[#4fd19f]'></p></NavLink>
            <NavLink to={'/doctors'} className={''}><p className=''>ALL DOCTORS</p> <p className='opacity-0 h-[1.5px] mt-1 w-1/2 mx-auto bg-[#4fd19f]'></p></NavLink>
            <NavLink to={'/about'} className={''}><p className=''>ABOUT</p> <p className='opacity-0 h-[1.5px] mt-1 w-1/2 mx-auto bg-[#4fd19f]'></p></NavLink>
            <NavLink to={'/contact'} className={''}><p className=''>CONTACT</p> <p className='opacity-0 h-[1.5px] mt-1 w-1/2 mx-auto bg-[#4fd19f]'></p></NavLink>
            <a href="" className='px-4 py-2 text-[10px] border border-zinc-400 rounded-full'>ADMIN PANEL</a>
          </div>

          {
            token ? <div className='relative group'>
              <div className='hidden lg:flex items-center justify-center gap-2'>
                <img src={userData.image || assets.profile_pic} className='w-8 h-8 object-cover rounded-full' alt="" />
                <img src={assets.dropdown_icon} className='h-2 group-hover:rotate-180 transition-all duration-500' alt="" />
              </div>
              <div className='absolute bg-zinc-50 z-10 hidden group-hover:flex -bottom-34 right-0 shadow-lg p-2 min-w-40 flex-col justify-center items-start'>
                <p onClick={() => navigate('/profile')} className='border-b border-zinc-300 w-full p-2 hover:bg-[#4fd19f] transition-all duration-300 cursor-pointer'>My profile</p>
                <p onClick={() => navigate('/appointments')} className='border-b border-zinc-300 p-2 w-full hover:bg-[#4fd19f] transition-all duration-300 cursor-pointer'>My appointments</p>
                <p onClick={() => logout()} className='w-full p-2 hover:bg-red-500 transition-all duration-300 cursor-pointer'>Logout</p>
              </div>
            </div> : <button onClick={() => navigate('/login')} className='hidden lg:block bg-[#4fd19f] text-white px-8 py-2 cursor-pointer rounded-full font-light'>Create account</button>
          }

          <button onClick={() => setMenu(true)} className='block lg:hidden'><img src={assets.menu_icon} alt="" className='w-6' /></button>
        </div>
      </nav>

      <div className={`lg:hidden h-screen fixed ${menu ? 'right-0' : '-right-full'} top-0 bottom-0 w-full transition-all duration-500 bg-white/70 backdrop-blur-lg z-10 p-4`}>
        <div className='flex items-center justify-between'>
          <img src={assets.logo1} className='w-28' alt="" />
          <img onClick={() => setMenu(false)} src={assets.cross_icon} className='w-8' alt="" />
        </div>
        <div className='py-18 flex flex-col items-center justify-center gap-4 text-lg font-medium tracking-wide'>
          <NavLink to={'/'} onClick={() => setMenu(false)} className={''}><p className=''>HOME</p> <p className='opacity-0 h-[1.5px] mt-1 w-1/2 mx-auto bg-[#4fd19f]'></p></NavLink>
          <NavLink to={'/doctors'} onClick={() => setMenu(false)} className={''}><p className=''>ALL DOCTORS</p> <p className='opacity-0 h-[1.5px] mt-1 w-1/2 mx-auto bg-[#4fd19f]'></p></NavLink>
          <NavLink to={'/about'} onClick={() => setMenu(false)} className={''}><p className=''>ABOUT</p> <p className='opacity-0 h-[1.5px] mt-1 w-1/2 mx-auto bg-[#4fd19f]'></p></NavLink>
          <NavLink to={'/contact'} onClick={() => setMenu(false)} className={''}><p className=''>CONTACT</p> <p className='opacity-0 h-[1.5px] mt-1 w-1/2 mx-auto bg-[#4fd19f]'></p></NavLink>
          <a href="" className='px-4 py-2 text-[10px] border border-zinc-400 rounded-full'>ADMIN PANEL</a>
          {
            token ? <div onClick={() => setSubMenu(!subMenu)} className='relative flex items-center justify-center gap-2'>
              <img src={userData.image || assets.profile_pic} className='w-8 h-8 rounded-full' alt="" />
              <img src={assets.dropdown_icon} className={`h-2 transition-all duration-300 ${subMenu && 'rotate-180'}`} alt="" />
              {
                subMenu && (
                  <div className='absolute font-light z-10 flex -bottom-40 bg-zinc-50 -right-16 shadow-lg p-2 min-w-48 flex-col justify-center items-start'>
                    <p onClick={() => {navigate('/profile'); setMenu(false); setSubMenu(false)}} className='border-b border-zinc-300 w-full p-2 hover:bg-[#4fd19f] transition-all duration-300 cursor-pointer'>My profile</p>
                    <p onClick={() => {navigate('/appointments'); setMenu(false); setSubMenu(false)}} className='border-b border-zinc-300 p-2 w-full hover:bg-[#4fd19f] transition-all duration-300 cursor-pointer'>My appointments</p>
                    <p onClick={() => logout()} className='w-full p-2 hover:bg-red-500 transition-all duration-300 cursor-pointer'>Logout</p>
                  </div>
                )
              }
            </div> :
              <button className='absolute bottom-6 shadow-lg bg-[#4fd19f] text-white px-8 py-2 cursor-pointer rounded-full font-light'>Create account</button>
          }

        </div>
      </div>
    </>
  )
}

export default Navbar