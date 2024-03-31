'use client'
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { DataContext } from '@/contexts/context'
const page = () => {
    const router = useRouter()
    const { input, setinput } = useContext(DataContext);
    const handleChange = (event) => {
        setinput({
            ...input,
            [event.target.name]: event.target.value
        })
    };
    const handleSubmit = () =>{
        router.push('/create/create_interactive/choices')
    }
    return (
        <main>
            <section className='flex max-w-full p-20 justify-center items-center space-x-20 '>
            <div className="bg-rose-200 border-2 border-black rounded-3xl h-[411px] w-[498px] top-[276px] left-[746px]  shadow-[3px_3px_0px_0px_rgba(0,0,0)]">
                    <div className="w-[444px] h-[71px] mx-auto mt-[41px]">
                        <div className="text-center text-[#66172A]">Enter first Characters in the story</div>
                        <input name='firstCharacter' value={input.firstCharacter} onChange={handleChange} type="text" id="confirm_password" class="bg-gray-50 border-2 border-black text-gray-900 text-sm rounded-[50px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500  "required />
                    </div>
                    <div className="w-[444px] h-[71px] mx-auto mt-[30px]">
                        <div className="text-center text-[#66172A]">Enter second Character in the story</div>
                        <input name='secondCharacter' value={input.secondCharacter} onChange={handleChange} type="text" id="confirm_password" class="bg-gray-50 border-2 border-black text-gray-900 text-sm rounded-[50px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="w-[444px] h-[71px] mx-auto mt-[30px] mb-4">
                        <div className="text-center text-[#66172A]">Enter the moral you want to teach your child</div>
                        <input name='moral' value={input.moral} onChange={handleChange} type="text" id="confirm_password" class="bg-gray-50 border-2 border-black text-gray-900 text-sm rounded-[50px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="flex items-center justify-center"> <button onClick={handleSubmit} className="text-black bg-[#FFF7AF] hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-[50px] text-xl px-9 py-2.5 dark:focus:ring-yellow-900 border-black border-2">Create Video WonderTale</button></div>
                </div>

            <div className="">
                <div className=""> <Image src="/create_interactive.png" alt="Company Logo" width={339} height={203} /></div>
                <div className="text-center font-semibold">
                    Create Unique Stories with your Child
                </div>
                <div className="text-center">
                    Interact and direct stories your way
                </div>
            </div>
        </section>
</main >
  )
}

export default page