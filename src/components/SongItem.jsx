import React, { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'

const SongItem =({name,image,desc,id}) => {
  
  const {playWithId}= useContext(PlayerContext)
  
  return (
    <div onClick= {()=> playWithId(id)} className='min-w-[180px] p-2 px-3 rounded cursor-pointer browse-item'>
      <img className='rounded mb-2 shadow-sm' src={image} alt="" />
       <p className='feature-text mb-1'>{name}</p>
       <p className='text-caption'>{desc}</p>
    </div>
  )
}

export default SongItem
