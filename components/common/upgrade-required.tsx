import { ArrowRight, Sparkles } from 'lucide-react'
import BgGradient from './bg-gradient'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function UpgradeRequired() {
  return (
    <div className="relative min-h-[50vh] mx-auto  ">
      <BgGradient className="from-rose-100 via-rose-50 to-white" />

      <div className="container px-8 py-16 mx-auto">
        <div className="flex flex-col items-center justify-center gap-8 text-center max-w-2xl mx-auto">
          <div className="flex items-center gap-2 text-rose-500">
            <Sparkles className="w-6 h-6" />
            <span className="text-sm font-medium uppercase tracking-wider">
              Premium Feature
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent " >Subscription Required</h1>

          <p className="text-lg leading-8 text-gray-600 border-2 border-rose-200 bg-white/50 backdrop-blur-xs rounded-lg p-6 max-w-xl ">
            You need to upgrade to the <strong>Basic Plan</strong> or the <strong>Pro Plan</strong> to access this
            feature 💖
          </p>
          <Button
            asChild
            className="bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white"
          >
            <Link href="/#pricing" className="flex gap-2 items-center">
              View Pricing Plans
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
