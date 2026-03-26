"use client"
import React, { useState } from 'react'
import LoginPage from '../component/LoginPage'
import Link from 'next/link'
import UserForm from '../component/UserForm'
import Image from 'next/image'
import img1 from '../Assets/city.gif'
import last from '../Assets/lastgif.gif'
const page = () => {
  const [Switch,setSwitch] = useState(false);
  return (
    <div className='h-screen w-screen bg-blue-950 opacity-0.8 absolute z-10 top-0'>
    <div className='bg-sky-100 h-[500px] w-[800px] rounded-xl shadow-xl shadow-black relative left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] overflow-hidden'>
      
      <div className='h-full w-100% grid [grid-template-columns:60%_40%]'>
      <div className='bg-sky-600'><Image alt ="" src={last} style={{height:"100%",width:'100%',objectPosition:'center',objectFit:'cover'}}/></div>
      <div>
   {Switch?<UserForm/>:<LoginPage/>}
      {Switch?"":<span className='absolute right-[12%] top-[74%]'>New user?<button className='text-blue-800 font-bold' onClick={()=>{
        setSwitch(!Switch)
      }}>Register</button></span>}
      </div>
      </div>
      
    </div>
    </div>
  )
}

export default page
