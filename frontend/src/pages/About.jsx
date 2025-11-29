import React from 'react'
import { assets } from '../assets/assets'
import Navbar from '../components/Navbar'
import Title from '../components/Title'

const About = () => {
  return (
    <>
      <div className='pb-16 pt-8'>
        <div className='mb-24'>
          <div className='text-2xl text-center mb-4 lg:mb-10'><Title title1={'About'} title2={'us'} /></div>
          <div className='grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 lg:gap-14'>
              <img src={assets.about_image} className='h-full w-full' alt="" />

            <div className='flex flex-col justify-center gap-6 text-zinc-700 text-sm lg:text-base'>
              <p>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
              <p>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
              <b>Our Vision</b>
              <p>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
            </div>
          </div>
        </div>


        <div>
          <div className='text-2xl mb-4 lg:mb-10'><Title title1={'why'} title2={'choose us'} /></div>

          <div className='grid grid-cols-1 lg:grid-cols-3'>
            <div className='group border border-[#ABABAB] p-16 flex flex-col gap-6 hover:bg-[#4fd19f] transition-all duration-500 cursor-pointer hover:text-white'>
              <b className='transition-all duration-500 cursor-pointer group-hover:text-white text-[#2A2A2A]'>Efficiency:</b>
              <p className='transition-all duration-500 cursor-pointer group-hover:text-white text-[#6D6D6D]'>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
            </div>

            <div className='group border-x lg:border border-[#ABABAB] p-16 flex flex-col gap-6 hover:bg-[#4fd19f] transition-all duration-500 cursor-pointer hover:text-white'>
              <b className='transition-all duration-500 cursor-pointer group-hover:text-white text-[#2A2A2A]'>Convenience: </b>
              <p className='transition-all duration-500 cursor-pointer group-hover:text-white text-[#6D6D6D]'>Access to a network of trusted healthcare professionals in your area.</p>
            </div>

            <div className='group border border-[#ABABAB] p-16 flex flex-col gap-6 hover:bg-[#4fd19f] transition-all duration-500 cursor-pointer hover:text-white'>
              <b className='transition-all duration-500 cursor-pointer group-hover:text-white text-[#2A2A2A]'>PERSONALIZATION::</b>
              <p className='transition-all duration-500 cursor-pointer group-hover:text-white text-[#6D6D6D]'>Tailored recommendations and reminders to help you stay on top of your health.</p>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default About