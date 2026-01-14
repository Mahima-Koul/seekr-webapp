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
    <div className='px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 relative'>
      <div className='text-center mt-6 sm:mt-8 md:mt-10 mb-6 sm:mb-8'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-gray-700 px-2'>
          Find your <span className='text-black'>lost</span> <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>items
        </h1>
        <p className='my-4 sm:my-6 md:my-8 max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-gray-500 px-4'>
          Lost it or found it? Get it back!
          Our College Lost and Found helps you report, find, and return items on campus quickly and easily.
        </p>
        <form
          onSubmit={onSubmitHandler}
          className='flex flex-col sm:flex-row justify-between max-w-lg w-full sm:w-auto mx-auto border border-gray-300 bg-white rounded overflow-hidden px-4 sm:px-0'
        >
          <input
            ref={inputRef}
            type='text'
            placeholder='Search for lost items...'
            required
            className='w-full py-3 sm:py-0 sm:pl-4 outline-none text-sm sm:text-base'
          />
          <button
            type='submit'
            className='bg-black text-white px-6 sm:px-8 py-2.5 sm:py-2 my-2 sm:m-1.5 rounded sm:rounded hover:scale-105 transition-all cursor-pointer text-sm sm:text-base'
          >
            Search
          </button>
        </form>
      </div>
      <div className='text-center mb-6 sm:mb-8'>
        <button
          onClick={onClear}
          className='border font-light text-xs sm:text-sm py-1.5 sm:py-1 px-4 sm:px-3 rounded-sm shadow-sm cursor-pointer hover:bg-gray-50 transition-colors'
        >
          Clear Search
        </button>
      </div>
      <img
        src={assets.gradientBackground}
        alt=''
        className='absolute -top-20 sm:-top-32 left-0 right-0 -z-10 opacity-50 w-full'
      />
    </div>
  )
}

export default Header
