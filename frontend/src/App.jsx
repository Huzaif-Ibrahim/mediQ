import React, { useContext } from 'react'
import { AppContext } from './context/AppContext'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Doctors from './pages/Doctors'
import About from './pages/About'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import DocInfo from './pages/DocInfo'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Appointments from './pages/Appointments'
import Profile from './pages/Profile'

const App = () => {

  return (
    <>
      <div className='max-w-7xl mx-auto px-4 lg:px-0'>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/appointment/:docId' element={<DocInfo />} />
          <Route path='/login' element={<Login />} />
          <Route path='/appointments' element={<Appointments />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App