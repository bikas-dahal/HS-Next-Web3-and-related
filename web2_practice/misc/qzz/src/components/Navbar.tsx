import React from 'react'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className='h-full w-full flex flex-col gap-y-10 items-center justify-center bg-emerald-500'>
        <div className='flex gap-4'>
            <div className='hover:underline'>
                Home
            </div>
            <div>
                Exams
            </div>
            <div>
                Goal
            </div>
        </div>
        <div className='flex gap-3 '>
            <div>Blog</div>
            <div>Community</div>
        </div>
    </div>
  )
}

export default Navbar