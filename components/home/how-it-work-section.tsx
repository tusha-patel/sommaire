import { BrainCircuit, FileOutput, FileText, MoveRight } from 'lucide-react';
import React, { ReactNode } from 'react'
import { MotionDiv, MotionH2, MotionH3, MotionSection } from '../common/motion-wrapper';
import { containerVariant } from '@/utils/constants';

type step = {
    icon: ReactNode;
    label: string;
    description: string;
}


const steps: step[] = [
    {
        icon: <FileText size={64} strokeWidth={1.5} />,
        label: "Upload your PDF",
        description: "Simply drag and drop your pdf document or click to upload"
    },
    {
        icon: <BrainCircuit size={64} strokeWidth={1.5} />,
        label: 'AI Analysis',
        description: 'Our advanced AI processes and analyzes your document instantly',
    },
    {
        icon: <FileOutput size={64} strokeWidth={1.5} />,
        label: 'Get Summary',
        description: 'Receive a clear, concise summary of your document',
    },
]


export default function HowItWorkSection() {
    return (
        <>
            <MotionSection variants={containerVariant} className={`relative overflow-hidden bg-gray-50`}>
                <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
                    >
                        <div
                            className="relative left-[calc(50%-3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-br 
                        from-emerald-500 via-teal-500 to-cyan-500 opacity-20 sm:left-[calc(40%-3rem)] sm:w-[40.1875rem]"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 42.4%, 52.4% 68.6%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.6%, 76.7% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>

                    <div className="text-center mb-16">
                        <MotionH2 initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className='font-bold text-rose-500 uppercase text-xl mb-4 '>How It works</MotionH2>
                        <MotionH3 initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className='font-bold text-3xl max-w-2xl mx-auto '>Transform PDF int an easy-to-digest summary in three simple steps</MotionH3>
                    </div>

                    {/* upload pdf */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative ">
                        {
                            steps.map((step, ind) => (
                                <MotionDiv initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: ind * 0.2 }}
                                    className="relative flex items-stretch " key={ind}>
                                    <StepItem  {...step} />
                                    {ind < steps.length - 1 && (
                                        <MotionDiv initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            transition={{ duration: 0.5, delay: ind * 0.2 + 0.4 }} className=" hidden md:block absolute top-1/2 transform -translate-y-1/2 z-10 -right-4 ">
                                            <MoveRight size={32} strokeWidth={1} className='text-rose-400' />
                                        </MotionDiv>
                                    )}
                                </MotionDiv>
                            ))
                        }
                    </div>
                </div>
            </MotionSection>

        </>
    )
}


function StepItem({ icon, label, description }: step) {
    return (
        <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-rose-500/50 transition-colors group w-full">
            <div className="flex flex-col gap-4 h-full">
                <div className="flex items-center justify-center h-24 w-24 mx-auto rounded-2xl bg-gradient-to-br from-rose-500/10 to-transparent group-hover:from-rose-500/20 transition-colors">
                    <div className="text-rose-500">{icon}</div>
                </div>
                <div className="flex flex-col flex-1 justify-between">
                    <h4 className="text-center font-bold text-xl">{label}</h4>
                    <p className="text-center text-gray-600 text-sm">{description}</p>
                </div>
            </div>
        </div>
    );
}
