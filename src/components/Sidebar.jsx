import React from 'react'
import {assets} from '../assets/frontend-assets/assets.js'
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

  const navigate = useNavigate();

  return (
  <div className='w-[25%] h-full p-2 hidden lg:flex lg:flex-col gap-2 text-white'>
      <div className='bg-[#121212] rounded flex-none flex flex-col justify-around p-2'>
        <div onClick={()=> navigate('/')} className='nav-item active group flex items-center gap-3 pl-8 cursor-pointer'>
            <img className='w-6 group-hover:scale-110 transition-transform' src={assets.home_icon} alt="" />
            <p className='font-bold'>Home</p>
        </div>
        <div className='nav-item group flex items-center gap-3 pl-8 cursor-pointer'>
            <img className='w-6 group-hover:scale-110 transition-transform' src={assets.search_icon} alt="" />
            <p className='font-bold'>Search</p>
        </div>
      </div>
  <div className='bg-[#121212] rounded flex-1 overflow-auto'>
      <div className='p-4 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <img className='w-8' src={assets.stack_icon} alt="" />
          <p className='feature-text'>Your Library</p>
        </div>
        <div className='flex items-center gap-2'>
          <img className='w-5 cursor-pointer hover:bg-violet-primary/20 rounded-full p-1 transition-all' src={assets.arrow_icon} alt="" />
          <img className='w-5 cursor-pointer hover:bg-violet-primary/20 rounded-full p-1 transition-all' src={assets.plus_icon} alt="" />
        </div>
      </div>
      <div className='browse-item m-2'>
        <h1 className='feature-text mb-2'>Create your first playlist</h1>
        <p className='help-text mb-4'>It's easy we will help you</p>
        <button className='cta-primary'>Create Playlist</button>
      </div>
      <div className='browse-item m-2'>
        <h1 className='feature-text mb-2'>Let's find some podcast to follow</h1>
        <p className='help-text mb-4'>We'll keep you updated on new episodes</p>
        <button className='cta-secondary'>Browse podcasts</button>
      </div>
      </div>
    </div>
  )
}

export default Sidebar
