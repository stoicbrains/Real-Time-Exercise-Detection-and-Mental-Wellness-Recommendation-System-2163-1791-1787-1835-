"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from '../styles/form.module.css'
import Image from "next/image";
import person from '@/app/Assets/person.png'
import em from '@/app/Assets/email.png'
import pwd from '@/app/Assets/Password.png'
const UserForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e:any) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setErrorMessage("");
    const res = await fetch("/api/Users", {
      method: "POST",
      body: JSON.stringify({ formData }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      router.refresh();
      router.push("/");
    }
  };
  const [Trigger,setTrigger] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-2">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-4 w-full justify-center items-center"
      >
        <h1 className="text-xl tracking-[0.3rem] font-bold mb-4 text-center">Create New User</h1>
        
        <div className="relative">
          <input
            id="name" name="name" type="text" placeholder="Name" onChange={handleChange} required={true}
            className={styles.inputbox}
          />
          <Image src={person} alt="error" className="absolute right-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] pointer-events-none"/>
        </div>

        <div className="relative">
          <input
            id="email" placeholder="email" name="email" type="text" onChange={handleChange} required={true}
            className={styles.inputbox}
          />
          <Image src={em} alt="error" className="absolute right-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] pointer-events-none"/>
        </div>

        <div className="relative">
          <input
            id="password" placeholder="password" name="password" type={Trigger?'text':'password'} onChange={handleChange} required={true}
            className={styles.inputbox}
          />
          <Image src={pwd} alt="error" className="absolute right-3 top-1/2 -translate-y-1/2 w-[17px] h-[17px] cursor-pointer" onClick={()=>{setTrigger(!Trigger)}}/>
        </div>

        <button
          type="submit"
          className=" hover:bg-green-100 h-[40px] w-[200px] rounded-[11px] border-2 border-black font-bold transition-all duration-300 mt-4"
        >CreateUser</button>
      </form>
      <p className="text-red-500 text-center">{errorMessage}</p>
    </div>
  );
};

export default UserForm;