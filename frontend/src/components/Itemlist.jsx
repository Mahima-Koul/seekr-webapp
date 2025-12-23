import React from 'react'
import { Item_data, itemCategories } from '../assets/assets.js'
import Itemcard from '../components/Itemcard'
import { motion } from "motion/react"
import { useAppContext } from '../context/AppContext.jsx'



const Itemlist = () => {
  const [menu, setMenu] = React.useState('All');
  const { items, input } = useAppContext()

//for filtering
const electronicsItems = items.filter(item => item.type === "Electronics");
const stationeryItems = items.filter(item => item.type === "Books & Stationery");
const idcards= items.filter(item => item.type === "ID & Cards");
const otherItems = items.filter(item =>
  item.type !== "Electronics" && item.type !== "Books & Stationery" && item.type !== "ID & Cards"
);

  const filteredItems = () => {
    if (input === '') {
      return items
    }
    {/*mage chnges here added item.name ||'' and did item.category instaead of items.catgory nd item.category to item.description*/}
    return items.filter((item) => (item.title || item.name || '').toLowerCase().includes(input.toLowerCase()) || item.description.toLowerCase().includes(input.toLowerCase()))
  }

  return (
    <div>
      <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
        {itemCategories.map((item) => (
          <div key={item} className='relative'>
            <button onClick={() => setMenu(item)} className={`cursor-pointer text-gray-500 ${menu === item && 'text-white px-4 pt-0.5'}`}>
              {item}
              {menu === item && (<motion.div layoutId='underline'
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className='absolute left-0 top-0 right-0 h-7 -z-1 bg-gray-600 rounded-full'></motion.div>)}

            </button>
          </div>

        ))}

      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
        {/*chnged itemcategory to item.type*/}
        {filteredItems().filter((Item) => menu === 'All' || Item.type === menu)
          .map((Item) => <Itemcard key={Item._id} Item={Item} />)}
      </div>








    </div>
  )
}

export default Itemlist
