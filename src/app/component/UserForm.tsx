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
    <>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-3 w-100% justify-center items-center translate-y-[7rem]"
      >
        <h1 className="translate-y-[-2rem] text-xl tracking-[0.3rem] font-bold">Create New User</h1>
        
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          required={true}
          className={styles.inputbox}
        />
        <span><Image src={person} alt="error" className={styles.inputboxImg3}/></span>

        
        <input
          id="email"
          placeholder="email"
          name="email"
          type="text"
          onChange={handleChange}
          required={true}
          className={styles.inputbox}
        />
        <span><Image src={em} alt="error" className={styles.inputboxImg4}/></span>
        <input
          id="password"
          placeholder="password"
          name="password"
          type={Trigger?'text':'password'}
          onChange={handleChange}
          required={true}
          className={styles.inputbox}
        />
        <span><Image src={pwd} alt="error" className={styles.inputboxImg5} onClick={()=>{setTrigger(!Trigger)
        }}/></span>

        <button
          type="submit"
          className=" hover:bg-green-100 h-[40px] w-[200px] rounded-[11px] translate-y-4 border-2 border-black font-bold transition-all duration-300"
        >CreateUser</button>
      </form>
      <p className="text-red-500">{errorMessage}</p>
    </>
  );
};

export default UserForm;