import React from 'react'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Display from './components/Display'
import { Routes, Route } from 'react-router-dom'
import PlayerContextProvider, { PlayerContext } from './context/PlayerContext'
import JioSaavnSearch from './components/JioSaavnSearch'
import { useContext } from 'react'
import Login from './components/Login.jsx';   // ✅ Added Login
import Upload from './pages/Upload.jsx'
import Footer from './components/footer.jsx';
import Register from './components/Register.jsx';   // ✅ Import Register


const App = () => {
  const { audioRef, track } = useContext(PlayerContext);

  return (
    <div className='h-screen bg-black'>
      <div className='h-[90%] flex'>
        <Sidebar />
        <div className='flex-1 overflow-auto'>
          <Routes>
            <Route path='/upload' element={<Upload />} />
            <Route path="/register" element={<Register />} />   {/* ✅ Added Register route */}
            <Route path='/login' element={<Login />} />   {/* ✅ Added Login route */}
            <Route path='/online' element={<JioSaavnSearch />} />
            <Route path='*' element={<Display />} /> {/* ✅ FIXED */}
          </Routes>
        </div>
      </div>
      <Player />
      <audio ref={audioRef} src={track.file} preload='auto'></audio>
      <Footer />
    </div>
  );
};

export default App;
