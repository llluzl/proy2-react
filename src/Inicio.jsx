import { useEffect, useState } from 'react'

function Inicio() {
  // Contador regresivo hasta Nochebuena (24 de diciembre, 00:00). Si ya pasó, usa el próximo año.
  const computeTarget = () => {
    const now = new Date();
    const year = now.getFullYear();
    const target = new Date(year, 11, 24, 0, 0, 0); // Mes 11 = diciembre
    if (now > target) {
      return new Date(year + 1, 11, 24, 0, 0, 0);
    }
    return target;
  };

  const [targetDate, setTargetDate] = useState(computeTarget);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setTargetDate(computeTarget());
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <>
      <div className="page-bg bg-inicio">
        {/* Banner principal con luces y nieve animada */}
        <section className="inicio-banner" style={{ position: 'relative', padding: '28px 10px 22px', backgroundColor: '#0f172a' }}>
          {/* Franja de luces */}
          <div className="light-strip" aria-hidden="true">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className={`bulb ${['red','green','gold','blue'][i % 4]}`}></span>
            ))}
          </div>

          {/* Copos de nieve */}
          <div className="snowflakes" aria-hidden="true">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="flake">❄</span>
            ))}
          </div>

          {/* Mensaje + Contador */}
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap: 10 }}>
            <h2 className="festive-title" style={{ fontSize: '2.2rem' }}>Descubre la magia de la Navidad en La Paz</h2>
            <div style={{ display: 'flex', gap: 12, color: '#fff', fontWeight: 700 }}>
              <div style={{ background: 'rgba(255,255,255,0.08)', padding: '8px 12px', borderRadius: 8, minWidth: 72 }}>
                <div style={{ fontSize: '1.6rem' }}>{timeLeft.days}</div>
                <div style={{ fontSize: '.8rem', opacity: .9 }}>Días</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.08)', padding: '8px 12px', borderRadius: 8, minWidth: 72 }}>
                <div style={{ fontSize: '1.6rem' }}>{timeLeft.hours}</div>
                <div style={{ fontSize: '.8rem', opacity: .9 }}>Horas</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.08)', padding: '8px 12px', borderRadius: 8, minWidth: 72 }}>
                <div style={{ fontSize: '1.6rem' }}>{timeLeft.minutes}</div>
                <div style={{ fontSize: '.8rem', opacity: .9 }}>Min</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.08)', padding: '8px 12px', borderRadius: 8, minWidth: 72 }}>
                <div style={{ fontSize: '1.6rem' }}>{timeLeft.seconds}</div>
                <div style={{ fontSize: '.8rem', opacity: .9 }}>Seg</div>
              </div>
            </div>
            <p style={{ color:'#e2e8f0', margin: '6px 0 0', maxWidth: 720, textAlign:'center' }}>
              La Paz celebra la Navidad con ferias llenas de artesanías, sabores y música que iluminan la ciudad.
            </p>
          </div>
        </section>

        {/* Carrusel */}
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="false">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://cdn.bolivia.com/sdi/2018/12/11/la-paz-da-la-bienvenida-a-la-navidad-con-villancicos-y-enormes-arboles-693249.jpg" className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5 style={{ color: 'black' }}>La navidad es una de las fechas mas esperadas del año y es una de las brillantes </h5>
                <p style={{ color: 'black' }}>Pasenlo en familia y a disfrutar de la noche buena .</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="https://vision360-s3.cdn.net.ar/s3i233/2024/12/vision360/images/01/46/30/1463076_9c72ee0974ff3e4ce8522b9951ea1d5fd964a58a93323e99de31502ef22e3079/md.webp" className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5>es muy bello no crees </h5>
                <p> en tu ciudad tambien se ve una arbol asi de bello?.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEq0_js5zh-g71zGY00fi64f4IUHUHwwWUxg&s" className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5>Disfrutalo</h5>
                <p>y no pases solo esta navidad pasala con familiares amigos pero nunca solo.</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Mural de deseos (likes + persistencia) */}
        <section style={{ padding: '18px 12px' }}>
          <div style={{ maxWidth: 900, margin: '12px auto 16px', textAlign: 'center' }}>
            <h3 style={{ color: '#fff', marginBottom: 8 }}>Mural de deseos navideños</h3>
            <div style={{ height: 8, borderRadius: 6, background: 'repeating-linear-gradient(90deg, #7a1f2f 0 16px, #e63946 16px 24px, #ffd166 24px 32px, #06d6a0 32px 40px, #118ab2 40px 48px, #8338ec 48px 56px)' }}></div>
          </div>
          <div style={{ maxWidth: 960, margin: '0 auto', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 12, padding: 12 }}>
            <WishBoard />
          </div>
        </section>

        {/* Calendario de eventos con export .ics */}
        <section style={{ padding: '18px 12px' }}>
          <EventsCalendar />
        </section>

        {/* Mini galería temática con lightbox */}
        <section style={{ padding: '18px 12px' }}>
          <ThematicGallery />
        </section>
      </div>
    </>
  )
}

