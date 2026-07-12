// Particles no Hero
function createFloatingParticles() {
    const hero = document.querySelector('.hero');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = particle.style.height = Math.random() * 4 + 'px';
        particle.style.background = '#00ff9d';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.opacity = Math.random() * 0.4 + 0.1;
        particle.style.animation = `float ${Math.random() * 25 + 20}s linear infinite`;
        hero.appendChild(particle);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createFloatingParticles();
    
    // Tailwind script já carregado
    console.log('%c✅ Portfólio Premium de Pedro Zanatta carregado!', 'color:#00ff9d; font-size:16px; font-weight:bold');
});
