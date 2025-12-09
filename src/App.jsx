

import { Route, Routes, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useEffect, useRef, useState } from 'react'
import Tradiciones from './Tradiciones'
import Recetas from './Recetas'
import Manualidades from './Manualidades'
import Galeria from './Galeria'
import Inicio from './Inicio'

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [ytReady, setYtReady] = useState(false);
  const playerRef = useRef(null);
  const videoId = 'LGrn-3UpPEY';

  // Cargar API de YouTube una sola vez
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setYtReady(true);
      return;
    }
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    // YT llama a esta función global cuando la API está lista
    window.onYouTubeIframeAPIReady = () => {
      setYtReady(true);
    };
  }, []);

  // Inicializa el player cuando API lista y el contenedor existe
  useEffect(() => {
    if (!ytReady) return;
    if (playerRef.current) return;
    const container = document.getElementById('yt-music-player');
    if (!container) return;
    // eslint-disable-next-line no-undef
    playerRef.current = new YT.Player('yt-music-player', {
      height: '0',
      width: '0',
      videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        rel: 0,
        iv_load_policy: 3,
      },
      events: {
        onReady: (e) => {
          try {
            e.target.mute();
            e.target.playVideo();
          } catch (_) {}
        },
        onStateChange: (e) => {
          // 1: playing, 2: paused, 0: ended
          if (e.data === 1) setIsPlaying(true);
          if (e.data === 2 || e.data === 0) setIsPlaying(false);
        }
      }
    });
  }, [ytReady]);

  const toggleMusic = () => {
    const player = playerRef.current;
    if (!player || typeof player.playVideo !== 'function') return;
    const state = player.getPlayerState?.();
    if (state === 1) {
      player.pauseVideo();
      setIsPlaying(false);
    } else {
      try { player.unMute(); } catch (_) {}
      player.playVideo();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <nav className="app-navbar navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container-fluid">
          {/* Logo y nombre */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src="https://w7.pngwing.com/pngs/520/525/png-transparent-christmas-wish-scalable-graphics-merry-christmas-s-wish-text-logo.png" alt="Logo" width="40" height="40" className="me-2"/>
            <span className="fw-bold">Mi Sitio</span>
          </Link>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
              <Link className="nav-link active" to="/tradiciones">Tradiciones</Link>
              <Link className="nav-link active" to="/recetas">Recetas</Link>
              <Link className="nav-link active" to="/manualidades">Manualidades</Link>
              <Link className="nav-link active" to="/galeria">Galeria</Link>
            </div>

            {/* Redes sociales */}
            <div className="ms-3 d-flex gap-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-info">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-danger">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>
      <header className="festive-header">
        {/* Franja superior con luces parpadeantes */}
        <div className="light-strip" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className={`bulb ${['red','green','gold','blue'][i % 4]}`}></span>
          ))}
        </div>

        {/* Copos de nieve cayendo */}
        <div className="snowflakes" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="flake">❄</span>
          ))}
        </div>

        {/* Contenido principal del header */}
        <div className="header-inner">
          {/* Logo pequeño: estrella dorada */}
          <span className="festive-logo" aria-hidden="true">
            <svg width="36" height="36" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img">
              <defs>
                <linearGradient id="goldGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#ffe27a"/>
                  <stop offset="100%" stopColor="#f2b705"/>
                </linearGradient>
              </defs>
              <polygon points="32,4 39,24 60,24 42,36 48,56 32,44 16,56 22,36 4,24 25,24" fill="url(#goldGrad)" stroke="#b8860b" strokeWidth="2"/>
            </svg>
          </span>

          <h1 className="festive-title">Navidad en La Paz</h1>

          {/* Botón de música */}
          <div className="header-controls">
            <button
              className="music-btn"
              onClick={toggleMusic}
              aria-label={isPlaying ? 'Pausar música navideña' : 'Reproducir música navideña'}
              title={isPlaying ? 'Pausar música navideña' : 'Reproducir música navideña'}
            >
              {isPlaying ? '⏸️' : '🎵'}
            </button>
          </div>
        </div>

        {/* Reproductor de YouTube oculto para música */}
        <div id="yt-music-player" aria-hidden="true" style={{position:'absolute', width:0, height:0, overflow:'hidden', pointerEvents:'none'}}></div>
      </header>
      <Routes>
        <Route path='/' element={<Inicio></Inicio>}></Route>
        <Route path='/tradiciones' element={<Tradiciones></Tradiciones>}></Route>
        <Route path='/recetas' element={<Recetas></Recetas>}></Route>
        <Route path='/manualidades' element={<Manualidades></Manualidades>}></Route>
        <Route path='/galeria' element={<Galeria></Galeria>}></Route>
      </Routes>
    </>
  )
}

export default App
