import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const Login = () => {

    const { navigate, backend_url, setToken, token } = useContext(AppContext)

    const [login, setLogin] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (login) {
                try {
                    const response = await axios.post(backend_url + '/api/user/login', { email, password })
                    if (response.data.success) {
                        setToken(response.data.token)
                        localStorage.setItem('token', response.data.token)
                        toast.success('Logged in successfully!')
                        setEmail('')
                        setPassword('')
                    } else {
                        toast.error(response.data.message)
                    }
                } catch (error) {
                    toast.error(error.message)
                }
            } else {
                try {
                    const response = await axios.post(backend_url + '/api/user/register', { name, email, password })
                    if (response.data.success) {
                        setToken(response.data.token)
                        localStorage.setItem('token', response.data.token)
                        toast.success('Registered successfully!')
                        setEmail('')
                        setPassword('')
                        setName('')
                    } else {
                        toast.error(response.data.message)
                    }
                } catch (error) {
                    toast.error(error.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        window.scrollTo(0,0)
    },[])

    return (
        <>
            <div className='min-h-screen flex items-center justify-center'>
                <form onSubmit={(e) => handleSubmit(e)} className='h-fit w-full max-w-96 text-sm text-zinc-600 p-8 rounded-xl shadow-lg border border-zinc-200 flex flex-col items-start justify-center gap-4'>
                    <h2 className='text-2xl font-medium'>{login ? 'Login' : 'Create Account'}</h2>
                    <p>{login ? 'Please log in to book appointment' : 'Please sign up to book an appointment'}</p>

                    <div className={`flex-col items-start justify-center w-full gap-1 ${login ? 'hidden' : 'flex'}`}>
                        <p>Full Name</p>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className='w-full border border-zinc-300 p-2 rounded-sm outline-0' disabled={login} required />
                    </div>

                    <div className='flex flex-col items-start justify-center w-full gap-1'>
                        <p>Email</p>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className='w-full border border-zinc-300 p-2 rounded-sm outline-0' required />
                    </div>

                    <div className='flex flex-col items-start justify-center w-full gap-1'>
                        <p>Password</p>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className='w-full border border-zinc-300 p-2 rounded-sm outline-0' required />
                    </div>

                    <button disabled={loading} type="submit" className='w-full cursor-pointer outline-0 py-2 text-base text-center flex items-center justify-center text-white bg-[#4fd19f] rounded-sm'>{!loading ? (login ? 'Login' : 'Create Account') :
                        <div role="status">
                            <svg aria-hidden="true" className="w-6 h-6 text-[#4fd19f] animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div>
                    }</button>

                    <p className=''>{login ? 'Create an new account? ' : 'Already have an account?'} <span className='underline text-blue-500 cursor-pointer' onClick={() => setLogin(!login)}>{login ? 'click here' : 'login here'}</span></p>
                </form>
            </div>
        </>
    )
}

export default Login