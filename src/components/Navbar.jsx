import React from 'react'

const Navbar = () => {
    return (
        <>
            <nav className='flex justify-between items-center py-4 px-16 bg-purple-300'>
                <div className=' flex justify-center items-center space-x-2 p-2'>
                    <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="4.8"> <path d="M2 16.1436V4.9978C2 3.89963 2.8863 3.00752 3.9824 3.07489C4.95877 3.1349 6.11349 3.25351 7 3.48744C8.04921 3.76431 9.29611 4.35401 10.2823 4.87546C10.5893 5.03782 10.9158 5.15044 11.25 5.21394L11.25 20.3926C10.9471 20.3258 10.6515 20.218 10.3724 20.0692C9.37293 19.5365 8.08145 18.9187 7 18.6334C6.12329 18.402 4.98428 18.2835 4.01486 18.2228C2.90605 18.1535 2 17.2546 2 16.1436Z" fill="#000000"></path> <path d="M12.75 20.3926C13.0529 20.3258 13.3485 20.218 13.6276 20.0692C14.6271 19.5365 15.9185 18.9187 17 18.6334C17.8767 18.402 19.0157 18.2835 19.9851 18.2228C21.094 18.1535 22 17.2546 22 16.1436V4.93319C22 3.86075 21.1538 2.98041 20.082 3.01775C18.9534 3.05706 17.5469 3.17403 16.5 3.48744C15.5924 3.75916 14.5353 4.30418 13.6738 4.80275C13.3824 4.97145 13.0708 5.09535 12.75 5.17391L12.75 20.3926Z" fill="#000000"></path> </g><g id="SVGRepo_iconCarrier"> <path d="M2 16.1436V4.9978C2 3.89963 2.8863 3.00752 3.9824 3.07489C4.95877 3.1349 6.11349 3.25351 7 3.48744C8.04921 3.76431 9.29611 4.35401 10.2823 4.87546C10.5893 5.03782 10.9158 5.15044 11.25 5.21394L11.25 20.3926C10.9471 20.3258 10.6515 20.218 10.3724 20.0692C9.37293 19.5365 8.08145 18.9187 7 18.6334C6.12329 18.402 4.98428 18.2835 4.01486 18.2228C2.90605 18.1535 2 17.2546 2 16.1436Z" fill="#000000"></path> <path d="M12.75 20.3926C13.0529 20.3258 13.3485 20.218 13.6276 20.0692C14.6271 19.5365 15.9185 18.9187 17 18.6334C17.8767 18.402 19.0157 18.2835 19.9851 18.2228C21.094 18.1535 22 17.2546 22 16.1436V4.93319C22 3.86075 21.1538 2.98041 20.082 3.01775C18.9534 3.05706 17.5469 3.17403 16.5 3.48744C15.5924 3.75916 14.5353 4.30418 13.6738 4.80275C13.3824 4.97145 13.0708 5.09535 12.75 5.17391L12.75 20.3926Z" fill="#000000"></path> </g></svg>
                    <h1 className="font-bold text-lg">WonderTales</h1>
                </div>
                <div className=' flex justify-center space-x-8 '>
                    <div className='flex space-x-8 p-2'>
                        <a href="/about">About</a>
                        <a href="/create">Create</a>
                    </div>
                    <div className='flex space-x-8 items-center'>
                        <button className='px-6 py-2 shadow-md border-2 rounded-xl bg-white  border-black border-r-4 border-b-4'>Login</button>
                        <button className='px-4 py-2 shadow-md border-2 rounded-xl bg-yellow-100 border-black border-r-4 border-b-4'>Sign Up</button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar