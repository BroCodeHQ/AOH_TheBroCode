"use client";

import { useState, useRef, useContext } from 'react';
import Image from 'next/image';
import { DataContext } from '@/contexts/context';
import { useRouter } from 'next/navigation'

export default function MicrophoneComponent() {
    const router = useRouter();
  const {transcript, setTranscript} = useContext(DataContext);
  const [isMicrophoneActive, setIsMicrophoneActive] = useState(false);
  const recognitionRef = useRef(null);

  const startRecording = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser');
      return;
    }

    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.lang = 'en-US';
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onstart = () => {
      setIsMicrophoneActive(true);
    };

    recognitionRef.current.onresult = event => {
      const interimTranscript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      setTranscript(interimTranscript);
    };

    recognitionRef.current.onend = () => {
      setIsMicrophoneActive(false);
      console.log('Speech recognition ended');
      
    };

    recognitionRef.current.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };


  return (
    <main>
      <section className='flex max-w-full p-20 justify-center items-center space-x-20 '>
        <div className="">
          <div className=""> <Image src="/custom_story.png" alt="Company Logo" width={339} height={203} /></div>
          <div className="text-center font-semibold"> 
            Generate Unique Video Stories
          </div>
          <div className="text-center">
            Choose Characters, Values, and Themes           
          </div>
        </div>

        <div className="bg-[#E8EAFF] border border-black rounded-3xl h-[411px] w-[498px] top-[276px] left-[746px]  shadow-[3px_3px_0px_0px_rgba(0,0,0)]">
          <div className="flex flex-col justify-center items-center mt-2">
            <div className="text-[#66172A]">Enter your child's story</div>
            <textarea value={transcript} className="bg-gray-50 border-2 border-black text-gray-900 text-sm rounded-3xl p-2.5 h-48 w-64" required></textarea>
            <div className='text-center text-[#66172A]'>Or speak</div>
          </div>
          
          <div className='flex justify-center items-center mt-2 space-x-2 '>
            {/* <img onClick={startRecording} className={w-8 h-8 ${isMicrophoneActive ? 'underline' : ''}} src='/mic_on.svg' /> */}
            {isMicrophoneActive? <img onClick={startRecording} className="w-8 h-8" src='/mic_off.svg' />:<img onClick={startRecording} className="w-8 h-8" src='/mic_on.svg' /> }
          </div>
          <div className="flex items-center justify-center mt-6"> 
            <button onClick={()=>{router.push('/create/custom/custom_result')}} className="text-black bg-[#FFF7AF] hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-[50px] text-xl px-9 py-2.5 dark:focus:ring-yellow-900 border-black border-2">Create Video WonderTale</button>
          </div>
        </div>
      </section>
    </main>
  );
}