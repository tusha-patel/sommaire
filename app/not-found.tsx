import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='h-screen flex flex-col items-center justify-center  '>
      <h2 className='font-bold mb-5 text-3xl  '>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}