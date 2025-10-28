import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/frontend-assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  // Play local song by ID
  const playWithId = async (id) => {
    const song = songsData.find((item) => item.id === id);
    if (song) {
      setTrack(song);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };

  // Play remote song (from JioSaavn)
  const playRemote = async (songInfo) => {
    try {
      console.log('Playing remote song:', songInfo);

      // Create a track object similar to local songs
      const remoteTrack = {
        id: 'remote-' + Date.now(),
        name: songInfo.name || 'Unknown Song',
        desc: songInfo.artist || 'Unknown Artist',
        image: songInfo.image || '/placeholder-album.png',
        file: songInfo.streamUrl,
        source: 'remote'
      };

      setTrack(remoteTrack);
      
      // Pause current audio first
      audioRef.current.pause();
      
      // Try direct URL first
      audioRef.current.src = songInfo.streamUrl;
      audioRef.current.crossOrigin = 'anonymous';
      
      try {
        await audioRef.current.play();
        setPlayStatus(true);
      } catch (error) {
        console.log('Direct play failed, trying proxy...');
        
        // Fallback to proxy
        const proxyUrl = `https://musicstreamingbyayush-sharma.netlify.app/api/jiosaavn/stream?url=${encodeURIComponent(songInfo.streamUrl)}`;
        audioRef.current.src = proxyUrl;
        
        await audioRef.current.play();
        setPlayStatus(true);
      }
      
    } catch (error) {
      console.error('Failed to play remote song:', error);
      alert('Failed to play this song. Please try another one.');
    }
  };

  // Play/Pause controls
  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  // Next/Previous song
  const previous = async () => {
    if (track.id > 0) {
      await playWithId(track.id - 1);
    }
  };

  const next = async () => {
    if (track.id < songsData.length - 1) {
      await playWithId(track.id + 1);
    }
  };

  // Seek functionality
  const seekSong = async (e) => {
    const seekPosition = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
    audioRef.current.currentTime = seekPosition;
  };

  // Update time
  useEffect(() => {
    const audio = audioRef.current;
    
    const updateTime = () => {
      if (audio.duration) {
        seekBar.current.style.width = Math.floor((audio.currentTime / audio.duration) * 100) + "%";
        
        setTime({
          currentTime: {
            second: Math.floor(audio.currentTime % 60),
            minute: Math.floor(audio.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audio.duration % 60),
            minute: Math.floor(audio.duration / 60),
          },
        });
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateTime);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateTime);
    };
  }, []);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    playRemote, // Make sure this is exported
    previous,
    next,
    seekSong,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;