import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Header = () => {
  const { setInput } = useAppContext()
  const inputRef = useRef()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setInput(inputRef.current.value)
  }

  const onClear = () => {
    setInput('')
    inputRef.current.value = ''
  }

  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
      <div className='text-center mt-10 mb-8'>
        <h1 className='text-5xl sm:text-6xl font-semibold leading-tight text-gray-700'>
          Find your <span className='text-black'>lost</span> <br /> items
        </h1>

        <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500'>
          Lost it or found it? Get it back!
          Our College Lost and Found helps you report, find, and return items on campus quickly and easily.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className='flex justify-between max-w-lg max-sm:w-[90%] mx-auto border border-gray-300 bg-white rounded overflow-hidden'
        >
          <input
            ref={inputRef}
            type='text'
            placeholder='Search for lost items...'
            required
            className='w-full pl-4 outline-none'
          />
          <button
            type='submit'
            className='bg-black text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer'
          >
            Search
          </button>
        </form>
      </div>

      <div className='text-center'>
        <button
          onClick={onClear}
          className='border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer'
        >
          Clear Search
        </button>
      </div>

      <img
        src={assets.gradientBackground}
        alt=''
        className='absolute -top-32 -z-10 opacity-50'
      />
    </div>
  )
}

export default Header

