import { SignUp } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <main className='w-full flex flex-wrap h-screen items-center justify-center p-8'>
        <section className="w-2/5 h-[90vh] relative">
            <div className='h-full w-full lg:w-3/5 absolute lg:right-[-20px] lg:top-0'>
                <SignUp/>
            </div>
        </section>
        <section className='w-3/5 bg-blue-500 h-[90vh] rounded-lg sm:hidden md:hidden lg:block relative'>
            <p className='w-[49%] absolute left-20 top-20 text-3xl text-wrap tracking-wider font-semibold text-white'>Streamline your personnel processes for better efficiency and convience today!</p>
        </section>
    </main>
  )
}

export default page