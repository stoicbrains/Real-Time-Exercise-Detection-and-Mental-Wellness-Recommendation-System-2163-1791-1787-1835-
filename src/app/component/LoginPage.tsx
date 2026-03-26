import React, { useState,useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import google from '../Assets/Google.png';
import png1 from '../Assets/Password.png';
import png2 from '../Assets/email.png';
import styles from '../styles/form.module.css';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const [credentials,setcredentials] = useState({email:'',password:''})
  const [trigger,setTrigger] = useState(false);
  const handleChange = (e:any) => {
    setcredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn('google', {callbackUrl:'/'});
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  const [error, setError] = useState("");
  // const session = useSession();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
      router.refresh()
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password) {
      setError("Password is invalid");
      return;
    }

   

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      alert(error)
      router.refresh()
      if (res?.url) router.replace("/");
    } else {
      setError("");
    }
  };
  if (sessionStatus === "loading") {
    return <h1 className='absolute top-[50%] right-[11%] transition-all duration-300 font-bold text-3xl tracking-wide'>Loading...</h1>;}
  

  return (
    <div>
      <h1 className="bg-blue text-center text-xl font-bold translate-y-7 tracking-[0.5rem] hover:text-green-600 transition-all duration-200 ">Login</h1>
      <form onSubmit={handleSubmit} className={styles.box}>
        <div className="flex flex-col gap-[1rem] justify-center items-center ">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.inputbox}
              value={credentials.email}
              onChange={handleChange}

            />
            <Image src={png2} alt="null" className={styles.inputboxImg1} />
          </div>
          <div>
            <input
              type={trigger?'text':'password'}
              name="password"
              placeholder="Password"
              className={styles.inputbox}
              id='password'
              value={credentials.password}
              onChange={handleChange}
              

            />
            <Image src={png1} alt="null" className={styles.inputboxImg2} onClick={()=>{setTrigger(!trigger)}}/>
          </div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex justify-center items-center gap-2 h-[40px] w-[250px] rounded-[11px] border-2 border-black my-3 transition-all duration-300 hover:bg-green-100"
          >
            Google <Image src={google} alt="none" style={{ height: '22px', width: '22px' }} />
          </button>

          <button
            type="submit"
            className="h-[40px] w-[150px] rounded-[11px] border-2 border-black transition-all duration-300 hover:bg-green-100 font-bold" >
            Signin
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

