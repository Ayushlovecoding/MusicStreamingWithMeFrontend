import React, { useState, useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import API_BASE_URL from '../config/api';

export default function JioSaavnSearch() {
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [songs, setSongs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const { playRemote } = useContext(PlayerContext);

  // Function to search for songs
  async function searchSongs(e) {
    e?.preventDefault();
    
    if (!searchText || searchText.trim().length === 0) {
      setErrorMessage('Please type something to search');
      return;
    }

    setIsSearching(true);
    setErrorMessage('');
    setSongs([]);

    try {
      // ✅ FIXED: Use full backend URL
      const response = await fetch(
        `${API_BASE_URL}/api/jiosaavn/search/songs?query=${encodeURIComponent(searchText)}&page=1&limit=20`
      );

      if (!response.ok) {
        throw new Error(`Search failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      let foundSongs = [];
      
      if (data.data && data.data.results) {
        foundSongs = data.data.results;
      } else if (data.results) {
        foundSongs = data.results;
      } else if (Array.isArray(data.data)) {
        foundSongs = data.data;
      } else if (Array.isArray(data)) {
        foundSongs = data;
      }

      if (foundSongs.length === 0) {
        setErrorMessage('No songs found. Try a different search term.');
      } else {
        setSongs(foundSongs);
      }

    } catch (error) {
      console.error('Search error:', error);
      setErrorMessage('Failed to search. Please try again.');
    } finally {
      setIsSearching(false);
    }
  }

  function getSongUrl(song) {
    if (song.downloadUrl && Array.isArray(song.downloadUrl) && song.downloadUrl.length > 0) {
      const bestQuality = song.downloadUrl[song.downloadUrl.length - 1];
      return bestQuality.url || bestQuality.link;
    }
    return song.url || song.media_url || song.media_preview_url || null;
  }

  function getSongImage(song) {
    if (song.image) {
      if (Array.isArray(song.image) && song.image.length > 0) {
        const highQuality = song.image[song.image.length - 1];
        return highQuality.url || highQuality.link;
      }
      if (typeof song.image === 'string') {
        return song.image;
      }
    }
    return song.albumImage || '/placeholder-album.png';
  }

  function getArtistName(song) {
    if (song.artists && song.artists.primary) {
      return song.artists.primary.map(a => a.name).join(', ');
    }
    return song.primaryArtists || song.artist || song.more_info?.artistMap?.primary_artists?.map(a => a.name).join(', ') || 'Unknown Artist';
  }

  function playSong(song) {
    const songUrl = getSongUrl(song);
    
    if (!songUrl) {
      setErrorMessage('Cannot play this song - no URL found');
      return;
    }

    const songInfo = {
      streamUrl: songUrl,
      name: song.name || song.title || 'Unknown Song',
      artist: getArtistName(song),
      image: getSongImage(song),
      source: 'jiosaavn'
    };

    console.log('Playing song:', songInfo);
    playRemote(songInfo);
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="heading-xl feature-text mb-4">Search Online Songs</h1>
        
        <form onSubmit={searchSongs} className="flex gap-3">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search for songs, artists, albums..."
            className="search-box flex-1 text-white"
          />
          <button
            type="submit"
            className="cta-primary px-8"
            disabled={isSearching}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {errorMessage && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded mb-6">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {songs.map((song, index) => (
          <div
            key={song.id || index}
            className="browse-item flex gap-4 p-4"
          >
            <img
              src={getSongImage(song)}
              alt={song.name || song.title}
              className="w-20 h-20 object-cover rounded shadow-lg"
              onError={(e) => {
                e.target.src = '/placeholder-album.png';
              }}
            />

            <div className="flex-1 min-w-0">
              <h3 className="feature-text text-sm mb-1 truncate">
                {song.name || song.title || 'Unknown'}
              </h3>
              <p className="text-caption mb-3 truncate">
                {getArtistName(song)}
              </p>

              <button
                onClick={() => playSong(song)}
                className="btn-primary text-xs px-4 py-1.5"
              >
                ▶ Play
              </button>
            </div>
          </div>
        ))}
      </div>

      {!isSearching && songs.length === 0 && !errorMessage && (
        <div className="text-center text-caption mt-12">
          <p className="text-2xl mb-2">🎵</p>
          <p>Search for your favorite songs above</p>
        </div>
      )}
    </div>
  );
}