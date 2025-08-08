"use client"

import { cn } from '@/lib/utils';
import { PricingPlans } from '@/utils/constants';
import { ArrowRight, CheckIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
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
        <div className='relative w-full hover:transition-all hover:scale-[1.02] duration-300 '>
            <div className={cn('relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border-[1px] border-gray-500/20 rounded-2xl', id === 'pro' && "border-rose-500 gap-5 border-2")}>
                <div className="">
                    <p className='text-lg lg:text-xl font-bold capitalize  '>{name}</p>
                    <p className='text-base-content/80 mt-2  '>{description}</p>

                </div>
                <div className="flex gap-2">
                    <p className='text-5xl tracking-tight font-extrabold'>{price}</p>
                    <div className="flex flex-col justify-end mb-[4px] ">
                        <p className='text-xs uppercase font-semibold'>USD</p>
                        <p className='text-xs'>/month</p>
                    </div>
                </div>
                <div className="space-y-2.5 leading-relaxed text-base flex-1 ">
                    {items.map((item, idx) => (
                        <li key={idx} className='flex items-center gap-2  ' >
                            <CheckIcon size={18} />
                            <span>{item}</span>
                        </li>
                    ))}
                </div>
                <div className="" >
                    <Link href={paymentLink} className={cn('relative rounded-full flex justify-center items-center gap-2 bg-linear-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white border-2 py-2', id == 'pro' ? "border-rose-900" : "border-rose-100 from-rose-400 to-rose-500")} >
                        Buy Now <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default function PricingSection() {
    return (
        <section className=" relative overflow-hidden" id='pricing'>
            <div className="py-12 lg:py-24 max-w-5xl mx-auto  px-4 sm:px-6 lg:px-8 lg:pt-12">
                <div className="flex items-center justify-center">
                    <h2 className=" uppercase font-bold text-xl mb-8 text-rose-500 ">
                        Pricing
                    </h2>
                </div>

                <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8  ">
                    {PricingPlans.map((plan) => (
                        <PricingCard key={plan.id} {...plan} />
                    ))}
                </div>
            </div>
        </section>
    );
}
