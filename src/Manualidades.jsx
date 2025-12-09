import { useEffect, useMemo, useState } from 'react'

function StepsChecklist({ id, steps }) {
    const key = `craft-steps-${id}`;
    const [done, setDone] = useState(() => {
        try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
    });
    useEffect(() => {
        if (done.length !== steps.length) setDone(Array(steps.length).fill(false));
    }, [steps.length]);
    useEffect(() => {
        try { localStorage.setItem(key, JSON.stringify(done)); } catch { }
    }, [done, key]);
    const toggle = (i) => setDone(prev => prev.map((v, idx) => idx === i ? !v : v));
    const reset = () => setDone(Array(steps.length).fill(false));
    return (
        <div style={{ marginTop: 10 }}>
            <strong>Pasos</strong>
            <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: 6 }}>
                {steps.map((s, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'start', gap: 8, marginBottom: 6 }}>
                        <input type="checkbox" checked={!!done[i]} onChange={() => toggle(i)} />
                        <span style={{ textDecoration: done[i] ? 'line-through' : 'none', opacity: done[i] ? .75 : 1 }}>{s}</span>
                    </li>
                ))}
            </ul>
            <button onClick={reset} style={{ background: '#e5e7eb', color: '#111', border: '1px solid #cbd5e1', borderRadius: 8, padding: '4px 10px', cursor: 'pointer' }}>Reiniciar pasos</button>
        </div>
    );
}

function Materials({ items }) {
    const copy = () => {
        const text = items.map(i => `- ${i}`).join('\n');
        navigator.clipboard.writeText(text).then(() => alert('Materiales copiados')).catch(() => alert('No se pudo copiar'));
    };
    return (
        <div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                <strong>Materiales</strong>
                <button onClick={copy} style={{ marginLeft: 'auto', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '4px 10px', cursor: 'pointer' }}>Copiar materiales</button>
            </div>
            <ul style={{ marginTop: 4, paddingLeft: 18 }}>
                {items.map((m, idx) => (<li key={idx}>{m}</li>))}
            </ul>
        </div>
    );
}

