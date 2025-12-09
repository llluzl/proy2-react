import { useEffect, useMemo, useState } from 'react'

function Tradiciones() {
    const data = useMemo(() => ([
        {
            id: 'misa-gallo',
            title: 'Misa de Gallo',
            category: 'Religión',
            place: 'Iglesia San Francisco',
            excerpt: 'Celebración a medianoche del 24 de diciembre con cantos y oración.',
            details: 'La Misa de Gallo reúne a familias y comunidades para celebrar el nacimiento de Jesús a medianoche del 24. Recomendación: llegar con anticipación, abrigarse y, si es posible, llevar una vela.',
            images: [
                'https://cdn.bolivia.com/sdi/2024/11/26/inauguran-la-feria-navidena-2024-en-la-paz-1264112.jpg',
                ''
            ],
            mapUrl: 'https://www.google.com/maps?q=Iglesia+San+Francisco+La+Paz'
        },
                {
            id: 'feria-navidenia',
            title: 'Feria Navideña',
            category: 'Ferias',
            place: 'El Prado / Campo Ferial',
            excerpt: 'Artesanías, luces, villancicos y comidas típicas durante diciembre.',
            details: 'La feria navideña reúne a artesanos y familias. Ideal para comprar adornos, ropa para el Niño Jesús y probar buñuelos con api. Recomendación: visitar al atardecer para disfrutar de las luces.',
            images: [
                'https://vision360-s3.cdn.net.ar/s3i233/2024/12/vision360/images/01/46/30/1463076_9c72ee0974ff3e4ce8522b9951ea1d5fd964a58a93323e99de31502ef22e3079/md.webp',
                'https://i.pinimg.com/originals/6a/8c/52/6a8c52494d77330d7b7c8e8119aeff38.jpg'
            ],
            mapUrl: 'https://www.google.com/maps?q=El+Prado+La+Paz'
        },
                {
            id: 'historia-religiosa',
            title: 'La Historia Religiosa (La Natividad)',
            category: 'Religión',
            place: 'Belén / Iglesias',
            excerpt: 'Nacimiento de Jesús: pesebre, pastores y Reyes Magos.',
            details: `Para los cristianos, la Navidad conmemora el nacimiento de Jesús en Belén, hace más de dos mil años. Los relatos bíblicos de Mateo y Lucas describen los eventos clave:
El Nacimiento: Jesús nació en un pesebre (un comedero para animales) porque no había sitio para sus padres, María y José, en la posada.
Los Testigos: Un ángel guió a unos pastores locales para que presenciaran el nacimiento. Más tarde, Reyes Magos de Oriente siguieron una estrella hasta Belén y le ofrecieron regalos de gran valor: oro, incienso y mirra.
El Significado: La historia simboliza que Jesús vino para todas las personas, independientemente de su origen social.`,
            images: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe3J1U4e3tEUeYSYD-DkWCjmWmY9vojEmOyA&s',
                'https://i.pinimg.com/originals/0a/2c/0a/0a2c0a84ab0c313db1b0f5a3a2cff8cb.jpg'
            ],
            mapUrl: 'https://www.google.com/maps?q=Iglesia+San+Francisco+La+Paz'
        },
        {
            id: 'historia-cultural',
            title: 'La Historia Histórica y Cultural',
            category: 'Historia y cultura',
            place: 'La Paz / Tradición',
            excerpt: 'Origen del 25 de diciembre y cristianización de festividades.',
            details: `La celebración de la Navidad el 25 de diciembre no aparece en la Biblia, y muchos historiadores creen que Jesús pudo nacer en otra estación. La fecha se eligió para superponerse a festividades paganas existentes:
Festividades Romanas: Entre el 17 y 23 de diciembre, los romanos celebraban las Saturnales, una festividad en honor a Saturno, el dios de la agricultura. El 25 de diciembre también se celebraba el nacimiento del sol invicto (Dies Natalis Solis Invicti), una fiesta dedicada al dios solar Mitra.
Cristianización: La Iglesia primitiva adoptó estas fechas para facilitar la conversión de los romanos al cristianismo, permitiéndoles mantener un calendario festivo similar, pero con un nuevo significado cristiano.`,
            images: [
                'https://mundialmedios.com/wp-content/uploads/2020/12/los-cuentos-de-navidad.jpg',
                'https://i.pinimg.com/originals/6a/8c/52/6a8c52494d77330d7b7c8e8119aeff38.jpg'
            ],
            mapUrl: 'https://www.google.com/maps?q=La+Paz+Bolivia+Navidad'
        },
        {
            id: 'navidad-en-la-paz',
            title: 'Navidad en la ciudad de La Paz',
            category: 'Ferias',
            place: 'Plaza Murillo, El Prado y barrios',
            excerpt: 'Pesebres, Misa de Gallo, picana y ferias de artesanías.',
            details: `Pesebres y Decoración: El corazón de la decoración navideña es el pesebre o nacimiento, que se arma en los hogares con figuras de barro, musgo y luces. La gente acude a las ferias navideñas para comprar artesanías, adornos y vestimenta para el Niño Jesús.
Misa de Gallo y Nochebuena: La mayoría de los paceños, que son predominantemente católicos, asisten a la tradicional Misa de Gallo a medianoche del 24 de diciembre. Después de la misa, las familias se reúnen para una cena especial y, a medianoche, es común el uso de petardos y fuegos artificiales.
La Picana: El plato principal de la cena de Nochebuena es la picana, un guiso tradicional sustancioso que usualmente lleva una mezcla de carnes (res, cerdo, cordero y pollo), papas, choclo y especias, servido caliente para contrarrestar el frío de la altitud de la ciudad.`,
            images: [
                'https://cdn.bolivia.com/sdi/2018/12/11/la-paz-da-la-bienvenida-a-la-navidad-con-villancicos-y-enormes-arboles-693249.jpg',
                'https://vision360-s3.cdn.net.ar/s3i233/2024/12/vision360/images/01/46/30/1463076_9c72ee0974ff3e4ce8522b9951ea1d5fd964a58a93323e99de31502ef22e3079/md.webp'
            ],
            mapUrl: 'https://www.google.com/maps?q=Plaza+Murillo+La+Paz'
        }
    ]), []);

    // Likes persistentes
    const [likes, setLikes] = useState(() => {
        try { return JSON.parse(localStorage.getItem('likesTradiciones') || '{}'); } catch { return {}; }
    });
    useEffect(() => {
        try { localStorage.setItem('likesTradiciones', JSON.stringify(likes)); } catch { }
    }, [likes]);

    const like = (id) => setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));

    // Filtros y búsqueda
    const categories = ['Todas', 'Religión', 'Gastronomía', 'Ferias', 'Historia y cultura'];
    const [query, setQuery] = useState('');
    const [cat, setCat] = useState('Todas');
    const filtered = data.filter(t => (
        (cat === 'Todas' || t.category === cat) &&
        (t.title.toLowerCase().includes(query.toLowerCase()) || t.excerpt.toLowerCase().includes(query.toLowerCase()))
    ));

    // Expandir tarjeta y lightbox
    const [expandedId, setExpandedId] = useState(null);
    const [lightbox, setLightbox] = useState({ open: false, imgs: [], idx: 0 });

    const shareTrad = async (t) => {
        const text = `${t.title} – ${t.excerpt}`;
        const url = window.location.href + `#trad-${t.id}`;
        if (navigator.share) {
            try { await navigator.share({ title: t.title, text, url }); } catch { }
        } else {
            try {
                await navigator.clipboard.writeText(`${text} ${url}`);
                alert('Enlace copiado al portapapeles');
            } catch {
                alert('Copia este enlace: ' + url);
            }
        }
    };

    return (
        <div className="tradiciones-container">
            <style>{`
        .tradiciones-container {
            background-color: #0c1422;
            background-image:
                radial-gradient(circle at 15% 35%, rgba(255, 230, 180, 0.18), transparent 25%),
                radial-gradient(circle at 80% 55%, rgba(180, 220, 255, 0.15), transparent 25%),
                radial-gradient(circle at 35% 80%, rgba(255, 180, 200, 0.18), transparent 25%),
                radial-gradient(circle at 50% 20%, rgba(190, 255, 210, 0.15), transparent 25%);
            animation: टिमटिमाना 10s ease-in-out infinite;
        }

        @keyframes टिमटिमाना {
            0%, 100% {
                background-position: 0% 0%, 100% 0%, 0% 100%, 100% 100%;
            }
            50% {
                background-position: 5% -10%, 95% 10%, -5% 90%, 105% 90%;
            }
        }
        .hero-trad{position:relative; min-height:220px; display:flex; align-items:center; justify-content:center; background:rgba(15, 23, 42, 0.4); overflow:hidden}
        .hero-trad img{position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:brightness(.45); opacity: 0.8}
        .hero-trad .inner{position:relative; z-index:1; text-align:center; padding:14px}
        .hero-title{color:#f8fafc; font-weight:800; font-size:2rem; text-shadow:0 2px 8px rgba(0,0,0,.6)}
        .hero-sub{color:#e5edf5; max-width:720px; margin:6px auto 0}
        .filters{display:flex; gap:8px; align-items:center; justify-content:center; flex-wrap:wrap; padding:12px}
        .pill{border:1px solid rgba(255,255,255,.35); color:#f8fafc; background:rgba(255,255,255,.12); padding:6px 10px; border-radius:999px; cursor:pointer}
        .pill.active{background:#22c55e; border-color:#22c55e; color:#0b1b0f}
        .search{background: rgba(255,255,255,0.1); color:#fff; border-radius:8px; border:1px solid rgba(255,255,255,0.3); padding:8px 10px; min-width:220px}
        .search::placeholder{ color: rgba(255,255,255,0.6)}
        .grid-trad{display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:12px; padding:12px}
        .card{border:1px solid rgba(255, 255, 255, 0.2); background:rgba(15, 23, 42, 0.6); backdrop-filter: blur(8px); color:#f0f9ff; border-radius:12px; overflow:hidden; transition: transform 0.2s ease, box-shadow 0.2s ease;}
        .card:hover{transform:translateY(-4px); box-shadow:0 12px 28px rgba(0,0,0,.4)}
        .card-img{width:100%; height:160px; object-fit:cover}
        .card-body{padding:10px 12px}
        .tag{display:inline-block; background:#0ea5e9; color:#041316; font-weight:700; font-size:.75rem; border-radius:999px; padding:2px 8px; margin-bottom:6px}
        .btn{border:none; border-radius:8px; padding:6px 10px; cursor:pointer}
        .btn-primary{background:#2563eb; color:#fff}
        .btn-like{background:#ef4444; color:#fff}
        .btn-share{background:#0f766e; color:#f0fdfa}
        .btn-map{background:#f59e0b; color:#111}
        .exp{border-top:1px solid rgba(255,255,255,.2); padding-top:8px; margin-top:8px}
        .thumbs{display:flex; gap:6px; flex-wrap:wrap}
        .thumbs img{width:72px; height:56px; object-fit:cover; border-radius:6px; cursor:pointer; border:1px solid #e5e7eb}
        .lightbox{position:fixed; inset:0; background:rgba(0,0,0,.9); z-index:3000; display:flex; align-items:center; justify-content:center}
        .lightbox img{max-width:92vw; max-height:82vh; object-fit:contain; border-radius:8px; box-shadow:0 10px 30px rgba(0,0,0,.5)}
        .lx-btn{position:absolute; top:12px; background:rgba(255,255,255,.25); color:#fff; border:none; border-radius:8px; padding:6px 10px; cursor:pointer}
        .lx-close{right:12px}
        .lx-prev{left:12px; top:50%; transform:translateY(-50%)}
        .lx-next{right:12px; top:50%; transform:translateY(-50%)}
      `}</style>

            {/* Hero */}
            <section className="hero-trad">
                <img src="https://images.pexels.com/photos/3811105/pexels-photo-3811105.jpeg" alt="Tradiciones navideñas en La Paz" />
                <div className="inner">
                    <h1 className="hero-title">Tradiciones</h1>
                    <p className="hero-sub">Costumbres paceñas que llenan de luz la Navidad: gastronomía, fe, ferias y música.</p>
                </div>
            </section>

            {/* Filtros y búsqueda */}
            <div className="filters">
                {categories.map(c => (
                    <button key={c} className={`pill ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{c}</button>
                ))}
                <input className="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar tradición..." />
            </div>

            {/* Grid de tarjetas */}
            <div className="grid-trad">
                {filtered.map(t => (
                    <article key={t.id} id={`trad-${t.id}`} className="card">
                        <img className="card-img" src={t.images[0]} alt={t.title} />
                        <div className="card-body">
                            <span className="tag">{t.category}</span>
                            <h3 style={{ margin: '4px 0 6px' }}>{t.title}</h3>
                            <div style={{ opacity: .9, fontSize: '.95rem' }}>{t.excerpt}</div>
                            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
                                <button className="btn btn-primary" onClick={() => setExpandedId(expandedId === t.id ? null : t.id)}>
                                    {expandedId === t.id ? 'Cerrar' : 'Leer más'}
                                </button>
                                <button className="btn btn-like" onClick={() => like(t.id)}>❤️ {likes[t.id] || 0}</button>
                                <button className="btn btn-share" onClick={() => shareTrad(t)}>Compartir</button>
                                <a className="btn btn-map" href={t.mapUrl} target="_blank" rel="noopener noreferrer">Ver en mapa</a>
                            </div>

                            {expandedId === t.id && (
                                <div className="exp">
                                    <div style={{ marginBottom: 8 }}>{t.details}</div>
                                    <div style={{ fontSize: '.9rem', opacity: .9 }}>Lugar: {t.place}</div>
                                    <div className="thumbs" style={{ marginTop: 8 }}>
                                        {t.images.map((img, i) => (
                                            <img key={i} src={img} alt={`${t.title} ${i + 1}`} onClick={() => setLightbox({ open: true, imgs: t.images, idx: i })} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </article>
                ))}
                {filtered.length === 0 && (
                    <div style={{ color: '#fff', opacity: .9, 'grid-column': '1 / -1', 'text-align': 'center' }}>No hay resultados para tu búsqueda.</div>
                )}
            </div>

            {/* Lightbox */}
            {lightbox.open && (
                <div className="lightbox" onClick={() => setLightbox(s => ({ ...s, open: false }))}>
                    <button className="lx-btn lx-close" onClick={() => setLightbox(s => ({ ...s, open: false }))}>Cerrar ✕</button>
                    <button className="lx-btn lx-prev" onClick={(e) => { e.stopPropagation(); setLightbox(s => ({ ...s, idx: (s.idx - 1 + s.imgs.length) % s.imgs.length })) }}>‹</button>
                    <img src={lightbox.imgs[lightbox.idx]} alt="imagen tradición" onClick={(e) => e.stopPropagation()} />
                    <button className="lx-btn lx-next" onClick={(e) => { e.stopPropagation(); setLightbox(s => ({ ...s, idx: (s.idx + 1) % s.imgs.length })) }}>›</button>
                </div>
            )}
        </div>
    )
}

export default Tradiciones
