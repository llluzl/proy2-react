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
                            <span key={i} className={`bulb ${['red', 'green', 'gold', 'blue'][i % 4]}`}></span>
                        ))}
                    </div>

                    {/* Copos de nieve */}
                    <div className="snowflakes" aria-hidden="true">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <span key={i} className="flake">❄</span>
                        ))}
                    </div>

                    {/* Mensaje + Contador */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
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
                        <p style={{ color: '#e2e8f0', margin: '6px 0 0', maxWidth: 720, textAlign: 'center' }}>
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

                {/* Mural de deseos */}
                <section style={{ padding: '18px 12px' }}>
                    <div style={{ maxWidth: 900, margin: '12px auto 16px', textAlign: 'center' }}>
                        <h3 style={{ color: '#fff', marginBottom: 8 }}>Mural de deseos navideños</h3>
                        <div style={{ height: 8, borderRadius: 6, background: 'repeating-linear-gradient(90deg, #7a1f2f 0 16px, #e63946 16px 24px, #ffd166 24px 32px, #06d6a0 32px 40px, #118ab2 40px 48px, #8338ec 48px 56px)' }}></div>
                    </div>
                    <div style={{ maxWidth: 960, margin: '0 auto', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 12, padding: 12 }}>
                        <WishBoard />
                    </div>
                </section>
            </div>
        </>
    )
}

function WishBoard() {
    const [wish, setWish] = useState('');
    const [wishes, setWishes] = useState([]);
    const addWish = (e) => {
        e.preventDefault();
        const text = wish.trim();
        if (!text) return;
        setWishes(prev => [{ id: Date.now(), text }, ...prev]);
        setWish('');
    };
    return (
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h3 style={{ color: '#fff', marginBottom: 10 }}>🕯️ Escribe tu primer deseo navideño</h3>
            <form onSubmit={addWish} style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                <input style={{ background: '#fff', color: '#111', minWidth: '240px', width: '100%', maxWidth: '420px', borderRadius: 8, padding: '8px 10px', border: '1px solid #e2e8f0' }} value={wish} onChange={e => setWish(e.target.value)} placeholder="Mi deseo es..." />
                <button style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }} type="submit">Añadir</button>
            </form>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))', gap: 10, marginTop: 12 }}>
                {wishes.length === 0 && (
                    <div style={{ background: '#fff', color: '#111', border: '1px solid #e5e7eb', borderRadius: 10, padding: '10px 12px', gridColumn: '1 / -1', textAlign: 'center' }}>Tu deseo aparecerá aquí ✨</div>
                )}
                {wishes.map(w => (
                    <div key={w.id} style={{ background: '#fff', color: '#111', border: '1px solid #e5e7eb', borderRadius: 10, padding: '10px 12px' }}>{w.text}</div>
                ))}
            </div>
        </div>
    );
}

export default Inicio