function CraftCard({ craft, onAddToList }) {
    const [fav, setFav] = useState(() => {
        try { return JSON.parse(localStorage.getItem('favCrafts') || '{}'); } catch { return {}; }
    });
    useEffect(() => { try { localStorage.setItem('favCrafts', JSON.stringify(fav)); } catch { } }, [fav]);

    const [expanded, setExpanded] = useState(false);
    const toggleFav = () => setFav(prev => ({ ...prev, [craft.id]: !prev[craft.id] }));
    const [lightbox, setLightbox] = useState(false);

    return (
        <article style={{ border: '1px solid #e5e7eb', background: '#fff', color: '#111', borderRadius: 12, overflow: 'hidden', boxShadow: '0 6px 18px rgba(0,0,0,.08)' }}>
            <div style={{ position: 'relative' }}>
                <img src={craft.image} alt={craft.title} style={{ width: '100%', height: 200, objectFit: 'cover', cursor: 'pointer' }} onClick={() => setLightbox(true)} />
                <span style={{ position: 'absolute', top: 10, left: 10, background: '#0ea5e9', color: '#041316', fontWeight: 700, fontSize: 12, borderRadius: 999, padding: '2px 8px' }}>{craft.tag}</span>
                <button onClick={toggleFav} title="Guardar" style={{ position: 'absolute', top: 10, right: 10, background: fav[craft.id] ? '#ef4444' : 'rgba(255,255,255,.9)', color: fav[craft.id] ? '#fff' : '#111', border: 'none', borderRadius: 999, padding: '6px 10px', cursor: 'pointer' }}>{fav[craft.id] ? '❤️' : '🤍'}</button>
            </div>
            <div style={{ padding: 12 }}>
                <h3 style={{ margin: '0 0 4px' }}>{craft.title}</h3>
                <p style={{ margin: '0 0 8px', opacity: .9 }}>{craft.excerpt}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                    <span style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 999, padding: '2px 8px', fontSize: 12 }}>Dificultad: {craft.diff}</span>
                    <span style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 999, padding: '2px 8px', fontSize: 12 }}>Tiempo: {craft.time}</span>
                    <span style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 999, padding: '2px 8px', fontSize: 12 }}>Costo: {craft.cost}</span>
                </div>
                <Materials items={craft.materials} />
                {craft.templates?.length ? (
                    <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {craft.templates.map((t, i) => (
                            <a key={i} href={t.href} target="_blank" rel="noopener noreferrer" style={{ background: '#22c55e', color: '#0b1b0f', border: 'none', borderRadius: 8, padding: '6px 10px', textDecoration: 'none' }}>Plantilla {t.label}</a>
                        ))}
                    </div>
                ) : null}
                {expanded && (<StepsChecklist id={craft.id} steps={craft.steps} />)}
                <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button onClick={() => setExpanded(e => !e)} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 10px', cursor: 'pointer' }}>{expanded ? 'Ocultar pasos' : 'Ver pasos'}</button>
                    <button onClick={() => onAddToList(craft.materials)} style={{ background: '#111827', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 10px', cursor: 'pointer' }}>Añadir a mi lista</button>
                    <button onClick={() => window.open(craft.source, '_blank')} style={{ background: '#f59e0b', color: '#111', border: 'none', borderRadius: 8, padding: '6px 10px', cursor: 'pointer' }}>Fuente/Inspiración</button>
                </div>
            </div>

            {lightbox && (
                <div onClick={() => setLightbox(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.85)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <button onClick={() => setLightbox(false)} style={{ position: 'absolute', top: 12, right: 12, background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 10px', cursor: 'pointer' }}>Cerrar ✕</button>
                    <img src={craft.image} alt={craft.title} style={{ maxWidth: '92vw', maxHeight: '82vh', objectFit: 'contain', borderRadius: 8, boxShadow: '0 10px 30px rgba(0,0,0,.5)' }} />
                </div>
            )}
        </article>
    );
}

function ShoppingList({ items, setItems }) {
    const unique = useMemo(() => Array.from(new Set(items)), [items]);
    const copy = () => {
        const text = unique.map(i => `- ${i}`).join('\n');
        navigator.clipboard.writeText(text).then(() => alert('Lista copiada')).catch(() => alert('No se pudo copiar'));
    };
    const printList = () => window.print();
    const clear = () => setItems([]);
    return (
        <section style={{ marginTop: 16, padding: '12px', border: '1px solid #e5e7eb', borderRadius: 12, background: '#fff', color: '#111' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <h3 style={{ margin: 0 }}>Mi lista de compras</h3>
                <span style={{ marginLeft: 'auto', fontSize: 12, opacity: .8 }}>{unique.length} ítems</span>
            </div>
            {unique.length === 0 ? (
                <div style={{ opacity: .85 }}>Aún no has agregado materiales. Usa “Añadir a mi lista” en una manualidad.</div>
            ) : (
                <ul style={{ margin: '8px 0', paddingLeft: 18 }}>
                    {unique.map((i, idx) => (<li key={idx}>{i}</li>))}
                </ul>
            )}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                <button onClick={copy} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 10px', cursor: 'pointer' }}>Copiar</button>
                <button onClick={printList} style={{ background: '#111827', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 10px', cursor: 'pointer' }}>Imprimir</button>
                <button onClick={clear} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 10px', cursor: 'pointer' }}>Limpiar</button>
            </div>
        </section>
    );
}

function Manualidades() {
    const crafts = [
        {
            id: 'adornos-arbol',
            title: 'Adornos para el Árbol',
            tag: 'Árbol',
            diff: 'Fácil', time: '30-60 min', cost: 'Bajo',
            excerpt: 'Estrellas, campanas y ángeles con tubos de cartón, bolas recicladas y palitos de helado.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWS1rtvcdXOrAT5Zx7ebPoJ6sBQig1lfl0XQ&s',
            materials: [
                'Tubos de cartón (papel higiénico)',
                'Pintura acrílica y pinceles',
                'Brillantina y lazos',
                'Bolas navideñas viejas',
                'Lana de colores',
                'Palitos de helado',
                'Pegamento fuerte y tijeras'
            ],
            steps: [
                'Cortar los tubos de cartón en tiras y dar forma (estrellas, campanas o ángeles).',
                'Pintar con acrílicos; dejar secar y decorar con brillantina o lazos.',
                'Reciclar bolas navideñas: pegar cintas/botones o cubrir con lana.',
                'Con palitos de helado formar renos/muñecos/estrellas, pintar y decorar.'
            ],
            templates: [
                { label: 'Estrella', href: 'https://example.com/plantillas/estrella.pdf' },
                { label: 'Ángel', href: 'https://example.com/plantillas/angel.pdf' }
            ],
            source: 'https://www.pinterest.com/search/pins/?q=christmas%20crafts'
        },
        {
            id: 'decoracion-hogar',
            title: 'Decoración del Hogar',
            tag: 'Hogar',
            diff: 'Media', time: '60-90 min', cost: 'Medio',
            excerpt: 'Guirnaldas de pompones, coronas con ramas y muñecos de nieve con vasos.',
            image: 'https://i0.wp.com/www.amoble.mx/wp-content/uploads/2021/11/Red-Christmas-Living-Room-Printed-Backdrop-x073.jpg?resize=670%2C675&ssl=1',
            materials: [
                'Lana de colores y cartón para pompones',
                'Cuerda rústica',
                'Ramas de pino, piñas, papel/cartón reciclado',
                'Lazos de tela y bayas artificiales',
                'Vasos plásticos blancos y cartulinas de colores',
                'Pegamento y tijeras'
            ],
            steps: [
                'Tejer pompones de lana en distintos tamaños y unir a una cuerda.',
                'Formar base de corona con ramas/papel; decorar con lazos y bayas.',
                'Pegar vasos plásticos para armar un muñeco; hacer cara/bufanda/sombrero con cartulina.'
            ],
            templates: [
                { label: 'Corona', href: 'https://example.com/plantillas/corona.pdf' }
            ],
            source: 'https://www.pinterest.com/search/pins/?q=christmas%20wreath%20diy'
        },
        {
            id: 'regalos-ideas',
            title: 'Ideas para Regalar o Disfrutar',
            tag: 'Regalos',
            diff: 'Fácil', time: '30-60 min', cost: 'Bajo',
            excerpt: 'Tarjetas caseras, origami de árboles y galletas decoradas en familia.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ0CkA17Lf1whpgvsEqb2pQzDvTjVPoSnefw&s',
            materials: [
                'Papel y cartulina para tarjetas',
                'Sellos/pegatinas con motivos navideños',
                'Papel para origami (verde y marrón)',
                'Ingredientes para galletas y glaseado',
                'Mangas y colorantes alimentarios'
            ],
            steps: [
                'Diseñar tarjetas personalizadas con papel/cartulina y sellos.',
                'Hacer pequeños árboles en origami para adornos/centros de mesa.',
                'Hornear y decorar galletas con glaseado de colores en familia.'
            ],
            templates: [
                { label: 'Tarjeta', href: 'https://example.com/plantillas/tarjeta.pdf' },
                { label: 'Árbol origami', href: 'https://example.com/plantillas/arbol-origami.pdf' }
            ],
            source: 'https://m.media-amazon.com/images/I/81xg8nTTmfL._AC_UF894,1000_QL80_.jpg'
        },
        {
            id: 'farolitos-andinos',
            title: 'Farolitos andinos',
            tag: 'Luz',
            diff: 'Fácil', time: '30-45 min', cost: 'Bajo',
            excerpt: 'Frascos o vasos con papel calado y motivos andinos para iluminar tu mesa.',
            image: 'https://m.media-amazon.com/images/I/81JGejIww0L.jpg',
            materials: [
                'Frascos de vidrio o vasos resistentes al calor',
                'Velas tealight o velas LED',
                'Papel seda o papel vegetal (rojo/verde/dorado)',
                'Tijeras/cúter y pegamento en barra',
                'Marcador para trazar motivos andinos',
                'Cinta o cuerda para decorar (opcional)'
            ],
            steps: [
                'Limpiar y secar bien los frascos/vasos.',
                'Dibujar en el papel motivos andinos (chakana, grecas, estrellas) y recortar (papel calado).',
                'Forrar el frasco por fuera con el papel calado usando pegamento en barra.',
                'Colocar la vela tealight dentro (mejor usar LED por seguridad).',
                'Decorar el borde con cinta o cuerda si se desea.'
            ],
            templates: [
                { label: 'Patrones andinos', href: 'https://example.com/plantillas/patrones-andinos.pdf' }
            ],
            source: 'https://www.pinterest.com/search/pins/?q=christmas%20lantern%20diy'
        }
    ];

    // Filtros y búsqueda
    const [q, setQ] = useState('');
    const [tag, setTag] = useState('Todos');
    const [diff, setDiff] = useState('Todas');
    const [time, setTime] = useState('Todos');
    const [cost, setCost] = useState('Todos');

    const tags = useMemo(() => ['Todos', ...Array.from(new Set(crafts.map(c => c.tag)))], [crafts]);
    const diffs = ['Todas', 'Fácil', 'Media'];
    const times = ['Todos', '≤45', '45–90'];
    const costs = ['Todos', 'Bajo', 'Medio'];

    const inTime = (t) => {
        if (time === 'Todos') return true;
        const min = parseInt(t.split(' ')[0].split('-')[0]);
        if (time === '≤45') return min <= 45;
        if (time === '45–90') return min >= 45 && min <= 90;
        return true;
    };

    const filtered = crafts.filter(c =>
        (tag === 'Todos' || c.tag === tag) &&
        (diff === 'Todas' || c.diff === diff) &&
        (cost === 'Todos' || c.cost === cost) &&
        inTime(c.time) &&
        (c.title.toLowerCase().includes(q.toLowerCase()) || c.excerpt.toLowerCase().includes(q.toLowerCase()))
    );

    // Lista de compras con persistencia
    const [shopping, setShopping] = useState(() => {
        try { return JSON.parse(localStorage.getItem('craftShoppingList') || '[]'); } catch { return []; }
    });
    useEffect(() => { try { localStorage.setItem('craftShoppingList', JSON.stringify(shopping)); } catch { } }, [shopping]);
    const addToList = (materials) => setShopping(prev => [...prev, ...materials]);

    return (
        <>
            <section style={{ position: 'relative', minHeight: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', overflow: 'hidden' }}>
                <img src="https://images.pexels.com/photos/3182807/pexels-photo-3182807.jpeg" alt="Manualidades navideñas" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.45)' }} />
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: 14 }}>
                    <h1 style={{ color: '#f8fafc', margin: 0, textShadow: '0 2px 8px rgba(0,0,0,.6)' }}>Manualidades</h1>
                    <p style={{ color: '#e5edf5', margin: '6px 0 0' }}>Ideas fáciles y creativas para llenar de magia tu hogar en Navidad.</p>
                </div>
            </section>

            {/* Filtros y búsqueda */}
            <section style={{ padding: '12px', background: '#0f172a' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 8, alignItems: 'center' }}>
                    <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar manualidad..." style={{ background: '#fff', color: '#111', border: '1px solid #cbd5e1', borderRadius: 8, padding: '8px 10px' }} />
                    <select value={tag} onChange={e => setTag(e.target.value)} style={{ background: '#fff', color: '#111', border: '1px solid #cbd5e1', borderRadius: 8, padding: '8px 10px' }}>{tags.map(t => (<option key={t}>{t}</option>))}</select>
                    <select value={diff} onChange={e => setDiff(e.target.value)} style={{ background: '#fff', color: '#111', border: '1px solid #cbd5e1', borderRadius: 8, padding: '8px 10px' }}>{diffs.map(d => (<option key={d}>{d}</option>))}</select>
                    <select value={time} onChange={e => setTime(e.target.value)} style={{ background: '#fff', color: '#111', border: '1px solid #cbd5e1', borderRadius: 8, padding: '8px 10px' }}>{times.map(t => (<option key={t}>{t}</option>))}</select>
                    <select value={cost} onChange={e => setCost(e.target.value)} style={{ background: '#fff', color: '#111', border: '1px solid #cbd5e1', borderRadius: 8, padding: '8px 10px' }}>{costs.map(c => (<option key={c}>{c}</option>))}</select>
                </div>
            </section>

            {/* Grid */}
            <section style={{ padding: '14px 12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))', gap: 12 }}>
                    {filtered.map(c => (
                        <CraftCard key={c.id} craft={c} onAddToList={addToList} />
                    ))}
                    {filtered.length === 0 && (
                        <div style={{ color: '#fff', opacity: .9 }}>No hay resultados para los filtros aplicados.</div>
                    )}
                </div>
            </section>

            {/* Lista de compras */}
            <section style={{ padding: '0 12px 20px' }}>
                <ShoppingList items={shopping} setItems={setShopping} />
            </section>
        </>
    )
}

export default Manualidades
