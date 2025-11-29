import axios from "axios"
import { createContext, useState } from "react"
import { toast } from "react-toastify"

export const AdminContext = createContext()

const AdminContextProvider = ({children}) => {

    const backend_url = import.meta.env.VITE_BACKEND_URL

    const [doctors, setDoctors] = useState([])
    const [appointments, setAppointments] = useState([])
    const [dashboardData, setDashboardData] = useState({})
    const [atoken, setAtoken] = useState(
        localStorage.getItem("atoken") ? localStorage.getItem("atoken") : ""
    )

    const [loading, setLoading] = useState(false)

    const getAllDoctors = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(backend_url + "/api/admin/all-doctors", {headers:{atoken}})
            if(data.success){
                setDoctors(data.doctors)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const getAllAppointments = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(backend_url + '/api/admin/appointments', {headers:{atoken}})
            if(data.success){
                setAppointments(data.appointments)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error('Error while fetching doctors.')
        } finally {
            setLoading(false)
        }
    }

    const dashData = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(backend_url + '/api/admin/dashboard', {headers:{atoken}})
            if(data.success){
                setDashboardData(data.dashData)
            }else{
                toast.error("Error while fetching data")
                console.log(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }

    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(backend_url + '/api/admin/change-availability', { docId }, {headers:{atoken}})
            if(data.success){
                toast.success('Updated successfully.')
                getAllDoctors()
            }else{
                toast.error("An error occured")
            }
        } catch (error) {
            console.log(error.message)
            toast.error("An error occured")
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backend_url + '/api/admin/cancel-appointment', {appointmentId}, {headers:{atoken}})
            if(data.success){
                toast.success(data.message)
                getAllAppointments()
                dashData()
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const exports = {
        getAllDoctors,
        doctors,
        atoken,
        setAtoken,
        getAllAppointments,
        appointments,
        dashData,
        dashboardData,
        changeAvailability,
        cancelAppointment,
        loading,
    }

  return (
    <AdminContext value={exports}>{children}</AdminContext>
  )
}

export default AdminContextProvider