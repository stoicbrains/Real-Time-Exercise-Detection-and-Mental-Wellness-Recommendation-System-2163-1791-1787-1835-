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
    <div className='bg-sky-100 min-h-[500px] w-[90%] max-w-[800px] rounded-xl shadow-xl shadow-black relative left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] overflow-hidden flex flex-col'>
      
      <div className='flex-grow w-full grid grid-cols-1 md:grid-cols-[60%_40%]'>
      <div className='hidden md:block bg-sky-600'><Image alt ="" src={last} style={{height:"100%",width:'100%',objectPosition:'center',objectFit:'cover'}}/></div>
      <div className='relative flex flex-col justify-center h-full py-8 md:py-0'>
   {Switch?<UserForm/>:<LoginPage/>}
      {Switch?"":<div className='text-center mt-4 md:absolute md:right-[12%] md:top-[74%] md:mt-0'>New user?<button className='text-blue-800 font-bold ml-1' onClick={()=>{
        setSwitch(!Switch)
      }}>Register</button></div>}
      </div>
      </div>
      
    </div>
    </div>
  )
}

export default page
