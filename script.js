// Efeito de partículas no hero
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (Math.random() * 20 + 15) + 's';
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        particle.style.width = particle.style.height = Math.random() * 6 + 3 + 'px';
        container.appendChild(particle);
        
        setTimeout(() => particle.remove(), 40000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    
    // Tailwind script já está no HTML
    console.log('%cPortfólio de Pedro Henrique Zanatta carregado com sucesso!', 'color: #00ff9d; font-size: 14px');
});
