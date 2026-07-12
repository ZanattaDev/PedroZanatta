/**
 * ECOSSISTEMA DE INTERAÇÃO 3D - O REI DOS SITES
 */
document.querySelectorAll('.glass-card').forEach(card => {
    
    card.addEventListener('mousemove', e => {
        const boundingBox = card.getBoundingClientRect();
        
        // Encontra as coordenadas do cursor relativas ao centro do card
        const cursorX = e.clientX - boundingBox.left - (boundingBox.width / 2);
        const cursorY = e.clientY - boundingBox.top - (boundingBox.height / 2);
        
        // Fator de inclinação física max (quanto maior, mais inclina)
        const intensidadeInclinacao = 12;
        
        const rotacaoDirecionalX = -(cursorY / boundingBox.height) * intensidadeInclinacao;
        const rotacaodirecionalY = (cursorX / boundingBox.width) * intensidadeInclinacao;
        
        // Aplica a matriz de perspectiva 3D mantendo a elevação suave do elemento
        card.style.transform = `perspective(1200px) translateY(-8px) rotateX(${rotacaoDirecionalX}deg) rotateY(${rotacaodirecionalY}deg)`;
    });

    // Retorna o elemento para o estado de repouso absoluto com transição suave amortecida
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1200px) translateY(0) rotateX(0deg) rotateY(0deg)';
    });
});
