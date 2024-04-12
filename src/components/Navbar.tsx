import React from 'react'
import { ModeToggle } from './toggle'

const Navbar: React.FC = () => {
    return (
        <div className='flex items-center justify-between w-[100%] bg-black dark:text-white text-black border p-2 px-5 md:px-10'>
            <p className='text-xl'>HyperGro</p>
            <ModeToggle/>
        </div>
        
    )
}

export default Navbar