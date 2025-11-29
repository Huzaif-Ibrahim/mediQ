import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Navbar from '../components/Navbar'

const Contact = () => {
  return (
    <>
      <div className='pb-16 pt-8 lg:py-16'>
      <div className='mb-24 max-w-4xl mx-auto'>
        <div className='text-2xl text-center mb-4 lg:mb-10'><Title title1={'contact'} title2={'us'} /></div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
          <img src={assets.contact_image} className='h-full w-full' alt="" />

          <div className='flex flex-col text-[#6D6D6D] justify-center gap-4 lg:gap-6'>
            <p className='uppercase text-[#4E4E4E] text-xl font-medium'>Our Office</p>

            <div className='flex flex-col gap-1'>
              <p>54709 Willms Station</p>
              <p>Suite 350, Washington, USA</p>
            </div>

            <div className='flex flex-col gap-1 mb-4'>
              <p>Tel: (415) 555‑0132</p>
              <p>Email: i.huzaif.ibrahim@gmail.com</p>
            </div>

            <p className='uppercase text-[#4E4E4E] text-xl font-medium'>Careers at mediQ</p>

            <p>Learn more about our teams and job openings.</p>

            <button className='cursor-pointer py-4 px-8 border border-black w-fit text-black hover:bg-black hover:text-white transition-all duration-300'>Explore Jobs</button>
          </div>

        </div>
      </div>


    </div>

    </>
  )
}

export default Contact