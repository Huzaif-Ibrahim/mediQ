import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='w-full flex flex-col'>
        <div className='py-8 w-full flex flex-col lg:flex-row items-start justify-between'>
            <div className='flex flex-col max-w-md'>
                <img src={assets.logo1} className='w-36 mb-4' alt="" />
                <p className='text-zinc-700 font-light text-sm lg:text-base'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt quo exercitationem voluptate error voluptas dolorem. Dignissimos a reprehenderit dolorum, alias quas illum necessitatibus eius maxime pariatur dicta cupiditate nemo iure.</p>
            </div>  

            <div className="mt-8 lg:mt-0 flex flex-col lg:flex-row gap-12 lg:gap-48">
                <div className='flex flex-col'>
                    <h6 className='text-xl font-medium mb-4'>COMPANY</h6>
                    <ul className='flex flex-col gap-2'>
                        <li><a className='text-zinc-700 font-light text-sm lg:text-base' href="/">Home</a></li>
                        <li><a className='text-zinc-700 font-light text-sm lg:text-base' href="/about">About us</a></li>
                        <li><a className='text-zinc-700 font-light text-sm lg:text-base' href="#">Delivery</a></li>
                        <li><a className='text-zinc-700 font-light text-sm lg:text-base' href="#">Privacy policy</a></li>
                    </ul>
                </div>
                <div className='flex flex-col'>
                    <h6 className='text-xl font-medium mb-4'>GET IN TOUCH</h6>
                    <ul className='flex flex-col gap-2'>
                        <li><p className='text-zinc-700 font-light text-sm lg:text-base'>+91 96068 94825</p></li>
                        <li><p className='text-zinc-700 font-light text-sm lg:text-base'>i.huzaif.ibrahim@gmail.com</p></li>
                    </ul>
                </div>
            </div>
        </div>


        <div className='w-full border-t border-zinc-200 flex items-center justify-center py-4'>
            <p className='text-black text-center font-light text-sm lg:text-base'>Copyright 2025 @ huzaif-two.vercel.app - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer