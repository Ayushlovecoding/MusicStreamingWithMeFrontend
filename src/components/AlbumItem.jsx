import React from 'react'
import { useNavigate } from 'react-router-dom'
const AlbumItem = ({image,name,desc,id}) => {

  const navigate=useNavigate()

  return (
    <div onClick={()=>navigate(`/album/${id}`)} className='min-w-[180px] p-2 px-3 rounded cursor-pointer browse-item'>
      <img className='rounded mb-2 shadow-sm' src={image} alt="" />
      <p className='feature-text mb-1'>{name}</p>
      <p className='text-caption'>{desc}</p>
    </div>
  )
}

export default AlbumItem
