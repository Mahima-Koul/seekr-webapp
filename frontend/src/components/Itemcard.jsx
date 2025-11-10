import React from 'react'

const Itemcard = ({Item}) => {
  const {title, description, category, image,_id} = Item;
  return (
    <div>
      <img src={image} alt="" className='aspect-video' />
      <span className='ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs'>{category}</span>
    </div>
  )
}

export default Itemcard
