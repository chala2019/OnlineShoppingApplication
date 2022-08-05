import React from "react"
import "./Header.css"
import Head from "./Head"
import Search from "./Search"
import Navbar from "./Navbar"

const Header = ({ CartItem }) => {
  // create  usestate default false


  return (
    <>

      <Head />
       <Search CartItem={CartItem} />
      <Navbar />
    </>
  )
}

export default Header
