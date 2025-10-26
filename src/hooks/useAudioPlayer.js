import { useEffect, useRef, useState } from 'react';

// Simple audio player hook that supports playing direct remote URLs and will
// automatically fall back to a server-side stream proxy if direct playback
// fails due to CORS or other restrictions.
//
// Usage:
// const { audioRef, current, playUrl, pause } = useAudioPlayer();
// playUrl('https://...mp3', { title:'..', artist:'..', image:'..' })

export default function useAudioPlayer() {
  const audioRef = useRef(null);
  const [current, setCurrent] = useState({ url: null, meta: null, playing: false });

  // create audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.crossOrigin = 'anonymous';
    audio.preload = 'auto';

    const onPlay = () => setCurrent(c => ({ ...c, playing: true }));
    const onPause = () => setCurrent(c => ({ ...c, playing: false }));
    const onEnded = () => setCurrent(c => ({ ...c, playing: false }));
    const onError = (e) => {
      console.error('Audio element error', e);
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    audioRef.current = audio;

    return () => {
      audio.pause?.();
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      audioRef.current = null;
    };
  }, []);

  // Play url with optional metadata. If the direct url fails (audio error),
  // try the server stream proxy at /api/jiosaavn/stream?url=<encoded>.
  async function playUrl(url, meta = null) {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    setCurrent({ url, meta, playing: false });

    let triedProxy = false;

    // error handler tries proxy fallback once
    const onErr = async () => {
      console.warn('Audio failed to play directly, attempting proxy fallback');
      audio.removeEventListener('error', onErr);
      if (triedProxy) return;
      triedProxy = true;
      try {
        const proxied = `/api/jiosaavn/stream?url=${encodeURIComponent(url)}`;
        audio.src = proxied;
        await audio.play();
        setCurrent(c => ({ ...c, url: proxied, meta, playing: true }));
      } catch (err) {
        console.error('Proxy playback failed', err);
      }
    };

    audio.addEventListener('error', onErr);

    try {
      audio.src = url;
      audio.crossOrigin = 'anonymous';
      await audio.play();
      setCurrent(c => ({ ...c, playing: true }));
    } catch (err) {
      // play() rejected (autoplay policy, not user gesture) or other error
      console.warn('play() rejected or failed, will rely on error handler to fallback', err?.message);
      // leave onErr to try proxy when actual playback is attempted
    }
  }

  function pause() {
    if (!audioRef.current) return;
    audioRef.current.pause();
  }

  function stop() {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setCurrent({ url: null, meta: null, playing: false });
  }

  return { audioRef, current, playUrl, pause, stop };
}
