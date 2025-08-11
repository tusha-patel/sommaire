"use client"

import { cn } from '@/lib/utils';
import { containerVariant, itemVariants, PricingPlans } from '@/utils/constants';
import { ArrowRight, CheckIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { MotionDiv, MotionSection } from '../common/motion-wrapper';
import { Variants } from 'motion/react';
type PriceType = {
    name: string;
    price: string;
    description: string;
    period: string;
    items: string[];
    id: string;
    paymentLink: string;
    priceId: string;
}

const listVariant: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring", damping: 20, stiffness: 100
        }
    }
}


function PricingCard({
    name,
    price,
    description,
    period,
    items,
    paymentLink,
    id,
}: PriceType) {
    return (
        <MotionDiv variants={listVariant} whileHover={{ scale: 1.02 }} className='relative w-full hover:transition-all hover:scale-[1.02] duration-300 '>
            <div className={cn('relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border-[1px] border-gray-500/20 rounded-2xl', id === 'pro' && "border-rose-500 gap-5 border-2")}>
                <MotionDiv variants={itemVariants} className="">
                    <p className='text-lg lg:text-xl font-bold capitalize  '>{name}</p>
                    <p className='text-base-content/80 mt-2  '>{description}</p>

                </MotionDiv>
                <div className="flex gap-2">
                    <p className='text-5xl tracking-tight font-extrabold'>{price}</p>
                    <div className="flex flex-col justify-end mb-[4px] ">
                        <p className='text-xs uppercase font-semibold'>USD</p>
                        <p className='text-xs'>/month</p>
                    </div>
                </div>
                <MotionDiv variants={itemVariants} className="space-y-2.5 leading-relaxed text-base flex-1 ">
                    {items.map((item, idx) => (
                        <li key={idx} className='flex items-center gap-2  ' >
                            <CheckIcon size={18} />
                            <span>{item}</span>
                        </li>
                    ))}
                </MotionDiv>
                <MotionDiv variants={itemVariants} className="" >
                    <Link href={paymentLink} className={cn('relative rounded-full flex justify-center items-center gap-2 bg-linear-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white border-2 py-2', id == 'pro' ? "border-rose-900" : "border-rose-100 from-rose-400 to-rose-500")} >
                        Buy Now <ArrowRight size={18} />
                    </Link>
                </MotionDiv>
            </div>
        </MotionDiv>
    )
}

export default function PricingSection() {
    return (
        <MotionSection variants={containerVariant} initial='hidden' whileInView={'visible'} viewport={{ once: true, margin: "-100px" }} className=" relative overflow-hidden" id='pricing'>
            <div className="py-12 lg:py-24 max-w-5xl mx-auto  px-4 sm:px-6 lg:px-8 lg:pt-12">
                <MotionDiv variants={itemVariants} className="flex items-center justify-center">
                    <h2 className=" uppercase font-bold text-xl mb-8 text-rose-500 ">
                        Pricing
                    </h2>
                </MotionDiv>

                <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8  ">
                    {PricingPlans.map((plan) => (
                        <PricingCard key={plan.id} {...plan} />
                    ))}
                </div>
            </div>
        </MotionSection>
    );
}
