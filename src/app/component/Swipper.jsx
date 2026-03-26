import React, { useState } from 'react';
import Image from 'next/image';

const Swipper = ({ data },value) => {
  const [index, setIndex] = useState(0);
  const styleSlider = {
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };
  return (
    <div className='h-full w-full grid gap-[1rem] [grid-template-columns:35%_65%]'>
      <div className='rounded-xl overflow-hidden'>
      <div className='h-full w-full relative top-0 transition-all duration-300'>
           <div style={styleSlider}>
             {data.map((item, i) => (
               <div key={i} className={`h-full w-full absolute left-0 top-0 transition-all duration-500 overflow-hidden ${i === index ? '' : 'left-[-130%] opacity-0'}`}>
                 <span className='absolute top-7 left-[50%] translate-x-[-50%] text-center font-semibold text-md'>{item.title}</span>
                 <Image src={item.url} alt='' className='transition-all duration-200' style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
               </div>
             ))}
          </div>
      </div>
      </div>
      <div className='rounded-xl bg-transparent overflow-hidden relative'>
        <div className='h-full w-full'>
        <div style={{opacity:'1'}}>
             {data.map((item, i) => (
               <div key={i} className={`h-full w-full absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] transition-all duration-500 overflow-hidden ${i === index ? '' : 'opacity-0 left-[-130%]'}`}>
                <h1 className='font-bold text-2xl text-center'>{item.title}</h1>
                <p className='text-left h-[90%] w-[90%] p-[2rem] text-lg translate-x-[4.5%]'>{item.desc}</p>
               </div>
             ))}
          </div>
        </div>
        <div className='flex justify-center items-center gap-1 h-[30px] w-[100px] absolute bottom-0 left-[50%] translate-x-[-50%]'>
             {data.map((active,i) => (
               <button key={i} className={`h-3 w-3 rounded-2xl  ${i === index ? 'bg-gray-100 opacity-[1]' : 'bg-white opacity-[0.6]'}`} onClick={()=>{setIndex(i)}}>
               </button>
             ))}
         </div>
      </div>
      </div>
    
  );
};

export default Swipper;
