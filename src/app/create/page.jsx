'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter();
    const moveTo = (path) => {
        router.push(path);
    }
    return (
        <main>
            <section className='flex max-w-full p-20 justify-center items-center space-x-20'>
                <div onClick={() => { moveTo('/create/create_video') }} className="bg-rose-200 border border-black rounded-3xl h-[411px] w-[498px] top-[275px] left-[189px] ">
                    <div className="flex flex-col justify-center items-center mt-20"> <Image src="/create_video.png" alt="Company Logo" width={339} height={203} />
                        <div className="font-sans font-extrabold mt-4">
                            Generate Unique Video Stories
                        </div>
                        <div className="font-[Fredoka] text-[#66172A] ">
                            Choose Characters, Values, and Themes
                        </div>
                    </div>
                </div>
                <div onClick={() => { moveTo('/create/create_interactive') }} className="bg-[#C1EAF8] border border-black rounded-3xl h-[411px] w-[498px] top-[275px] left-[189px] ">
                    <div className="flex flex-col justify-center items-center mt-20"> <Image src="/create_interactive.png" alt="Company Logo" width={300} height={190} />
                        <div className="font-sans font-extrabold mt-2" >
                            Generate Unique Video Stories
                        </div>
                        <div className="font-[Fredoka] text-[#66172A] " >
                            Choose Characters, Values, and Themes
                        </div>
                    </div>
                </div>
                <div onClick={() => { moveTo('/create/custom') }} className="bg-[#E8EAFF] border border-black rounded-3xl h-[411px] w-[498px] top-[275px] left-[189px] ">
                    <div className="flex flex-col justify-center items-center mt-20 p-5"> <Image src="/custom_story.png" alt="Company Logo" width={339} height={223} />
                        <div className="font-sans font-extrabold mt-7">
                            Input your own stories
                        </div>
                        <div className="font-[Fredoka] text-[#66172A] ">
                            Be your own creator
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default page