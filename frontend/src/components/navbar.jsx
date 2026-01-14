import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { Link } from "react-router-dom";


const Navbar = () => {
  const { navigate, token } = useAppContext();
  
  return (
    <div className='flex justify-between items-center py-4 sm:py-5 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32'>
      <Link to={'/'}>
      <img
        src={assets.logo}
        alt="Seekr Logo"
        className="h-10 sm:h-12 md:h-14 w-auto cursor-pointer"
      />
      </Link>
      <button
        onClick={() => navigate(token ? '/dashboard' : '/login')}
        className='flex items-center gap-1 sm:gap-2 rounded-full text-sm sm:text-base cursor-pointer bg-black text-white px-6 sm:px-10 md:px-12 py-2 sm:py-2.5 hover:bg-gray-800 transition-colors'
      >
        {token ? 'Dashboard' : 'Login'}
        <img src={assets.arrow} className='w-2 sm:w-2.5' alt='arrow' />
      </button>
    </div>
  )
}

export default Navbar
