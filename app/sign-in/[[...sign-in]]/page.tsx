import BgGradient from '@/components/common/bg-gradient'
import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className='flex justify-center items-center min-h-[40vh]'>
            <div className="py-12 lg:py-24 max-w-5xl mx-auto  px-4 sm:px-6 lg:px-8 lg:pt-12">
                <BgGradient className='from-rose-400 via-rose-300 to-orange-200  ' />
                <SignIn />
            </div>
        </div>
    )
}