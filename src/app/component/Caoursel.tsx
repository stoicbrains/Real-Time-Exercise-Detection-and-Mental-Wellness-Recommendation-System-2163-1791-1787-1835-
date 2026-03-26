"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import img1 from '../Assets/img1.jpg'
import img2 from '../Assets/img2.jpg'
import img3 from '../Assets/img3.jpg'
import img4 from '../Assets/img4.jpg'
const obj = [
    {
        id:1,
        url:img1
    },
    {
        id:2,
        url:img2
    },
    {
        id:3,
        url:img3
    },
    {
        id:4,
        url:img4
    }
]
export default function Caoursel() {
    const scroll = useRef<any>();
    const [Value,setValue] = useState(0);
    //ts-error!
    useEffect(()=>{
        console.log(scroll.current.scrollWidth,scroll.current.offsetWidth)
        setValue(1000)
    },[scroll])
  return (
    <div className='relative h-full w-full rounded-21px'>
        <div className='absolute h-[500px] w-screen top-[50%] overflow-hidden translate-y-[-50%]'>
            <motion.div className='h-full w-full flex justify-center items-center' ref={scroll} drag='x' dragConstraints={{left:-Value,right:0}} animate={{x:[0,-300,-600,-900,-1200,-1200,-900,-600,-300,0]}} transition={{duration:10.5,delay:2,repeat:Infinity}} >
                <ul className='flex h-[300px] justify-center items-center gap-[7rem]'>
                    {obj.map((item)=>{
                        return(
                        <li key={item.id} className='h-[320px] w-[400px] transition-all duration-200 ease-in-out rounded-[21px] translate-x-[220px] shadower overflow-hidden'>
                            <Image src={item.url} alt=" " className='hover:h-[340px] hover:w-[440px] ' style={{height:'320px',width:'400px',objectFit:'cover', objectPosition:'center' ,pointerEvents:'none'}} />
                        </li>)
                    })}
                </ul>
        </motion.div>
        </div>
    </div>
  )
}
