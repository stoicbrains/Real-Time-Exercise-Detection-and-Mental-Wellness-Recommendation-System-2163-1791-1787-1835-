"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

const Button = () => {
  return (
    <div>
      <button className='cursor-pointer backdrop-blur-sm before:absolute before:z-[-1] before:bottom-[-3px] before:top-0 before:left-0 before:h-[100%] before:w-0 before:transition-all before:duration-300 before:ease-in-out before:bg-white before:hover:w-full border-2 rounded-md border-white p-2' onClick={()=>{
        signOut()
      }}>logout</button>
    </div>
  )
}

export default Button
