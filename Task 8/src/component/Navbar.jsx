import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='bg-slate-800  text-white w-full'>
        <div className="my-cont flex justify-between w-full items-center px-4  py-5 h-14">

        <div className="logo font-bold text-white text-2xl">
        <span className='text-green-500'>  &lt;</span>
          Pass
          <span className='text-green-500'>OP/&gt;</span>
        
          </div>
        {/* <ul>
            <li className='flex gap-4'>
                <a className='hover:font-bold' href="/">Home</a>
                <a className='hover:font-bold' href="/">Contact</a>
                <a className='hover:font-bold' href="/">About</a>
            </li>
        </ul> */}
        <button className='text-white bg-green-700 rounded-full flex gap-2 items-center p-1 justify-between ring-white ring-1'> 
          <img className='invert h-10' src="/icons/gihub.svg" alt="Github logo" />
          <span className='font-bold'>Github</span>
        </button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
