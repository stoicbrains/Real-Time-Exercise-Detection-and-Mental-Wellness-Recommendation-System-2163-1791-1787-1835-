"use client"
import React from "react";
import Caoursel from "./component/Caoursel";
import bg from './Assets/embroidary1.png'
import bg2 from './Assets/embroidary2.png'
import bg3 from './Assets/embroidary3.png'
import bg4 from '../app/Assets/embroidary4.png'
import {motion} from 'framer-motion'
import Image from "next/image";
import Loader from "./component/Loader";



export default function page() {
  return (
    <>
    <Loader/>
      <div className="h-screen w-screen absolute top-[0] left-0 overflow-hidden">
      <motion.div className="absolute left-0 top-0 z-[-10] " animate={{rotate:[0,2,-2,0],x:[0,-5,5,0],y:[0,-5,0]}} transition={{duration:1.5,delay:1,repeat:Infinity}}>
      <Image src={bg} alt="error" style={{rotate:'180deg', height:'300px', width:'400px',translate:'-70% -5%'}}/>
    </motion.div>
    <motion.div className="absolute right-0 top-0 z-[-1]" animate={{rotate:[0,1,-3,0],x:[0,-5,5,0],y:[0,-5,0]}} transition={{duration:1.5,delay:1,repeat:Infinity}}>
      <Image src={bg2} alt="error" style={{rotate:'-91deg', height:'800px',width:'750px',translate:'38% -10%'}}/>
    </motion.div>
    <motion.div className="absolute bottom-0 left-0 z-[-1]" animate={{rotate:[0,2,-2,0],x:[0,-5,0],y:[0,8,0]}} transition={{duration:1.5,delay:1,repeat:Infinity}}>
      <Image src={bg3} alt="error" style={{rotate:'40deg', height:'600px', width:'400px',translate:'-10% 30%'}}/>
    </motion.div>
    <motion.div className="absolute bottom-0 right-0 z-[-1]" animate={{rotate:[0,2,-2,0],x:[0,-5,5,0],y:[0,7,0]}} transition={{duration:1.5,delay:1,repeat:Infinity}}>
      <Image src={bg4} alt="error" style={{rotate:'10deg', height:'710px', width:'610px',translate:'74% 9%'}}/>
    </motion.div>

        <div className="h-[70%] w-[75%] bg-[#feffe1]  rounded-[21px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] [box-shadow:15px_15px_10px_10px_rgba(100,100,100,0.6)]">
          <div className="grid [grid-template-columns:30%_70%] h-full w-full rounded-[21px]">
            <div className="h-full text-black overflow-hidden relative z-[1] before:absolute before:z-[-1] before:left-0 before:[border-radius:21px_0px_0px_21px] before:top-0 before:h-[100%] before:w-0 before:[background-color:#ffed9c] before:transition-all before:duration-500 before:ease-in-out before:hover:w-[100%]">
              <div className="flex justify-center items-center h-full w-full">
                <div>
              <h1 className="text-3xl font-bold text-center font-sans">Welcome To</h1>
              <h1 className="text-2xl font-bold text-center font-sans">Harmony</h1>
              <h1 className="text-center text-xl font-sans">
              Empower Your Mind, Embrace Your Journey: Your Path to Inner Harmony Begins Here.
              </h1>
              </div>
              </div>
            </div>
            <div className="caoursel">
              <Caoursel/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
