import React from 'react'
import { ModeToggle } from './toggle'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
    return (
        <div className='flex items-center justify-between w-[100%] dark:bg-black dark:text-white text-black border p-2 px-5 md:px-10'>
            <Link to='/' className='text-xl'>HyperGro</Link>
            <ModeToggle/>
        </div>
        
    )
}

export default Navbar