import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { signOut } from "next-auth/react";
import Button from "./button";
import Image from "next/image";
import tree from "../parallax/tree.png";

const Navbar = async () => {
  const session = await getServerSession(options);
  console.log("session.user:", session?.user?.role);
  const isAdmin = session?.user?.role === "admin";
  console.log(isAdmin);

  const handleSignOut = async () => {
    await signOut();
    // After signing out, redirect to home or any desired page
    window.location.href = "/";
  };

  return (
    <>
      <div className="relative z-10 top-0 left-0 flex flex-col md:flex-row items-center justify-between w-full px-4 md:px-10 py-4 bg-transparent gap-4 md:gap-0">
        <div className="flex items-center gap-2">
          <span className="lg:text-[1.5rem] font-extrabold tracking-[5px] text-green-950 text-[1rem] lg:tracking-[7px]">
            Har<span className="text-green-800">mony</span>
          </span>
          <Image src={tree} alt="" height={40} width={40} className="w-[30px] h-[30px] md:w-[50px] md:h-[50px]" />
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-[3rem] w-full md:w-auto">
          <ul className="flex flex-wrap justify-center gap-3 md:gap-[3rem] text-green-900 font-semibold tracking-[1px] md:tracking-[3px] text-[12px] sm:text-[15px] lg:text-[17px] w-full md:w-auto">
            <li>
              <Link href={"/"} className="relative before:absolute before:bottom-[-3px] before:left-0 before:h-[3px] before:w-0 before:transition-all before:duration-300 before:ease-in-out before:bg-green-900 before:hover:w-full">
                Home
              </Link>
            </li>
            <li>
              <Link href={"/AboutUs"} className="relative before:absolute before:bottom-[-3px] before:left-0 before:h-[3px] before:w-0 before:transition-all before:duration-300 before:ease-in-out before:bg-green-900 before:hover:w-full">
                AboutUs
              </Link>
            </li>
            <li>
              <Link href={isAdmin ? "/psychologist" : "/consult"} className="relative before:absolute before:bottom-[-3px] before:left-0 before:h-[3px] before:w-0 before:transition-all before:duration-300 before:ease-in-out before:bg-green-900 before:hover:w-full">
                Consult
              </Link>
            </li>
            <li>
              <Link href={"/Query"} className="relative before:absolute before:bottom-[-3px] before:left-0 before:h-[3px] before:w-0 before:transition-all before:duration-300 before:ease-in-out before:bg-green-900 before:hover:w-full">
                Query
              </Link>
            </li>
            <li>
              <Link href={"/exercise"} className="relative before:absolute before:bottom-[-3px] before:left-0 before:h-[3px] before:w-0 before:transition-all before:duration-300 before:ease-in-out before:bg-green-900 before:hover:w-full">
                Exercise
              </Link>
            </li>
            <li>
              <Link href={"/ranking"} className="relative before:absolute before:bottom-[-3px] before:left-0 before:h-[3px] before:w-0 before:transition-all before:duration-300 before:ease-in-out before:bg-green-900 before:hover:w-full">
                Ranking
              </Link>
            </li>
          </ul>
          <div>
            {session ? (
              <Button />
            ) : (
              <Link
                href={"/api/auth/signin"}
                className="relative backdrop-blur-sm before:absolute before:z-[-1] before:bottom-[-3px] before:top-0 before:left-0 before:h-[100%] before:w-0 before:transition-all before:duration-300 before:ease-in-out before:bg-white before:hover:w-full border-2 rounded-md border-green-900 text-green-900 font-semibold p-2 px-4"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
