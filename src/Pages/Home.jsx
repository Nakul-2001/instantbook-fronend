import React from 'react'
import Navbar from '../Components/Navbar'
import Header from '../Components/Header'
import Featured from '../Components/Featured'
import FeaturedProp from '../Components/FeaturedProp'
import PropertyList from '../Components/PropertyList'
import Email from '../Components/Email'
import Footer from '../Components/Footer'

function Home() {
  return (
    <div>
      <Navbar/>
      <Header/>
      <Featured/>
      <PropertyList/>
      <FeaturedProp/>
      <Email/>
      <Footer/>
    </div>
  )
}

export default Home
