/**
 * ============================================================================
 * NEXOR - MAIN JAVASCRIPT
 * 100% Vibe Coding | Mobile First | Performance Optimized
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    /**
     * ------------------------------------------------------------------------
     * 1. NAVBAR (HEADER) VISIBILITY ON SCROLL
     * ------------------------------------------------------------------------
     */
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header--visible');
        } else {
            header.classList.remove('header--visible');
        }
    });

    /**
     * ------------------------------------------------------------------------
     * 2. HERO SECTION: LOGO FRAMES & NETWORK PARTICLES
     * ------------------------------------------------------------------------
     */
    const heroSection = document.getElementById('hero-section');
    const heroCanvas = document.getElementById('hero-canvas');
    
    if (heroSection && heroCanvas) {
        const ctxHero = heroCanvas.getContext('2d');
        
        // Configuración de Frames del Logo
        const frameCount = 100; // Ajustá esto a la cantidad de frames que tengas
        const images = [];
        let currentFrameIndex = 0;

        // Configuración de Partículas de Red (Blancas/Grisáceas)
        let networkParticles = [];
        const networkParticleCount = 70;

        // Ajustar tamaño del Canvas Hero
        function resizeHero() {
            heroCanvas.width = window.innerWidth;
            heroCanvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeHero);
        resizeHero();

        // Cargar las imágenes del logo
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            // Asegurate de que esta ruta sea exacta a donde tenés tus imágenes
            const fileName = `ezgif-frame-${i.toString().padStart(3, '0')}.jpg`; 
            img.src = `frames/${fileName}`; // CAMBIAR RUTA SI ES NECESARIO
            images.push(img);
        }

        // Clase para las Partículas de la Red (Fondo inicial)
        class NetworkParticle {
            constructor() {
                this.x = Math.random() * heroCanvas.width;
                this.y = Math.random() * heroCanvas.height;
                this.size = Math.random() * 1.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.8;
                this.speedY = (Math.random() - 0.5) * 0.8;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                // Rebote en los bordes
                if (this.x < 0 || this.x > heroCanvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > heroCanvas.height) this.speedY *= -1;
            }
            draw() {
                ctxHero.fillStyle = "rgba(140, 82, 255, 0.4)"; // Tono violeta sutil
                ctxHero.beginPath();
                ctxHero.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctxHero.fill();
            }
        }

        for (let i = 0; i < networkParticleCount; i++) {
            networkParticles.push(new NetworkParticle());
        }

        // Loop de Animación del Hero
        function renderHero() {
            ctxHero.clearRect(0, 0, heroCanvas.width, heroCanvas.height);

            // A. Actualizar y dibujar partículas de red
            networkParticles.forEach((p, index) => {
                p.update();
                p.draw();
                // Dibujar líneas entre partículas cercanas
                for (let j = index + 1; j < networkParticles.length; j++) {
                    const p2 = networkParticles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctxHero.strokeStyle = `rgba(140, 82, 255, ${0.2 - distance/500})`;
                        ctxHero.lineWidth = 0.5;
                        ctxHero.beginPath();
                        ctxHero.moveTo(p.x, p.y);
                        ctxHero.lineTo(p2.x, p2.y);
                        ctxHero.stroke();
                    }
                }
            });

            // B. Calcular frame actual basado en el Scroll
            const maxScroll = heroSection.offsetHeight - window.innerHeight;
            // Evitar división por cero si maxScroll es 0 o negativo
            const scrollFraction = maxScroll > 0 ? Math.max(0, Math.min(1, window.scrollY / maxScroll)) : 0;
            currentFrameIndex = Math.floor(scrollFraction * (frameCount - 1));

            // C. Dibujar el Frame del Logo
            const img = images[currentFrameIndex];
            if (img && img.complete) {
                // Centrar la imagen manteniendo proporciones
                const scale = Math.min(heroCanvas.width / img.width, heroCanvas.height / img.height) * 0.88;
                const imgW = img.width * scale;
                const imgH = img.height * scale;
                const x = (heroCanvas.width - imgW) / 2;
                const y = (heroCanvas.height - imgH) / 2;
                ctxHero.drawImage(img, x, y, imgW, imgH);
            }

            
            // Lógica para el Navbar: Si llegamos al 90% del scroll del logo, aparece
            if (scrollFraction > 0.9) {
                header.classList.add('header--visible');
            } else {
                header.classList.remove('header--visible');
            }

            requestAnimationFrame(renderHero);
        }
        renderHero();
    }


    /**
     * ------------------------------------------------------------------------
     * 3. FUTURE SECTION: VIOLET PORTAL & SERVICES
     * ------------------------------------------------------------------------
     */
    const futureSection = document.getElementById('future-section');
    const futureCanvas = document.getElementById('future-canvas');

    if (futureSection && futureCanvas) {
        const ctxFuture = futureCanvas.getContext('2d');
        const servicesGrid = document.getElementById('services-grid');
        const cards = document.querySelectorAll('.service-card');
        
        let violetParticles = [];
        const violetParticleCount = 40;

        function resizeFuture() {
            futureCanvas.width = window.innerWidth;
            futureCanvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeFuture);
        resizeFuture();

        // Clase para las Partículas del Portal (High-End)
        class VioletParticle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * futureCanvas.width;
                this.y = Math.random() * futureCanvas.height;
                this.size = Math.random() * 3 + 1.5; // Más grandes
                this.speed = Math.random() * 2 + 1;
                this.opacity = 0;
            }
            update(safePercent) {
                // Efecto túnel: se mueven desde el centro hacia afuera
                let dx = this.x - futureCanvas.width / 2;
                let dy = this.y - futureCanvas.height / 2;
                this.x += dx * 0.01 * this.speed;
                this.y += dy * 0.01 * this.speed;
                
                // Aparecen gradualmente con el scroll
                this.opacity = Math.min(0.7, safePercent * 1.5);

                // Reiniciar si salen de la pantalla
                if (this.x < 0 || this.x > futureCanvas.width || this.y < 0 || this.y > futureCanvas.height) {
                    this.reset();
                }
            }
            draw() {
                ctxFuture.beginPath();
                ctxFuture.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctxFuture.fillStyle = `rgba(140, 82, 255, ${this.opacity})`;
                ctxFuture.fill();
            }
        }

        for (let i = 0; i < violetParticleCount; i++) {
            violetParticles.push(new VioletParticle());
        }

        // Loop de Animación del Portal Future
        function renderFuture() {
            ctxFuture.clearRect(0, 0, futureCanvas.width, futureCanvas.height);
            
            // Calculamos el scroll SOLO dentro de la sección Future
            const rect = futureSection.getBoundingClientRect();
            // Cuánto se scrolleó en relación a la altura de esta sección
            const scrollPercent = Math.abs(rect.top) / (rect.height - window.innerHeight);
            const safePercent = Math.max(0, Math.min(1, scrollPercent));

            // A. Dibujar el Haz de Luz Central (Portal)
            if (safePercent > 0.05) {
                let gradient = ctxFuture.createRadialGradient(
                    futureCanvas.width / 2, futureCanvas.height / 2, 0,
                    futureCanvas.width / 2, futureCanvas.height / 2, safePercent * futureCanvas.width * 0.8
                );
                gradient.addColorStop(0, `rgba(140, 82, 255, ${safePercent * 0.4})`);
                gradient.addColorStop(1, 'transparent');
                ctxFuture.fillStyle = gradient;
                ctxFuture.fillRect(0, 0, futureCanvas.width, futureCanvas.height);
            }

            // B. Actualizar y dibujar partículas violetas
            violetParticles.forEach(p => {
                p.update(safePercent);
                p.draw();
            });

            

            requestAnimationFrame(renderFuture);
        }
        renderFuture();

        // D. Efecto de Seguimiento de Mouse en Tarjetas (Glint)
        if (cards.length > 0) {
            cards.forEach(card => {
                const glint = card.querySelector('.service-card__glint');
                if (glint) {
                    card.addEventListener('mousemove', e => {
                        const cardRect = card.getBoundingClientRect();
                        const x = e.clientX - cardRect.left;
                        const y = e.clientY - cardRect.top;
                        glint.style.left = `${x}px`;
                        glint.style.top = `${y}px`;
                    });
                }
            });
        }
    }
});










const cards = document.querySelectorAll('.project-card__wrapper');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const { offsetWidth: width, offsetHeight: height } = card;
    const { offsetX: x, offsetY: y } = e;

    
    const moveX = ((x / width) - 0.5) * 35; 
    const moveY = ((y / height) - 0.5) * -35;

    card.style.transform = `rotateX(${moveY}deg) rotateY(${moveX}deg) scale(1.05)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
  });
});

window.addEventListener('load', () => {
    const destino = document.getElementById('destino-scroll');
    
    if (destino) {
        
        const targetPosition = destino.getBoundingClientRect().top + window.pageYOffset;
        
        smoothScroll(targetPosition, 4000); 
    }
});

function smoothScroll(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        
        
        const run = ease(timeElapsed, start, distance, duration);
        
        window.scrollTo(0, run);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}
