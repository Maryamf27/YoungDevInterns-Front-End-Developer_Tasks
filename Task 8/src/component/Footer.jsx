import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 text-white flex justify-center items-center flex-col w-full'>
            <div className="logo font-bold text-white text-2xl">
                <span className='text-green-500'>  &lt;</span>
                Pass
                <span className='text-green-500'>OP/&gt;</span>

            </div>
            <div className='flex justify-center items-center gap-1'>
                Created with <img className='h-6' src="/icons/heart.svg" alt="" /> by CodeWithMimi
            </div>
        </div>
    )
}

export default Footer
