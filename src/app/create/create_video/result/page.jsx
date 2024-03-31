'use client'
import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '@/contexts/context'
import axios from 'axios'

const VideoPage = () => {
  const [loader, setloader] = useState(false);
  const [video, setvideo] = useState("https://placehold.co/1280x470.mp4?text=Hello+World")
  const { input } = useContext(DataContext)
  // console.log(input)

  const generateVideo = async () => {
    try {
      setloader(true);
      const resp = await axios.post(`http://127.0.0.1:8000/story?character1=${input.firstCharacter}&character2=${input.secondCharacter}&moral=${input.moral}`)
      console.log(resp.data)
      setvideo(resp.data)
      setloader(false);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    generateVideo();
  },[])
  return (
    <>
      {
        loader ?
          <div className={` flex flex-col space-y-4 justify-center items-center h-screen`}>
            <svg aria-hidden="true" class="w-28 h-28 text-gray-200 animate-spin fill-orange-500 opacity-100" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <p className="text-orange-500 text-xl">Generating Video...</p>
          </div>
          :
          <section className="max-w-full px-10 py-5">
            <h1 className="text-3xl font-semibold text-center mb-4">Your WonderTale is ready</h1>

            <div className='w-2/3 mb-10 mx-auto h-[570px] p-6 shadow-md border-2 rounded-2xl bg-[#F4CDFF] border-[#B2A6FF] border-r-8 border-b-8 flex flex-col items-center space-x-2'>
              <video className='' src={video} controls={true}></video>
            </div>

            <div className='w-full flex justify-center flex-col items-center space-y-3'>
              <button className='px-6 py-2 w-1/5 justify-center shadow-md border-2 rounded-xl bg-pink-300 border-black border-r-4 border-b-4 flex items-center space-x-2'>Download Video</button>
              <button className='px-6 py-2 w-1/5 justify-center shadow-md border-2 rounded-xl bg-yellow-100 border-black border-r-4 border-b-4 flex items-center space-x-2'>Create another WonderTale</button>
            </div>
          </section>
      }
    </>
  )
}

export default VideoPage