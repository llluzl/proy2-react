import { useEffect, useRef } from 'react'

export default function VideoCarousel({ videos = [] }) {
    const carouselRef = useRef(null)

    useEffect(() => {
        const el = carouselRef.current
        if (!el) return

        const playActive = () => {
            const vids = el.querySelectorAll('video')
            vids.forEach(v => {
                try { v.pause() } catch (e) { }
            })
            const active = el.querySelector('.carousel-item.active video')
            if (active) {
                active.muted = true
                active.play().catch(() => { })
            }
        }

        // reproducir video inicial si existe
        playActive()

        el.addEventListener('slid.bs.carousel', playActive)
        return () => el.removeEventListener('slid.bs.carousel', playActive)
    }, [])

    return (
        <div ref={carouselRef} id="videoCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                {videos.map((src, i) => (
                    <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
                        <video
                            src={src}
                            className="d-block w-100 video-carousel-item"
                            playsInline
                            muted
                            loop
                            preload="metadata"
                            controls={false}
                        />
                    </div>
                ))}
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#videoCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#videoCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}
