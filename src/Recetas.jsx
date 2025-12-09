import { useEffect, useState } from 'react'

function StepsChecklist({ id, steps }) {
    const key = `recipeChecks-${id}`;
    const [done, setDone] = useState(() => {
        try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
    });
    useEffect(() => {
        // Alinear longitud con pasos actuales
        if (done.length !== steps.length) {
            setDone(Array(steps.length).fill(false));
        }
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
                        <span style={{ textDecoration: done[i] ? 'line-through' : 'none', opacity: done[i] ? 0.75 : 1 }}>{s}</span>
                    </li>
                ))}
            </ul>
            <button onClick={reset} style={{ background: '#e5e7eb', color: '#111', border: '1px solid #cbd5e1', borderRadius: 8, padding: '4px 10px', cursor: 'pointer' }}>Reiniciar pasos</button>
        </div>
    );
}

function BunuelosIngredients() {
    // Escalado simple para 8 porciones base
    const baseServings = 8;
    const [servings, setServings] = useState(baseServings);
    const scale = servings / baseServings;
    const round = (x) => Math.round(x * 100) / 100;
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <label>Porciones:</label>
                <input type="number" min={1} value={servings} onChange={(e) => setServings(Math.max(1, parseInt(e.target.value || baseServings)))} style={{ width: 80 }} />
            </div>
            <ul id="ing-bunuelos">
                <li>{round(500 * scale)} g Harina</li>
                <li>{round(250 * scale)} ml Leche/Agua tibia</li>
                <li>Azúcar, sal y levadura</li>
                <li>Aceite para freír</li>
                <li>Miel o azúcar y canela para servir</li>
            </ul>
        </div>
    );
}

