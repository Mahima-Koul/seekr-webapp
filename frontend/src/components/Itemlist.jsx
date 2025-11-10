import React from 'react'
import { itemCategories } from '../assets/assets.js'
import { motion } from "motion/react"


const Itemlist = () => {
  const[menu,setMenu]=React.useState('All');
  return (
    <div>
      <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
        {itemCategories.map((item)=>(
          <div key={item} className='relative'>
            <button onClick={()=>setMenu(item)}className={`cursor-pointer text-gray-500 ${menu === item && 'text-white px-4 pt-0.5'}`}>
              {item}
              {menu === item &&(<motion.div layoutId='underline' 
              transition={{type:'spring', stiffness:500, damping:30}}
              className='absolute left-0 top-0 right-0 h-7 -z-1 bg-gray-600 rounded-full'></motion.div>)}
              
            </button>
          </div>

        ))}

      </div>
      <div>
        {/*item card*/}
      </div>







      
    </div>
  )
}

export default Itemlist
