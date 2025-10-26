import React, { useContext } from 'react'
import Navbar from './Navbar'
import {useParams} from 'react-router-dom'
import { albumsData } from '../assets/frontend-assets/assets';
import { assets, songsData } from '../assets/frontend-assets/assets'
import { PlayerContext } from '../context/PlayerContext';

const DisplayAlbum = () => {
  const{id}=useParams();
  const albumData=albumsData[id];
  const {playWithId}=useContext(PlayerContext)

  return (
    <>
      <Navbar/>
      <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
        <img className='w-48 rounded shadow-lg' src={albumData.image} alt="" />
        <div className='flex flex-col'>
          <p className='text-caption'>Playlist</p>
          <h2 className='heading-xl feature-text mb-4 md:text-7xl'>{albumData.name}</h2>
          <h4 className='text-body-sm'>{albumData.desc}</h4>
          <p className='mt-1 text-caption'>
            <img className='inline-block w-5 mr-2' src={assets.spotify_logo} alt="" />
            <b className='text-body'>APlayer</b>
            <span className='text-caption'> · 1,323,154 likes</span>
            <span className='text-caption'> · <b>50 songs</b></span>
            <span className='text-caption'> · about 2 hr 30 min</span>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-caption items-center">
      <p className='text-body'><b className='mr-4'>Title</b></p>
      <p className='text-caption'>Album</p>
      <p className='text-caption hidden sm:block'>Date Added</p>
      <img className='m-auto w-4' src={assets.clock_icon} alt="" />
      </div>
      <hr className='border-gray-700 my-4' />
      {
        songsData.map((item,index)=>(
          <div onClick={()=> playWithId(item.id)} key={index} className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-caption hover:bg-background-light cursor-pointer rounded'>
            <p className='text-body'>
              <b className='mr-4 text-caption'>{index+1}</b>
              <img className='inline w-10 mr-5 rounded' src={item.image} alt="" />
              <span className='feature-text inline'>{item.name}</span>
            </p>
            <p className='text-body'>{albumData.name}</p>
            <p className='text-body hidden sm:block'>5 days ago</p>
            <p className='text-body text-center'>{item.duration}</p>
          </div>
        ))
      }
    </>
  )
}

export default DisplayAlbum
