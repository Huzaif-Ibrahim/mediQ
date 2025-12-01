import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';

export const AppContext = createContext()
export const backend_url = import.meta.env.VITE_BACKEND_URL

const AppContextProvider = ({ children }) => {

    const navigate = useNavigate()
    const [doctors, setDoctors] = useState([])
    const [userData, setUserData] = useState({})
    const [token, setToken] = useState('')
    const [loading, setLoading] = useState(false)

    const fetchDoctors = async () => {
      setLoading(true)
      try {
        const response = await axios.get(backend_url + '/api/doctor/list')
        if(response.data.success){
          setDoctors(response.data.doctors)
        }else{
          toast.error(response.data.message)
        }
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }

    const fetchUserData = async () => {
      setLoading(true)
      try {
        const response = await axios.post(backend_url + '/api/user/get-profile',{}, {headers:{token}})
        console.log(response)
        if(response.data.success){
          setUserData(response.data.userData)
        }else{
          toast.error(response.data.message)
        }
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }

    useEffect(() => {
      fetchDoctors()
      if(!token && localStorage.getItem('token')){
        setToken(localStorage.getItem('token'))
      }
      if(token){
        fetchUserData()
      }
    },[token])

    const exports = {
        navigate,
        backend_url,
        doctors,
        token,
        setToken,
        userData,
        setUserData,
        fetchUserData,
        fetchDoctors,
        loading,
        setLoading,
        CircularProgress
    }

  return (
    <AppContext.Provider value={ exports }>
        { children }
    </AppContext.Provider>
  )
}

export default AppContextProvider