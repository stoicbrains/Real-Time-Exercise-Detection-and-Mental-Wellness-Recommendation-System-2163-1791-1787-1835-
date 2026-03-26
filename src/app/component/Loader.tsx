"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import loader from "../parallax/loader.png";
import styles from '../styles/form.module.css'
import logo from '../parallax/tree.png'
const Loader = () => {
  const [stop, setStop] = useState(1);
  const containerRef = useRef(null);
  const redDivRef = useRef(null);
  const control = useAnimation();
  const slide = useAnimation();
  const isInViewContainer = useInView(containerRef, { once: true });
  const isInViewRedDiv = useInView(redDivRef, { once: true });


  useEffect(() => {
    if (isInViewContainer) {
      control.start("visible");
      console.log("Container is in view");
    }

    if (isInViewRedDiv) {
      console.log("Red div is in view");
      slide.start('visible');
    }
  }, [isInViewContainer, isInViewRedDiv]);

  return (
    <>
    <div
      ref={containerRef}
      className={`w-screen bg-[#effaf6] absolute left-0 top-0 z-[100] overflow-y-scroll overflow-x-hidden transition-all duration-500 ${
        stop === 0 ? "h-0" : "h-screen"}`} style={{scrollbarWidth:'thin'}}>
      <motion.div
        variants={{
          visible: { opacity: 1, translateY: 0 },
          hidden: { opacity: 0, translateY: 500},
        }}
        initial="hidden"
        animate={control}
        transition={{ delay: 0.15, duration: 0.5, ease: "easeIn" }}
        className="relative left-0 top-[0] h-full w-full z-[50] transition-all duration-200"
      >
        <h1 className="text-4xl font-bold text-center translate-y-[3rem] relative transition-all duration-200 ease-linear">
        <span className="tracking-[1rem] text-green-950">Har<span className="text-green-800">mony</span></span><span className="overflow-hidden flex justify-center items-center absolute top-0 left-[58%] translate-y-[-0.8rem]"><Image src={logo} alt="" objectFit="cover" style={{height:'70px',width:'60px'}}/></span>
        </h1>
        <div className="h-[90%] w-[60%] text-white relative left-[50%] translate-x-[-50%] ">
          <Image src={loader} alt="" className={styles.loader}/>
        </div>
        <span></span>
      </motion.div>
      <div
        ref={redDivRef}
        className="h-[20vh] w-[45vw] relative left-[50%] translate-x-[-50%] top-[10vh] text-center font-bold text-gray-950"
      >
        <p className="text-4xl font-bold">Welcome</p>
          <p className="text-3xl text-left translate-x-[2rem]">At Harmony,</p>
          <p className="text-xl">we offer practical solutions to mental health challenges through our expert team.</p>
        <motion.div
          variants={{
            visible: { left: "100%", height: "100%" },
            hidden: { left: "0%", height: "100%" },
          }}
          initial="hidden"
          animate={slide}
          transition={{ duration: 0.7, ease: "easeInOut",delay:0.4 }}
          style={{
            position: "absolute",
            top: 0,
            bottom: 4,
            left: 0,
            right: 0,
            backgroundColor: "rgb(3 7 18)",
            zIndex: 25,
          }}
        ></motion.div>
      </div>
      <button
        className="transition-all dura text-white rounded-xl h-[60px] w-[160px] text-center font-bold text-xl bg-gray-800 relative bottom-[-15%] left-[50%] translate-x-[-50%] hover:bg-gray-950 hover:h-[65px] hover:w-[170px] "
        onClick={() => {
          setStop(0);
        }}
      >
        Explore!
      </button> 
      <div className="h-[10vh] w-screen relative top-[20%]"></div>
    </div>
    </>
  );
};

export default Loader;