function WishBoard(){
  const [wish, setWish] = useState('');
  const [wishes, setWishes] = useState(() => {
    try {
      const raw = localStorage.getItem('wishes');
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem('wishes', JSON.stringify(wishes)); } catch {}
  }, [wishes]);

  const addWish = (e) => {
    e.preventDefault();
    const text = wish.trim();
    if (!text) return;
    setWishes(prev => [{ id: Date.now(), text, likes: 0 }, ...prev]);
    setWish('');
  };

  const likeWish = (id) => {
    setWishes(prev => prev.map(w => w.id === id ? { ...w, likes: (w.likes || 0) + 1 } : w));
  };

  const top3 = [...wishes].sort((a,b) => (b.likes||0) - (a.likes||0)).slice(0,3);

  return (
    <div style={{ maxWidth: 960, margin: '0 auto' }}>
      <form onSubmit={addWish} style={{ display: 'flex', gap: 8, justifyContent:'center', flexWrap:'wrap' }}>
        <input style={{ background:'#fff', color:'#111', minWidth:'240px', width:'100%', maxWidth:'420px', borderRadius: 8, padding: '8px 10px', border: '1px solid #e2e8f0' }} value={wish} onChange={e => setWish(e.target.value)} placeholder="Mi deseo es..." />
        <button style={{ background:'#16a34a', color:'#fff', border:'none', padding:'8px 12px', borderRadius:8, fontWeight:700, cursor:'pointer' }} type="submit">Añadir</button>
      </form>

      {top3.length > 0 && (
        <div style={{ marginTop: 14 }}>
          <h4 style={{ color:'#fff', textAlign:'center', marginBottom: 8 }}>Top deseos</h4>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap: 10 }}>
            {top3.map(w => (
              <div key={w.id} style={{ background:'rgba(255,255,255,0.12)', color:'#fff', border:'1px solid rgba(255,255,255,0.2)', borderRadius:10, padding:'10px 12px' }}>
                <div>{w.text}</div>
                <div style={{ marginTop: 6, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <button onClick={() => likeWish(w.id)} style={{ background:'#ef4444', color:'#fff', border:'none', borderRadius:8, padding:'4px 10px', cursor:'pointer' }}>❤️ Me inspira</button>
                  <span style={{ fontWeight:700 }}>{w.likes || 0}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px,1fr))', gap: 10, marginTop: 12 }}>
        {wishes.length === 0 && (
          <div style={{ background:'#fff', color:'#111', border:'1px solid #e5e7eb', borderRadius:10, padding:'10px 12px', gridColumn: '1 / -1', textAlign:'center' }}>Tu deseo aparecerá aquí ✨</div>
        )}
        {wishes.map(w => (
          <div key={w.id} style={{ background:'#fff', color:'#111', border:'1px solid #e5e7eb', borderRadius:10, padding:'10px 12px' }}>
            <div>{w.text}</div>
            <div style={{ marginTop: 6, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <button onClick={() => likeWish(w.id)} style={{ background:'#ef4444', color:'#fff', border:'none', borderRadius:8, padding:'4px 10px', cursor:'pointer' }}>❤️ Me inspira</button>
              <span style={{ fontWeight:700 }}>{w.likes || 0}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventsCalendar(){
  const events = [
    { id: 1, title: 'Feria Navideña del Prado', place: 'El Prado', start: '2024-12-15T16:00:00-04:00', end: '2024-12-15T21:00:00-04:00' },
    { id: 2, title: 'Concierto de Villancicos', place: 'Iglesia San Francisco', start: '2024-12-18T19:00:00-04:00', end: '2024-12-18T20:30:00-04:00' },
    { id: 3, title: 'Encendido de luces', place: 'Plaza Murillo', start: '2024-12-10T18:00:00-04:00', end: '2024-12-10T19:30:00-04:00' },
  ];

  const toICSDate = (iso) => {
    const d = new Date(iso);
    const s = d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    return s;
  };

  const downloadICS = (ev) => {
    const now = new Date();
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Navidad La Paz//ES',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${ev.id}@navidad-lapaz`,
      `DTSTAMP:${toICSDate(now.toISOString())}`,
      `DTSTART:${toICSDate(ev.start)}`,
      `DTEND:${toICSDate(ev.end)}`,
      `SUMMARY:${ev.title}`,
      `LOCATION:${ev.place}`,
      'DESCRIPTION:Evento navideño en La Paz',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${ev.title.replace(/\s+/g,'_')}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <h3 style={{ color:'#fff', marginBottom: 10, textAlign:'center' }}>Calendario de eventos</h3>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap: 12 }}>
        {events.map(ev => (
          <div key={ev.id} style={{ background:'rgba(255,255,255,0.08)', color:'#fff', border:'1px solid rgba(255,255,255,0.2)', borderRadius:10, padding:12 }}>
            <div style={{ fontWeight:700 }}>{ev.title}</div>
            <div style={{ opacity:.9 }}>{ev.place}</div>
            <div style={{ fontSize:'.9rem', opacity:.9, marginTop: 6 }}>{new Date(ev.start).toLocaleString()} - {new Date(ev.end).toLocaleTimeString()}</div>
            <button onClick={() => downloadICS(ev)} style={{ marginTop: 8, background:'#2563eb', color:'#fff', border:'none', borderRadius:8, padding:'6px 10px', cursor:'pointer' }}>Agregar a mi calendario (.ics)</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ThematicGallery(){
  const images = [
    { src: 'https://cdn.bolivia.com/sdi/2018/12/11/la-paz-da-la-bienvenida-a-la-navidad-con-villancicos-y-enormes-arboles-693249.jpg', alt:'Navidad La Paz - árbol' },
    { src: 'https://vision360-s3.cdn.net.ar/s3i233/2024/12/vision360/images/01/46/30/1463076_9c72ee0974ff3e4ce8522b9951ea1d5fd964a58a93323e99de31502ef22e3079/md.webp', alt:'Luces navideñas en feria' },
    { src: 'https://comodibujar.club/wp-content/uploads/2023/11/Navidad-1024x566.jpg', alt:'Decoraciones y luces' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEq0_js5zh-g71zGY00fi64f4IUHUHwwWUxg&s', alt:'Noche navideña en ciudad' },
    { src: 'https://i.pinimg.com/originals/6a/8c/52/6a8c52494d77330d7b7c8e8119aeff38.jpg', alt:'Mercado navideño' },
    { src: 'https://i.pinimg.com/originals/8b/c5/03/8bc5039652ebf70db6a7fb7bb99fdd19.jpg', alt:'Artesanías de feria' },
  ];
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const openAt = (i) => { setIndex(i); setOpen(true); };
  const close = () => setOpen(false);
  const prev = () => setIndex(i => (i - 1 + images.length) % images.length);
  const next = () => setIndex(i => (i + 1) % images.length);

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <h3 style={{ color:'#fff', marginBottom: 10, textAlign:'center' }}>Galería navideña</h3>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap: 10 }}>
        {images.map((img,i) => (
          <button key={i} onClick={() => openAt(i)} style={{ padding:0, border:'none', background:'transparent', cursor:'pointer' }}>
            <img src={img.src} alt={img.alt} style={{ width:'100%', height:160, objectFit:'cover', borderRadius:8 }} />
          </button>
        ))}
      </div>

      {open && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex: 2000, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <button onClick={close} aria-label="Cerrar" style={{ position:'absolute', top:12, right:12, background:'#ef4444', color:'#fff', border:'none', borderRadius:8, padding:'6px 10px', cursor:'pointer' }}>Cerrar ✕</button>
          <button onClick={prev} aria-label="Anterior" style={{ position:'absolute', left:10, background:'rgba(255,255,255,0.15)', color:'#fff', border:'none', borderRadius:8, padding:'6px 10px', cursor:'pointer' }}>‹</button>
          <img src={images[index].src} alt={images[index].alt} style={{ maxWidth:'90vw', maxHeight:'80vh', objectFit:'contain', borderRadius:8, boxShadow:'0 10px 30px rgba(0,0,0,.4)' }} />
          <button onClick={next} aria-label="Siguiente" style={{ position:'absolute', right:10, background:'rgba(255,255,255,0.15)', color:'#fff', border:'none', borderRadius:8, padding:'6px 10px', cursor:'pointer' }}>›</button>
        </div>
      )}
    </div>
  );
}

export default Inicio
