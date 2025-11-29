import React, { useContext, useRef, useState } from 'react'
import { AppContext, backend_url } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Profile = () => {

    const { userData, token, fetchUserData } = useContext(AppContext)
    const [edit, setEdit] = useState(false)
    const [loading, setLoading] = useState(false)

    const [file, setFile] = useState(false)
    const [name, setName] = useState(userData?.name)
    const [email, setEmail] = useState(userData?.email)
    const [phone, setPhone] = useState(userData?.phone)
    const [gender, setGender] = useState(userData?.gender)
    const [dob, setDob] = useState(userData?.dob)
    const [address, setAddress] = useState({
        line1: userData?.address?.line1,
        line2: userData?.address?.line2
    })

    const fileInputRef = useRef(null)

    const imagePicker = () => {
        fileInputRef.current.click()
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {

            const formData = new FormData()
            formData.append('image', file)
            formData.append('email', email)
            formData.append('name', name)
            formData.append('phone', phone)
            formData.append('gender', gender)
            formData.append('dob', dob)
            formData.append('address', JSON.stringify(address))

            const { data } = await axios.post(backend_url + '/api/user/update-profile', formData, {headers:{token}})
            if(data.success){
                toast.success(data.message)
                setFile(null)
                fetchUserData()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen py-6'>
            <div className='flex flex-col max-w-xl'>
                <div className='overflow-hidden'>
                    {
                        edit ? <><input ref={fileInputRef} className='hidden' id='upload' name='image' type="file" onChange={(e) => setFile(e.target.files[0])} required />
                        <div className='w-full flex items-center gap-4'>
                            <img src={!file ? userData.image : URL.createObjectURL(file)} className='max-w-32 w-full h-full' alt="" />
                            <div className='p-2 bg-zinc-600 rounded-full'>
                                <img onClick={imagePicker} src={assets.upload_icon} className='cursor-pointer w-6' alt="" />
                            </div>
                        </div>
                        </> : <img src={userData.image} className='h-full w-full max-w-32 rounded' alt="" />
                    }
                </div>
                {
                    edit ? <input value={name} onChange={(e) => setName(e.target.value)} type="text" className='outline-0 p-2 border rounded bg-zinc-50 mt-4 border-zinc-300' placeholder='Name' required /> : <h2 className='mt-4 pb-1 border-b border-zinc-400 font-medium text-zinc-800 text-2xl'>{userData.name}</h2>
                }
                <div className='flex flex-col gap-4 py-4'>
                    <p className='underline text-zinc-500 uppercase text-sm'>Contect information</p>
                    <div className='grid grid-cols-2 items-center gap-4'>
                        <p className='text-zinc-600'>Email id:</p>
                        {
                            edit ? <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className='outline-0 p-1 border rounded bg-zinc-50 border-zinc-300 text-zinc-500' placeholder='Email' required /> :
                                <p className='text-blue-500'>{userData.email}</p>
                        }
                    </div>
                    <div className='grid grid-cols-2 items-center gap-4'>
                        <p className='text-zinc-600'>Phone:</p>
                        {
                            edit ? <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" className='outline-0 p-1 border rounded bg-zinc-50 border-zinc-300 text-zinc-500' placeholder='Phone' required /> :
                                <p className='text-blue-500'>{userData.phone}</p>
                        }
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <p className='text-zinc-600'>Address:</p>
                        <div className='flex flex-col gap-1 text-zinc-500'>
                            {
                                edit ? <>
                                    <input value={address.line1} onChange={(e) => setAddress(prev => ({ ...prev, line1: e.target.value }))} type="text" className='outline-0 p-1 border rounded bg-zinc-50 border-zinc-300' placeholder='City and landmark' required />
                                    <input value={address.line2} onChange={(e) => setAddress(prev => ({ ...prev, line2: e.target.value }))} type="text" className='outline-0 p-1 border rounded bg-zinc-50 border-zinc-300' placeholder='Country' />
                                </> :
                                    <div className='flex flex-col gap-1'>
                                        <p>{userData?.address?.line1}</p>
                                        <p>{userData?.address?.line2}</p>
                                    </div>
                            }

                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-4 py-4'>
                    <p className='underline text-zinc-500 uppercase text-sm'>Basic Information</p>
                    <div className='grid grid-cols-2 items-center gap-4'>
                        <p className='text-zinc-600'>Gender:</p>
                        {
                            edit ? <select name='gender' onChange={(e) => setGender(e.target.value)} className='text-zinc-600 outline-0 p-1 border rounded bg-zinc-50 border-zinc-300'>
                                <option value="N/A">N/A</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select> :
                                <p className='text-blue-500'>{userData.gender}</p>
                        }
                    </div>
                    <div className='grid grid-cols-2 items-center gap-4'>
                        <p className='text-zinc-600'>Birthday:</p>
                        {
                            edit ? <input value={dob} onChange={(e) => setDob(e.target.value)} type="date" className='outline-0 p-1 border rounded bg-zinc-50 border-zinc-300 text-zinc-600' required /> :
                                <p className='text-blue-500'>{userData.dob}</p>
                        }
                    </div>
                </div>

                {
                    edit ? <button type='submit' onClick={(e) =>{ setEdit(false); submitHandler(e)}} className='outline-0 cursor-pointer px-12 mt-8 py-2 bg-[#4fd19f] rounded-full text-white w-fit'>
                        Save information
                    </button> : loading ? <div className='px-12 mt-8 py-2 border border-[#4fd19f] flex items-center justify-center rounded-full w-fit'>
                        <div role="status">
                            <svg aria-hidden="true" class="w-6 h-6 text-[#4fd19f] animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div>
                    </div> : <button onClick={() => setEdit(true)} className='outline-0 cursor-pointer px-12 mt-8 py-2 border border-[#4fd19f] rounded-full text-zinc-600 w-fit'>
                        Edit
                    </button>
                }
            </div>
        </div>
    )
}

export default Profile