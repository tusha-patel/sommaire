import BgGradient from '@/components/common/bg-gradient';
import { Skeleton } from '@/components/ui/skeleton';
import LoadingSkeleton from '@/components/upload/loading-skeleton';
import { FileText } from 'lucide-react';
import React from 'react';

function HeaderSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
                <Skeleton className="h-8 w-48 rounded-full bg-white/80" />
                <Skeleton className="h-5 w-40 rounded-full bg-white/80" />
            </div>
            <Skeleton className="h-6 w-64 rounded-full bg-white/80" />
        </div>
    );
}

const LoadingSummary = () => {
    return (
        <div className="relative isolate min-h-screen bg-gradient-to-b from-rose-50/40 to-white">
            <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />
            <div className="container mx-auto flex flex-col gap-4">
                <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
                    <div className="flex flex-col gap-8">
                        <HeaderSkeleton />

                        <div className="relative mt-4 sm:mt-8 lg:mt-16">
                            <div className="relative p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-md rounded-2xl 
                    sm:rounded-3xl shadow-xl border border-rose-100/30 max-w-4xl mx-auto">
                                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-1.5 sm:gap-2 
                    text-xs sm:text-sm text-muted-foreground bg-white/90 px-3 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-xs">
                                    <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-rose-400" />
                                    <Skeleton className="h-4 w-16" />
                                </div>

                                <div className="relative mt-8 sm:mt-6 flex justify-center">
                                    <div className="relative overflow-hidden w-full">
                                        <div className="relative p-2 bg-white/80 backdrop-blur-md rounded-2xl border border-rose-100/30">

                                            <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-orange-50/30 to-transparent opacity-50 rounded-3xl" />

                                            <div className="absolute top-4 right-4 text-rose-300/20">
                                                {/* <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-rose-400" /> */}
                                                <Skeleton className='w-10 h-4' />
                                                <Skeleton className='w-10 h-4' />
                                            </div>

                                            <div className="relative">
                                                <LoadingSkeleton />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingSummary;
