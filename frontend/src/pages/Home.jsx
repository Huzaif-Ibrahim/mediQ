import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Cta from '../components/Cta'
import Footer from '../components/Footer'
import { AppContext } from '../context/AppContext'

const Home = () => {

  const { token } = useContext(AppContext)

  return (
    <>
        <Hero />
        <SpecialityMenu />
        <TopDoctors />
        {!token && <Cta />}
    </>
  )
}

export default Home