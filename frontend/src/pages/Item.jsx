import React from 'react'
import { useParams } from 'react-router-dom'
import { Item_data, assets, comments_data } from '../assets/assets';
import Navbar from '../components/navbar.jsx'
import Moment from 'moment';
import Loader from '../components/Loader.jsx';
import { useAppContext } from '../context/AppContext.jsx';
import toast from 'react-hot-toast';

const Item = () => {
  const {id} = useParams();
  const {axios} = useAppContext()

  const [data, setData] = React.useState(null);
  const [comments, setComments] = React.useState([]);
  const [name, setName] = React.useState('');
  const [content, setContent] = React.useState('');
  
  
  const fetchItemData = async () => {
    try {
      const {data}= await axios.get(`/api/item/${id}`)
      data.success? setData(data.item):toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }
  const addComment = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post('/api/item/add-comment', {
      item: id,
      name,
      content,
    });

    if (data.success) {
      toast.success(data.message);
      setName('');
      setContent('');
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

  
  React.useEffect(() => {
    fetchItemData();
  }, [id]);
  
  return (
    <div className='relative'>
      <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50'></img>
      <Navbar/>
      
      {data ? (
        <div>
          <div className='text-center mt-20 text-gray-600'>
            <p className='text-gray-500 py-4 font-medium'>Reported on {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
            <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
            <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subTitle}</h2>
          </div>
          
          <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
            <img src={data.image} alt={data.title} className='rounded-3xl mb-5'/>
            <div className='rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML={{__html:data.description}}></div>
            
            <div className='mt-14 mb-10 max-w-3xl mx-auto'>
              <p className='font-semibold text-lg mb-4'>Comments ({comments.length})</p>
              <div className='flex flex-col gap-4'>
                {comments.map((item, index) => (
                  <div key={index} className='relative bg-primary/2 p-4 border border-primary/5 max-w-xl rounded text-gray-600'>
                    <div className='flex items-center gap-2 mb-2'>
                      <img src={assets.user_icon} alt="user icon" className='w-6'/>
                      <p className='font-medium'>{item.name}</p>
                    </div>
                    <p className='text-sm max-w-md ml-8'>{item.content}</p>
                    <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>
                      {Moment(item.createdAt).fromNow()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='max-w-3xl mx-auto'>
              <p className='font-semibold mb-4'>Add a Comment</p>
              <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>
                <input onChange={(e)=> setName(e.target.value)} value={name} type="text" placeholder='Name' required className='w-full p-2 border border-gray-300 rounded outline-none'/>
                <textarea onChange={(e)=> setContent(e.target.value)} value={content} placeholder='Your Comment' required className='w-full p-2 border border-gray-300 rounded outline-none h-48'></textarea>
                <button type="submit" className='bg-primary text-white px-8 p-2 rounded hover:scale-102 transition-all cursor-pointer'>Submit Comment</button>
              </form>
            </div>
          </div>
        </div>
      ) : (<Loader/>
      )}
    </div>
  )
}

export default Item