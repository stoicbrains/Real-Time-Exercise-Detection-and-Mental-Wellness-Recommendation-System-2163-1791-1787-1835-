"use client"
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy,deleteDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import person from "../Assets/person.png";
import { app } from '../firebase';
import {options} from '../api/auth/[...nextauth]/options.js'
import { getServerSession } from "next-auth";
import { doc } from "firebase/firestore";
import {redirect} from 'next/navigation'

const db = getFirestore(app);

const Page = () => {
  const [newQuestion, setNewQuestion] = useState("");
  const [queries, setQueries] = useState<any[]>([]);

  const [profilename, setProfilename] = useState<string | undefined>("");
  
  
  const { data: session, status } = useSession({
    required:true,
    onUnauthenticated(){
      redirect('/api/auth/signin')
    }
  });
  const AdminAccess = (session?.user as any)?.role;

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewQuestion(e.target.value);
  };

  const onSubmit = async () => {
    if (session && session.user) {
      const userEmail = session.user.email;

      await addDoc(collection(db, "questions"), {
        user: userEmail,
        question: newQuestion,
        timestamp: new Date(),
      });
    }

    setNewQuestion("");
  };
  const onDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "questions", id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // Set up a real-time listener for updates
      const unsubscribe = onSnapshot(query(collection(db, "questions"), orderBy("timestamp", "desc")), (snapshot) => {
        const questions = snapshot.docs.map((doc) => ({
          id: doc.id,
          user: doc.data().user,
          question: doc.data().question,
        }));

        setQueries(questions);
      });

      // Clean up the listener when the component unmounts
      return () => unsubscribe();
    };

    fetchData();
  }, []);

  return (
    <div className="absolute top-[8rem] left-[50%] translate-x-[-50%] h-[80vh] w-[80vw] rounded-xl bg-gray-500 overflow-y-scroll scroll-smooth" style={{scrollbarWidth:'thin'}}>
      <div className="text-black text-2xl font-bold w-full text-center mt-[1rem]">
        {queries.length === 0
          ? "No Discussions yet, Start the Discussion"
          : "The Discussion has been started"}
      </div>
      <form action="">
        <div className="flex justify-center items-center gap-[3rem] my-3">
          <textarea
            name="Question"
            id="new"
            cols={100}
            rows={7}
            value={newQuestion}
            onChange={onChange}
            className="bg-gray-900 text-white text-center rounded-lg resize-none"
          ></textarea>
          <button
            type="button"
            onClick={onSubmit}
            className="h-[50px] text-white w-[70px] bg-purple-700 rounded-lg font-semibold hover:bg-purple-950 transition-all duration-150"
          >
            Post
          </button>
          <h1 className="text-5xl font-bold text-black absolute right-0">
            {profilename}
          </h1>
        </div>
      </form>

      <div>
        <ul className="w-[100%] h-[100%] relative left-[50%] translate-x-[-50%] text-black text-lg flex flex-col gap-[1rem] justify-center items-center">
          {queries.map((query) => (
            <li
              key={query.id}
              className="bg-gray-800 text-white h-[200px] w-[80%] rounded-xl p-[1rem]"
            >
              <div className="flex justify-start items-center h-full w-full gap-7">
                <div className="flex-col gap-3 border-r-2 border-white h-full w-[15%]">
                  <p className="bg-white rounded-[50px] h-[40px] w-[40px] relative overflow-hidden left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]">
                    <Image
                      src={person}
                      alt=""
                      style={{
                        height: "25px",
                        width: "20px",
                        objectFit: "cover",
                        objectPosition: "center",
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        translate: "-50% -50%",
                      }}
                    />
                  </p>
                  <p className="text-[7px] relative top-[40%] text-center">
                    {query.user}
                  </p>
                </div>

                <p className="rounded-xl w-[80%] text-white text-sm">{query.question}</p>
              </div>
              <div className={query.user===session?.user?.email?"h-[40px] w-[70px] relative left-[102%] bottom-[60%] z-50":"hidden"}><button className="bg-purple-700 h-[40px] w-[70px] rounded-lg z-10 text-sm hover:bg-purple-950 transition-all duration-200" onClick={()=>{
                onDelete(query.id)
              }}>Delete</button></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
