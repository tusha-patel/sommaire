import React from 'react'
import { Badge } from '../ui/badge'
import { Sparkles } from 'lucide-react'
import { MotionDiv, MotionH1, MotionP } from '../common/motion-wrapper';
import { itemVariants } from '@/utils/constants';

const UploadHeader = () => {
    return (
        <div className="flex flex-col items-center text-center gap-4">
            <MotionDiv variants={itemVariants} className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-rose-400 via-rose-500 to-rose-800 animate-gradient-x group cursor-pointer">
                <Badge variant="secondary" className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200">
                    <Sparkles className="h-6 w-6 mr-2 text-rose-600 animate-pulse" />
                    <p className="text-base text-rose-600">AI Powered Content Creation</p>
                </Badge>
            </MotionDiv>

            <MotionH1 variants={itemVariants} className="font-bold text-2xl sm:text-3xl md:text-4xl">
                Start Uploading
                <span className="relative inline-block px-2">
                    Your PDFs
                    <span className="absolute inset-0 bg-rose-200/50 -rotate-1 -z-10 rounded-lg transform -skew-y-1" />
                </span>
            </MotionH1>

            <MotionP variants={itemVariants} className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl">
                Upload your PDF and let AI do the magic ✨
            </MotionP>
        </div>
    );
};

export default UploadHeader;
