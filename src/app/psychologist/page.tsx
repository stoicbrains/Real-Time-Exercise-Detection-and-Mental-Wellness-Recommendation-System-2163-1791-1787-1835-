"use client"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Call from '../component/Call'
const page = () =>{
    const {data:session} = useSession(
        {
            required:true,
            onUnauthenticated() {
                redirect("/api/auth/signin");
            },
        });
        return(
            <>
            <div className="h-[70vh] w-[70vw] absolute left-[50%] top-[10rem] bg-gray-950 translate-x-[-50%] rounded-xl">
                <div className="h-full w-full">
                <Call/>
                </div>
            </div>
            
            
            </>
        )
    }

export default page;