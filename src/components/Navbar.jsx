import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-around bg-slate-600 py-2 font-medium">
        <div className="logo mx-8 text-xl">
            <span className='cursor-pointer hover:font-bold hover:text-white transition-all'>iTask</span>
        </div>
            <ul className='flex gap-6 mx-6'>
                <li className='cursor-pointer hover:font-bold  hover:text-white transition-all'>Home</li>
                <li className='cursor-pointer hover:font-bold hover:text-white transition-all'>Your Task</li>
            </ul>
        
    </nav>
  )
}

export default Navbar
