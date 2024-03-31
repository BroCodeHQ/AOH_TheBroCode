'use client'
import { useRouter } from 'next/navigation'


function Home() {
  const router = useRouter();
  return (
    
      <main>
        <section className="flex p-20">
          <div className="w-1/2">
            <h1 className="text-7xl font-bold">Unique Stories</h1>
            <h2 className="text-7xl font-bold mb-4">for your child</h2>

            <p className="text-lg font-semibold mb-2">Engage, Educate, and Entertain Children with Interactive Stories</p>
            <p className="mb-8">We offer <span className="font-bold">personalised stories powered by AI</span>, aimed at kids between 2-5 years. </p>

            <button onClick={()=>{router.push('/create')}} className='px-6 py-2 shadow-md border-2 rounded-xl bg-yellow-100 border-black border-r-4 border-b-4 flex items-center space-x-2'><span>Start Creating Stories </span><img src="/arrow.svg" alt="" /></button>
          </div>
          <div className="w-1/2">
            <img className="max-w-full" src="/heroimage.png" alt="" />
          </div>
        </section>

        <div><img className="w-full" src="./wave.svg" alt="" /></div>

        <section className="max-w-full p-10">
          <h1 className="text-3xl font-semibold text-center mb-10">What we offer</h1>

          <div className="flex justify-center space-x-8 mb-5">
            <div className='w-1/3 p-6 shadow-md border-2 rounded-2xl bg-pink-100 border-black border-r-4 border-b-4 flex flex-col items-center space-x-2'>
              <img src="/offer1.svg" alt="" />
              <h4 className="text-lg font-semibold">Custom Character & Theme Input</h4>
              <p>Customize Your Story Experience!</p>
              <p className="w-4/5 text-center">Choose Characters, Values, and Themes to Create Personalized Stories</p>
            </div>
            <div className='w-1/3 p-6 shadow-md border-2 rounded-2xl bg-indigo-100 border-black border-r-4 border-b-4 flex flex-col items-center space-x-2'>
              <img src="/offer2.svg" alt="" />
              <h4 className="text-lg font-semibold">Interactive Storytelling</h4>
              <p>Empower Children to Shape Their Own Adventures!</p>
              <p className="w-4/5 text-center">Let Your Child's Imagination Take Flight with Interactive Decision-Making</p>
            </div>
          </div>

          <div className="flex justify-center space-x-8">
            <div className='w-1/3 p-6 shadow-md border-2 rounded-2xl bg-purple-100 border-black border-r-4 border-b-4 flex flex-col items-center space-x-2'>
              <img src="/offer3.svg" alt="" />
              <h4 className="text-lg font-semibold">Visual Presentation</h4>
              <p>Captivating Visuals, Captivating Minds!</p>
              <p className="w-4/5 text-center">Vivid Illustrations and Animations Bring Stories to Life on Screen</p>
            </div>
            <div className='w-1/3 p-6 shadow-md border-2 rounded-2xl bg-cyan-100 border-black border-r-4 border-b-4 flex flex-col items-center space-x-2'>
              <img src="/offer4.svg" alt="" />
              <h4 className="text-lg font-semibold">Feedback and Iteration</h4>
              <p>Feedback and Iteration</p>
              <p className="w-4/5 text-center">Help Us Improve and Grow by Sharing Your Thoughts and Ideas</p>
            </div>
          </div>
        </section>

        <div><img className="w-full" src="./wave.svg" alt="" /></div>

        <section className="max-w-full p-10">
          <h1 className="text-3xl font-semibold text-center mb-10">See It in Action!</h1>

          <div className='w-2/3 mb-10 mx-auto h-[570px] p-6 shadow-md border-2 rounded-2xl bg-[#F4CDFF] border-[#B2A6FF] border-r-8 border-b-8 flex flex-col items-center space-x-2'>
              <video className='' src="./hare&tortoise.mp4" controls={true}></video>
            </div>
        </section>
      </main>
    
  );
}

export default Home;
