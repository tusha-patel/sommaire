import { Pizza, PizzaIcon } from 'lucide-react'
import React from 'react'

const DemoSection = () => {
    return (
        <section className="relative">
            <div className='max-w-5xl mx-auto py-12 lg:py-24 px-4 sm:px-6 lg:px-8 lg:pt-12   '>
                <div className="flex flex-col justify-center items-center space-y-4">
                    <div className="inline-flex items-center justify-center p-2 rounded-3xl bg-gray-100/80 background-blur-xs border border-gray-500/20 mb-4 ">
                        <PizzaIcon className=' w-6 h-6 text-rose-500' />
                    </div>
                    <div className="text-center mb-16">
                        <h2 className='font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6 '>Watch how Sommaire transforms this <span className='bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent '>Next.js course PDF </span>
                            into an easy-to-read summary </h2>
                    </div>

                    {/* summary section */}
                    <div className="flex flex-col justify-center items-center px-2 sm:px-4 lg:px-6 ">

                    </div>


                </div>
            </div>
        </section>
    )
}

export default DemoSection