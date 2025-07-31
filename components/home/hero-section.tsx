import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Badge } from '../ui/badge'
import Link from 'next/link'

const HeroSection = () => {
    return (
        <section className='relative mx-auto flex flex-col z-0 items-center  py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl'>
            <div className="flex    ">
                <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-400 via-rose-500 to-rose-800 animate-gradient-x group cursor-pointer  ">
                    <Badge variant={"secondary"} className='relative px-6 py-2 text-base font-medium bg-white  rounded-full group-hover:bg-gray-50 transition-colors duration-200  ' >
                        <Sparkles className='h-8 w-8 mr-2 text-rose-600 animate-pulse   ' />
                        <p className='text-base text-rose-600 '>Powered by AI</p>
                    </Badge>
                </div>
            </div>
            <h1 className='font-bold py-6 text-center '>
                TransForm PDFs into
                <span className='relative inline-block z-10 px-2'>concise
                    <span className='absolute inset-0 bg-rose-200/50 -rotate-1 -z-10 rounded-lg transform -skew-y-1 ' aria-hidden="true"></span>
                </span> summaries
            </h1>
            <p className='text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600  '>Get a beautiful summary reel the dodument in seconds</p>
            <Button variant={"link"} className='text-white 
            text-base sm:text-lg lg:text-xl px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8
            bg-gradient-to-r from-slate-900 to-rose-500 rounded-full mt-6 lg:mt-16
            hover:from-rose-500 hover:to-slate-900
            transition-colors duration-200 hover:no-underline font-bold ' >
                <Link href={"/#pricing"} className='flex gap-2 items-center  '>
                    <span>Try Something</span>
                    <ArrowRight className='animate-pulse' />
                </Link>
            </Button>
        </section>
    )
}

export default HeroSection