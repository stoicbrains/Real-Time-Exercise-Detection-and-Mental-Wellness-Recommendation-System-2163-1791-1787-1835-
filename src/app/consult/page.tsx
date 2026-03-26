"use client"
import React, { useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import Receive from "../component/receive";
import Image from "next/image";
import yoga1 from "../Assets2/yoga1.webp";
import yoga2 from "../Assets2/yoga2.webp";
import yoga3 from "../Assets2/yoga3.webp";
import bg5 from "../Assets2/bg5.jpg";
import Swipper from "../component/Swipper";
import { useScroll,useTransform } from "framer-motion";
const data = [
  { id: 1, url: yoga1, title: "Corpse Pose",    desc: "Corpse Pose, or Savasana, is a fundamental yoga relaxation posture. In this pose, practitioners lie flat on their backs, legs extended, arms relaxed by their sides, and eyes closed. Savasana promotes deep relaxation, alleviates stress, and calms the nervous system. It allows the body to absorb the benefits of a yoga practice, enhancing mental clarity and reducing anxiety. This meditative posture aids in rejuvenating the mind, improving focus, and fostering a sense of inner peace. Incorporating Savasana at the end of a yoga session helps balance the body, promoting overall well-being by encouraging rest, restoration, and mindfulness.",
},
  { id: 2, url: yoga2, title: "One-legged seated forward bend",    desc: "The One-Legged Seated Forward Bend, or Janu Sirsasana in yoga, involves extending one leg while bending the other knee, reaching towards the toes. This stretch enhances flexibility in the spine, hamstrings, and hip joints. It stimulates abdominal organs, aiding digestion, and alleviates sciatica discomfort. Regular practice improves posture and tones abdominal muscles. Additionally, Janu Sirsasana calms the mind, reduces anxiety, and enhances focus. It's crucial to maintain proper alignment, breathe deeply, and gradually deepen the stretch for optimal benefits and injury prevention. Incorporate this pose into your routine for improved flexibility, mental clarity, and overall well-being.",
},
  {
    id: 3,
    url: yoga3,
    title: "Legs up the wall pose",
    desc: "Legs Up the Wall Pose, or Viparita Karani, is a restorative yoga pose where you lie on your back with legs extended vertically against a wall. This gentle inversion promotes relaxation, eases tension, and improves circulation. By reversing blood flow, it reduces swelling in the legs and may alleviate mild back pain. The pose also calms the nervous system, aiding in stress and anxiety relief. Practicing Legs Up the Wall regularly can enhance sleep quality and alleviate menstrual discomfort. It's accessible for all levels, making it an excellent pose for relaxation and rejuvenation in a busy lifestyle.",

  },
];

const SwipperMemo = React.memo(Swipper);

const Page = () => {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [trigger, setTrigger] = useState(true);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("api/auth/signin");
    },
  });

  const handleButtonClick = useCallback((i:any) => {
    setIndex(i);
  }, [setIndex]);


  return (
    <>
      <div className={`transition-all overflow-hidden scroll-smooth w-[100%] ${trigger ? "" : "hidden"}`} style={{scrollbarWidth:'thin'}}>
        <div className="flex justify-center scroll-smooth my-[3rem]">
          <div className="h-[70vh] w-[90vw] scroll-smooth rounded-xl bg-gray-400 absolute top-[10rem] left-[50%] translate-x-[-50%] [box-shadow:15px_15px_10px_10px_rgba(100,100,100,0.6)]">
            <div className="flex justify-center items-center h-full w-full">
              <div className="h-[80%] w-[80%]">
                <div className=" h-full w-full rounded-xl overflow-hidden transition-all duration-500">
                  <SwipperMemo data={data} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[110vh] w-[90vw] scroll-smooth m-0 p-0 absolute top-[105vh] left-[50%] translate-x-[-50%] z-[-1] text-center ">
          <h1 className="text-3xl font-bold tracking-[0.2rem] font-sans transition-all duration-300 hover:text-[1.9rem] hover:text-blue-950">
            Need Someone To Talk to?
          </h1>
          <span className="text-xl font-semibold tracking-[0.2rem] transition-all duration-300 text-blue-900 hover:text-[1.3rem]">
              Dont worry we are here for <span className="text-blue-950 font-extrabold">you</span>
            </span>
          <div className="h-[90vh] w-[90vw] rounded-xl bg-red-300 relative top-[2rem] [box-shadow:15px_15px_10px_10px_rgba(100,100,100,0.6)] overflow-hidden">
            <div className="absolute h-[8rem] w-[23rem] text-left bottom-[12rem] left-[16%] translate-x-[-30%] text-xl  rounded-2xl border-4 border-white p-4 flower">
              Here At Harmony, we have the expertise and heart to accompany you on your mental health journey
            </div>
            <button
              className="absolute h-[3rem] w-[9rem] rounded-md left-[20%] bottom-[8rem] translate-x-[-40%] text-black bg-white before:absolute before:z-[-1] before:bottom-[-3px] before:top-0 before:left-0 before:h-[100%] before:w-0 before:transition-all before:duration-500 before:ease-in-out before:bg-blue-950 before:hover:w-full hover:border-0 before:rounded-md hover:text-white"
              onClick={() => {
                setTrigger(!trigger);
              }}
            >
              Talk to Counselors
            </button>
            <Image src={bg5} alt="" style={{ height: "90vh", width: "90vw", objectFit: "cover", objectPosition: "center" }} loading="lazy" />
          </div>
        </div>
      </div>
      <div className={`h-[70vh] w-[70vw] absolute translate-x-[-50%] left-[50%] top-[50%] translate-y-[-50%] rounded-lg bg-gray-950 transition-opacity duration-[500ms] ease-linear ${trigger ? "hidden" : "opacity-[1] "}`}>
        <Receive />
        <button
          className="rounded-2xl h-[2rem] w-[3.5rem] text-md font-semibold py-0 m-0 text-center bg-red-600 absolute right-3 top-3 text-white"
          onClick={() => {
            setTrigger(true);
            router.refresh();
          }}
        >
          x
        </button>
      </div>
    </>
  );
};

export default Page;
