import React, { useContext } from 'react'
import { useState } from 'react'
import { assets, specialityData } from '../../assets/assets'
import { useRef } from 'react'
import axios from 'axios'
import { backend_url } from '../../context/context'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'

const AddDoctor = () => {

  const { atoken } = useContext(AdminContext)

  const imageRef = useRef(null)
  const imageSetter = () => {
    imageRef.current.click()
  }

  const [file, setFile] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('')
  const [fees, setFees] = useState('')
  const [speciality, setSpeciality] = useState('')
  const [education, setEducation] = useState('')
  const [about, setAbout] = useState('')
  const [address, setAddress] = useState({
    line1: '',
    line2: ''
  })
  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formdata = new FormData()
      formdata.append('image', file)
      formdata.append('name',name)
      formdata.append('email',email)
      formdata.append('password',password)
      formdata.append('speciality',speciality)
      formdata.append('degree',education)
      formdata.append('experience',experience)
      formdata.append('about', about)
      formdata.append('fees',fees)
      formdata.append('address',JSON.stringify(address))

      const { data } = await axios.post(backend_url + '/api/admin/add-doctor', formdata, {headers:{atoken}})
      if(data.success){
        toast.success("Doctor added successfully.")
        setFile(false)
        setName('')
        setEmail('')
        setPassword('')
        setExperience('')
        setFees('')
        setSpeciality('')
        setEducation('')
        setAbout('')
        setAddress({
          line1: '',
          line2: ''
        })
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error.message)
      toast.info('Refresh the page')
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className='p-4 lg:p-8 bg-[#4fd19f]/5 h-[calc(100vh-64px)] w-full overflow-y-scroll pb-16 lg:pb-0'>
      <p className='text-zinc-900 font-medium mb-6'>Add Doctor</p>

      <form onSubmit={(e) => onSubmitHandler(e)} className='w-full lg:w-[900px] text-zinc-600 bg-white border border-zinc-300 p-8 rounded-lg flex flex-col items-start justify-start gap-4'>

        {/* Profile photo */}
        <div className=' flex items-center justify-start gap-4 mb-4 cursor-pointer'>
          <input onChange={(e) => setFile(e.target.files[0])} ref={imageRef} type="file" name='image' id="image" className='hidden' />
          <img onClick={()=>imageSetter()} src={file ? URL.createObjectURL(file) : assets.Dummy} className={`w-20 h-20 rounded-full object-center ${file ? 'object-cover':'object-contain bg-zinc-100 p-4'}`} alt="" />

          <p className='text-sm lg:text-base'>Upload doctor <br />picture</p>
        </div>

        {/* Inputs */}

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 w-full'>

          <div className='flex flex-col items-start gap-4 w-full'>
            <div className='flex flex-col items-start gap-1 lg:gap-2 w-full'>
              <p className='text-sm lg:text-base'>Doctor name</p>
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" className='p-2 w-full bg-white border border-zinc-300 rounded outline-0' required placeholder='Name' />
            </div>

            <div className='flex flex-col items-start gap-1 lg:gap-2 w-full'>
              <p className='text-sm lg:text-base'>Doctor Email</p>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className='p-2 w-full bg-white border border-zinc-300 rounded outline-0' required placeholder='Email'/>
            </div>

            <div className='flex flex-col items-start gap-1 lg:gap-2 w-full'>
              <p className='text-sm lg:text-base'>Password</p>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className='p-2 w-full bg-white border border-zinc-300 rounded outline-0' required placeholder='Password'/>
            </div>

            <div className='flex flex-col items-start gap-1 lg:gap-2 w-full'>
              <p className='text-sm lg:text-base'>Experience</p>
              <select value={experience} onChange={(e) => setExperience(e.target.value)} name="experience" id="" className='p-3 w-full bg-white border border-zinc-300 rounded outline-0'>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5 Years">5 Years</option>
                <option value="6 Years">6 Years</option>
                <option value="7 Years">7 Years</option>
              </select>
            </div>

            <div className='flex flex-col items-start gap-1 lg:gap-2 w-full'>
              <p className='text-sm lg:text-base'>Fees</p>
              <input value={fees} onChange={(e) => setFees(e.target.value)} type="number" className='p-2 w-full bg-white border border-zinc-300 rounded outline-0' required placeholder="Enter fees" />
            </div>
          </div>

          <div className='flex flex-col items-center justify-start gap-4 w-full'>

            <div className='flex flex-col items-start gap-1 lg:gap-2 w-full'>
              <p className='text-sm lg:text-base'>Speciality</p>
              <select value={speciality} onChange={(e) => setSpeciality(e.target.value)} name="experience" id="" className='p-2 w-full bg-white border border-zinc-300 rounded outline-0'>
                {
                  specialityData.map((item,indx) => {
                    return <option key={indx} value={item.speciality}>{item.speciality}</option>
                  })
                }
              </select>
            </div>

            <div className='flex flex-col items-start w-full gap-1 lg:gap-2'>
              <p className='text-sm lg:text-base'>Education</p>
              <input value={education} onChange={(e) => setEducation(e.target.value)} type="text" className='p-2 w-full bg-white border border-zinc-300 rounded outline-0' required placeholder='Education'/>
            </div>

            <div className='flex flex-col items-start gap-1 lg:gap-2 w-full'>
              <p className='text-sm lg:text-base'>Address</p>
              <div className='flex flex-col w-full gap-2'>
                <input value={address.line1} onChange={(e) => setAddress((prev) => ({...prev,line1:e.target.value}))} type="text" className='p-2 w-full bg-white border border-zinc-300 rounded outline-0' required placeholder='house no. and street name' />
                <input value={address.line2} onChange={(e) => setAddress((prev) => ({...prev,line2:e.target.value}))} type="text" className='p-2 w-full bg-white border border-zinc-300 rounded outline-0' required placeholder='City and state'/>
              </div>
            </div>

            <div className='flex flex-col items-start w-full gap-1 lg:gap-2'>
              <p className='text-sm lg:text-base'>About</p>
              <textarea value={about} onChange={(e) => setAbout(e.target.value)} type="text" className='p-2 w-full bg-white border border-zinc-300 rounded outline-0' required placeholder='About doctor'></textarea>
            </div>

          </div>

        </div>

        <button type="submit" className='lg:w-30 h-12 flex items-center justify-center w-full rounded-full text-white bg-[#4fd19f] mt-6 cursor-pointer'>{
            loading ? <svg fill="white" className='h-5 w-auto' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/></path></svg> : 'Add Doctor'
          }</button>

      </form>
    </div>
  )
}

export default AddDoctor