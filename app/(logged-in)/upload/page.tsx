import BgGradient from '@/components/common/bg-gradient'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import UploadForm from '@/components/upload/upload-form'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <section className='relative mx-auto flex flex-col z-0 items-center  py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl'>
      <div className="flex    ">
        <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-400 via-rose-500 to-rose-800 animate-gradient-x group cursor-pointer  ">
          <Badge variant={"secondary"} className='relative px-6 py-2 text-base font-medium bg-white  rounded-full group-hover:bg-gray-50 transition-colors duration-200  ' >
            <Sparkles className='h-8 w-8 mr-2 text-rose-600 animate-pulse   ' />
            <p className='text-base text-rose-600 '>AI Powered Content creation </p>
          </Badge>
        </div>
      </div>
      <h1 className='font-bold py-6 text-center '>
        Start Uploading
        <span className='relative inline-block z-10 px-2'>Your PDF's
          <span className='absolute inset-0 bg-rose-200/50 -rotate-1 -z-10 rounded-lg transform -skew-y-1 ' aria-hidden="true"></span>
        </span>
      </h1>
      <p className='text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600  '>Upload your PDF and Ai the magic ✨ </p>
      <UploadForm />
    </section>
  )
}

export default Page