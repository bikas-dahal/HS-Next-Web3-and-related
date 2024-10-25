import React from 'react'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className='bg-red-400 h-10 items-center px-3 flex justify-between '>
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