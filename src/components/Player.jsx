import React, { useContext } from 'react'
import { assets } from '../assets/frontend-assets/assets'
import { PlayerContext } from '../context/PlayerContext'

const Player = () => {
  const {track,seekBar,seekBg,playStatus,play,pause,time,previous,next,seekSong}=useContext(PlayerContext); 

  return (
    <div className='h-[10%] bg-background-dark flex justify-between items-center text-white px-4 border-t border-background-light'>
      <div className='hidden lg:flex items-center gap-4'>
        <img className='w-12 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300' src={track.image} alt="" />
        <div>
            <p className='heading-md mb-0 text-gradient hover:text-accent-glow transition-all duration-300'>{track.name}</p>
            <p className='text-caption'>{track.desc.slice(0,12)}</p>
        </div>
      </div>
      <div className='flex flex-col items-center gap-1 m-auto'>
        <div className='flex gap-4'>
            <img className='w-4 cursor-pointer opacity-60 hover:opacity-100 hover:text-accent transition-all duration-300' src={assets.shuffle_icon} alt="" />
            <img onClick={previous} className='w-4 cursor-pointer opacity-60 hover:opacity-100 hover:text-accent transition-all duration-300' src={assets.prev_icon} alt="" />
            {playStatus
            ?<img onClick={pause} className='w-5 cursor-pointer text-accent hover:text-primary hover:scale-110 transition-all duration-300' src={assets.pause_icon} alt="" />
            :<img onClick={play} className='w-5 cursor-pointer text-accent hover:text-primary hover:scale-110 transition-all duration-300' src={assets.play_icon} alt="" />
            }
            <img onClick={next} className='w-4 cursor-pointer opacity-60 hover:opacity-100 hover:text-accent transition-all duration-300' src={assets.next_icon} alt="" />
            <img className='w-4 cursor-pointer opacity-60 hover:opacity-100 hover:text-accent transition-all duration-300' src={assets.loop_icon} alt="" />
        </div>
        <div className='flex items-center gap-5'>
            <p className='text-caption'>{time.currentTime.minute}:{time.currentTime.second}</p>
            <div ref={seekBg} onClick={seekSong} className='w-[60vw] max-w-[500px] bg-background-light rounded-full cursor-pointer group'>
                <hr ref={seekBar} className='h-1 border-none w-0 bg-gradient rounded-full group-hover:h-2 transition-all duration-300' />
            </div>
            <p className='text-caption'>{time.totalTime.minute}:{time.totalTime.second}</p>
        </div>
      </div>
      <div className='hidden lg:flex items-center gap-3'>
        <img className='w-4 cursor-pointer opacity-60 hover:opacity-100 hover:text-accent transition-all duration-300' src={assets.plays_icon} alt="" />
        <img className='w-4 cursor-pointer opacity-60 hover:opacity-100 hover:text-accent transition-all duration-300' src={assets.mic_icon} alt="" />
        <img className='w-4 cursor-pointer opacity-60 hover:opacity-100 hover:text-accent transition-all duration-300' src={assets.queue_icon} alt="" />
        <img className='w-4 cursor-pointer opacity-60 hover:opacity-100 hover:text-accent transition-all duration-300' src={assets.speaker_icon} alt="" />
        <img className='w-4 cursor-pointer opacity-60 hover:opacity-100 hover:text-accent transition-all duration-300' src={assets.volume_icon} alt="" />
        <div className='w-20 bg-background-light h-1 rounded-full group cursor-pointer'>
          <div className='h-full w-1/2 bg-gradient rounded-full group-hover:h-2 transition-all duration-300'></div>
        </div>
        <img className='w-4 cursor-pointer opacity-60 hover:opacity-100 hover:text-accent transition-all duration-300' src={assets.mini_player_icon} alt="" />
        <img className='w-4 cursor-pointer opacity-60 hover:opacity-100 hover:text-accent transition-all duration-300' src={assets.zoom_icon} alt="" />
      </div>
    </div>
  )
}

export default Player
