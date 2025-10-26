import React from 'react'
import Navbar from './Navbar'
import { albumsData } from '../assets/frontend-assets/assets'
import AlbumItem from './AlbumItem'
import { songsData } from '../assets/frontend-assets/assets'
import SongItem from './SongItem'

const DisplayHome = () => {
  return (
    <>
      <Navbar />
    <div className='mb-6'>
    <h2 className='heading-lg feature-text my-5'>Featured Charts</h2>
    <div className='flex overflow-auto gap-4'>
      {albumsData.map((item,index)=>(<AlbumItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />))}
    </div> 
    </div>
    <div className='mb-6'>
    <h2 className='heading-lg feature-text my-5'>Today's biggest hits</h2>
    <div className='flex overflow-auto gap-4'>
      {songsData.map((item,index)=>(<SongItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image}/>))}
    </div> 
    </div>
    </>
  )
}

export default DisplayHome
