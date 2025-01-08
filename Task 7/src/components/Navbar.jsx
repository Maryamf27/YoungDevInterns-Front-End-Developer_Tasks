import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-between text-white bg-slate-900 py-2'>
            <div className="logo">
                <span className="font-bold text-xl mx-8">iTask</span>
            </div>
            <ul className="flex gap-8 mx-9">
                <li className='cursor-pointer transition-all hover:font-bold'>Home</li>
                <li className='cursor-pointer transition-all hover:font-bold'> Your Tasks</li>
            </ul>
        </nav>
    )
}

export default Navbar


