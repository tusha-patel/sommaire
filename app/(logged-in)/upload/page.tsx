import BgGradient from '@/components/common/bg-gradient'
import { MotionSection } from '@/components/common/motion-wrapper'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import UploadForm from '@/components/upload/upload-form'
import UploadHeader from '@/components/upload/upload-header'
import { hasReachedUploadLimit } from '@/lib/user'
import { containerVariant } from '@/utils/constants'
import { currentUser } from '@clerk/nextjs/server'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const Page = async () => {
  const user = await currentUser();

  if (!user?.id) {
    redirect("/sign-in")
  }

  const userId = user.id;
  const email = user.emailAddresses[0].emailAddress;

  const { hasReachedLimit } = await hasReachedUploadLimit({ userId, email });

  if (hasReachedLimit) {
    redirect("/dashboard")
  }


  return (
    <MotionSection variants={containerVariant} initial='hidden' animate='visible' className='min-h-screen'>
      <BgGradient />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 ">
        <div className="flex flex-col items-center justify-center gap-6 text-center ">
          <UploadHeader />
          <UploadForm />
        </div>
      </div>
    </MotionSection>
  )
}

export default Page