import React, { useContext } from 'react'
import { AppContext } from './context/context'
import { ToastContainer } from 'react-toastify'
import { DoctorContext } from './context/DoctorContext'
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from './pages/admin/AdminDashboard'
import AllDoctors from './pages/admin/AllDoctors'
import AllAppointments from './pages/admin/AllAppointments'
import AddDoctor from './pages/admin/AddDoctor'
import DoctorDashboard from './pages/doctor/DoctorDashboard'
import DoctorAppointments from './pages/doctor/DoctorAppointments'
import DoctorProfile from './pages/doctor/DoctorProfile'
import Welcome from './pages/Welcome'

const App = () => {

  const { dtoken } = useContext(DoctorContext)
  const { atoken } = useContext(AdminContext)

  return (
    <>
      {
        dtoken || atoken ? <>
          <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          draggable={false}
          theme="light"
          toastClassName={() =>
            "bg-white shadow-md flex items-center rounded-md text-gray-800 text-sm px-3 py-2 mt-2"
          }
          />
          <Navbar />
          <div className='w-full flex items-start h-[calc(100vh-76px)] overflow-hidden'>
            <Sidebar />
            <Routes>
              {/* Admin Routes */}
              <Route path='/' element={<Welcome />} />
              <Route path='/admin-dashboard' element={<AdminDashboard />}/>
              <Route path='/all-appointments' element={<AllAppointments/>}/>
              <Route path='/add-doctor' element={<AddDoctor />}/>
              <Route path='/all-doctors' element={<AllDoctors/>}/>

              {/* Doctor Routes */}
              <Route path='/doctor-dashboard' element={<DoctorDashboard />}/>
              <Route path='/doctor-appointments' element={<DoctorAppointments/>}/>
              <Route path='/doctor-profile' element={<DoctorProfile/>}/>
            </Routes>
          </div>
        </> : <>
          <ToastContainer />
          <Login />
        </>
      }
    </>
  )
}

export default App