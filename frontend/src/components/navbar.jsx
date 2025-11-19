import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const {navigate, token}= useAppContext();
  return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
      <img onClick={()=>navigate('/')} src={assets.logo} alt="Seekr Logo" className='w-35 sm:w-40 cursor-pointer'/>
      <button onClick={()=>navigate('/login')} className='flex items-center gap-1 rounded-full text-[15px] cursor-pointer bg-black text-white px-12 py-2.5'>{token? 'Dashboard': 'Login'}
        <img src={assets.arrow} className='w-2' alt='arrow'/>
      </button>
    </div>
  )
}

export default Navbar
