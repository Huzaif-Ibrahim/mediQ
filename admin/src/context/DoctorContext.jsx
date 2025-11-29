import { createContext, useState } from "react"
import axios from 'axios'
import { toast } from 'react-toastify'

export const DoctorContext = createContext()

const DoctorContextProvider = ({ children }) => {

  const backend_url = import.meta.env.VITE_BACKEND_URL

  const [docData, setDocData] = useState({})
  const [appointments, setAppointments] = useState([])
  const [dashData, setDashData] = useState({
    latestAppointments: []
  })
  const [dtoken, setDtoken] = useState(
    localStorage.getItem("dtoken") ? localStorage.getItem("dtoken") : ""
  )

  const [loading, setLoading] = useState(false)

  const getAllAppointments = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(backend_url + '/api/doctor/appointments', { headers: { dtoken } })
      if (data.success) {
        setAppointments(data.appointments)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error("Error while fetching data.")
    } finally {
      setLoading(false)
    }
  }

  const completeAppointments = async (appointmentId) => {
    try {
      const { data } = await axios.post(backend_url + '/api/doctor/complete-appointment', { appointmentId }, { headers: { dtoken } })
      if (data.success) {
        toast.success('Appointment marked as success.')
        getAllAppointments()
        getDashData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error("An error occured.")
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backend_url + '/api/doctor/cancel-appointment', { appointmentId }, { headers: { dtoken } })
      if (data.success) {
        toast.info("Appointment cancelled")
        getAllAppointments()
        getDashData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.message(error.message)
    } finally {
      getAllAppointments()
    }
  }

  const getDashData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(backend_url + '/api/doctor/dashboard', { headers: { dtoken } })
      if (data.success) {
        setDashData(data.dashData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error("Error while fetching data.")
    } finally {
      setLoading(false)
    }
  }

  const getProfileData = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(backend_url + '/api/doctor/profile', { headers: { dtoken } })
      if (data.success) {
        setDocData(data.profileData)
      } else {
        toast.error('Error while fetching data')
      }
    } catch (error) {
      console.log(error.message)
      toast.error('Error while fetching data')
    } finally {
      setLoading(false)
    }
  }

  const changeAvailability = async () => {
    try {
      const { data } = await axios.get(backend_url + '/api/doctor/change-availability', { headers: { dtoken } })
      if (data.success) {
        toast.success('Updated successfully.')
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error("An error occured")
    }
  }

  const exports = {
    dtoken,
    loading,
    setDtoken,
    appointments,
    dashData,
    getAllAppointments,
    completeAppointments,
    cancelAppointment,
    getDashData,
    getProfileData,
    changeAvailability,
    docData
  }

  return (
    <DoctorContext value={exports}>{children}</DoctorContext>
  )
}

export default DoctorContextProvider