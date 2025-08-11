import { Pizza, PizzaIcon } from 'lucide-react'
import React from 'react'
import SummaryViewer from '../summaries/summary-viewer'
import { MotionDiv, MotionH2, MotionH3, MotionSection } from '../common/motion-wrapper'
import { containerVariant, itemVariants } from '@/utils/constants'
import { DEMO_SUMMARY } from '@/utils/promots'

const DemoSection = () => {
    return (
        <MotionSection variants={containerVariant} initial="hidden" animate='visible' className="relative">
            <div className='max-w-5xl mx-auto py-12 lg:py-24 px-4 sm:px-6 lg:px-8 lg:pt-12   '>
                <div className="flex flex-col justify-center items-center space-y-4">
                    <div className="inline-flex items-center justify-center p-2 rounded-3xl bg-gray-100/80 background-blur-xs border border-gray-500/20 mb-4 ">
                        <PizzaIcon className=' w-6 h-6 text-rose-500' />
                    </div>
                    <div className="text-center mb-16">
                        <MotionH3 initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className='font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6 '>Watch how Sommaire transforms this <span className='bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent '>Next.js course PDF </span>
                            into an easy-to-read summary </MotionH3>
                    </div>

                    {/* summary section */}
                    <div className="flex flex-col justify-center items-center px-2 sm:px-4 lg:px-6 ">
                        <MotionDiv initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} >
                            <SummaryViewer summary={DEMO_SUMMARY} />
                        </MotionDiv>
                    </div>
                </div>
            </div>
        </MotionSection>
    )
}

export default DemoSection