function Recetas() {
    const [fav, setFav] = useState(() => {
        try { return JSON.parse(localStorage.getItem('favRecipes') || '{}'); } catch { return {}; }
    });
    useEffect(() => {
        try { localStorage.setItem('favRecipes', JSON.stringify(fav)); } catch { }
    }, [fav]);
    const toggleFav = (id) => setFav(prev => ({ ...prev, [id]: !prev[id] }));

    const copyFrom = (containerId) => {
        const el = document.getElementById(containerId);
        if (!el) return;
        const text = Array.from(el.querySelectorAll('li')).map(li => `- ${li.innerText}`).join('\n');
        navigator.clipboard.writeText(text).then(() => alert('Ingredientes copiados')).catch(() => alert('No se pudo copiar'));
    };

    // Pasos como arrays para checklist
    const stepsBunuelos = [
        'Amasar: Mezcla la harina, huevos, líquido tibio, azúcar, sal y levadura hasta formar una masa suave y elástica.',
        'Reposar: Deja reposar la masa tapada en un lugar cálido hasta que duplique su tamaño (1-2 horas).',
        'Formar: Divide la masa en bolitas, estíralas formando discos finos con un agujero en el centro.',
        'Freír: Fríelos en aceite caliente hasta que estén dorados por ambos lados.',
        'Servir: Escúrrelos y sirve con miel o azúcar y canela.'
    ];
    const stepsPicana = [
        'Sellar las carnes en aceite caliente.',
        'Rehogado: Agregar cebolla, ajo y ají; reincorporar las carnes.',
        'Hervir con agua o caldo y vino; condimentar y cocinar 1 hora hasta que esté tierno.',
        'Añadir papas, choclo, arvejas y pasas; cocinar hasta que espese.',
        'Servir caliente y decorar con perejil.'
    ];
    const stepsChoco = [
        'Hervir leche con canela y clavo para infusionar.',
        'Disolver el chocolate a fuego bajo hasta espesar ligeramente.',
        'Endulzar al gusto y añadir vainilla o ralladura de naranja.',
        'Servir caliente con panetón o buñuelos.'
    ];

    return (
        <>
            <section style={{ position: 'relative', minHeight: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', overflow: 'hidden' }}>
                <img src="https://images.pexels.com/photos/317110/pexels-photo-317110.jpeg" alt="Recetas navideñas paceñas" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.45)' }} />
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: 14 }}>
                    <h1 style={{ color: '#f8fafc', margin: 0, textShadow: '0 2px 8px rgba(0,0,0,.6)' }}>Recetas</h1>
                    <p style={{ color: '#e5edf5', margin: '6px 0 0' }}>Sabores de La Paz para Nochebuena: buñuelos, picana, chocolatada y más.</p>
                </div>
            </section>

            <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            Receta Corta de Buñuelos Bolivianos
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                        <div className="accordion-body">
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                                <button onClick={() => toggleFav('bunuelos')} className="btn btn-sm" style={{ background: fav['bunuelos'] ? '#ef4444' : '#e5e7eb', color: fav['bunuelos'] ? '#fff' : '#111', border: '1px solid #cbd5e1', borderRadius: 8, padding: '6px 10px' }}>{fav['bunuelos'] ? '❤️ Favorita' : '🤍 Guardar'}</button>
                                <button onClick={() => copyFrom('ing-bunuelos')} className="btn btn-sm" style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 10px' }}>Copiar ingredientes</button>
                                <button onClick={() => window.print()} className="btn btn-sm" style={{ background: '#111827', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 10px' }}>Imprimir</button>
                            </div>
                            <strong>Ingredientes Principales (escala por porciones):</strong>
                            <BunuelosIngredients />
                            <strong>Pasos</strong>
                            <StepsChecklist id="bunuelos" steps={stepsBunuelos} />
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                            Receta Express de Picana Navideña
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                        <div className="accordion-body">
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                                <button onClick={() => toggleFav('picana')} className="btn btn-sm" style={{ background: fav['picana'] ? '#ef4444' : '#e5e7eb', color: fav['picana'] ? '#fff' : '#111', border: '1px solid #cbd5e1', borderRadius: 8, padding: '6px 10px' }}>{fav['picana'] ? '❤️ Favorita' : '🤍 Guardar'}</button>
                                <button onClick={() => copyFrom('ing-picana')} className="btn btn-sm" style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 10px' }}>Copiar ingredientes</button>
                                <button onClick={() => window.print()} className="btn btn-sm" style={{ background: '#111827', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 10px' }}>Imprimir</button>
                            </div>
                            <strong>Ingredientes Clave</strong>
                            <ul id="ing-picana">
                                <li>Carnes: Res, cerdo, cordero, pollo (1 trozo de cada tipo por persona)</li>
                                <li>Caldo/Base: Cebolla, ajo, ají colorado, papa, choclo (maíz) desgranado, pasas, arveja</li>
                                <li>Aderezos: Vino blanco, pimienta, comino, sal, hierbas aromáticas (perejil)</li>
                            </ul>
                            <StepsChecklist id="picana" steps={stepsPicana} />
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                            Receta Corta de Chocolatada Navideña Boliviana
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                        <div className="accordion-body">
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                                <button onClick={() => toggleFav('choco')} className="btn btn-sm" style={{ background: fav['choco'] ? '#ef4444' : '#e5e7eb', color: fav['choco'] ? '#fff' : '#111', border: '1px solid #cbd5e1', borderRadius: 8, padding: '6px 10px' }}>{fav['choco'] ? '❤️ Favorita' : '🤍 Guardar'}</button>
                                <button onClick={() => copyFrom('ing-choco')} className="btn btn-sm" style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 10px' }}>Copiar ingredientes</button>
                                <button onClick={() => window.print()} className="btn btn-sm" style={{ background: '#111827', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 10px' }}>Imprimir</button>
                            </div>
                            <strong>Ingredientes Clave</strong>
                            <ul id="ing-choco">
                                <li>1 Litro de leche (entera es mejor)</li>
                                <li>1 tableta de chocolate de mesa boliviano (Cóndor o similar)</li>
                                <li>1 o 2 ramas de canela</li>
                                <li>3 clavos de olor</li>
                                <li>Azúcar al gusto</li>
                                <li>Opcional: ralladura de cáscara de naranja o vainilla</li>
                            </ul>
                            <StepsChecklist id="choco" steps={stepsChoco} />
                        </div>
                    </div>
                </div>
            </div>

            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://www.semana.com/resizer/s-OSkKihBZ_ZgwtXPfarXXSuwLU=/arc-anglerfish-arc2-prod-semana/public/YQ765YNPGBD7LDFYATBMZABLXM.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://i.ytimg.com/vi/Lze2NXTK7ic/maxresdefault.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/N2CQEE6I3RERTCCLIQRSSZQSFI.jpg" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <img src="https://files.mormonsud.org/wp-content/uploads/2018/12/tradici%C3%B3n-navide%C3%B1a.jpg" class="rounded me-2" alt="..." />
                        <strong class="me-auto">Bootstrap</strong>
                        <small>11 mins ago</small>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    Holaaaa
                </div>
            </div>
        </>
    )
}

export default Recetas
