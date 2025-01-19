document.addEventListener('DOMContentLoaded', () => {
    // Animasi sederhana untuk preview board
    const previewBoard = document.querySelector('.game-board-preview');
    
    previewBoard.addEventListener('mousemove', (e) => {
        const rect = previewBoard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        previewBoard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    previewBoard.addEventListener('mouseleave', () => {
        previewBoard.style.transform = 'rotateY(-30deg) rotateX(20deg)';
    });
});