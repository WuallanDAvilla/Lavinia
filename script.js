document.addEventListener('DOMContentLoaded', () => {
    const proposalCard = document.getElementById('proposal-card');
    const successCard = document.getElementById('success-card');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');

    // Começa com o card 'invisível' para a animação de entrada
    proposalCard.classList.add('card-enter');

    // Faz o card aparecer suavemente
    setTimeout(() => {
        proposalCard.style.opacity = '1';
        proposalCard.style.transform = 'rotateY(0) scale(1)';
    }, 100);


    // O que acontece ao clicar em "Sim"
    yesBtn.addEventListener('click', () => {
        // Faz o card do pedido desaparecer
        proposalCard.style.opacity = '0';
        proposalCard.style.transform = 'scale(0.8)';

        // Espera a animação de saída terminar para mostrar o sucesso
        setTimeout(() => {
            proposalCard.classList.add('hidden');
            successCard.classList.remove('hidden');
            // Animação de entrada para a mensagem de sucesso
            successCard.classList.add('card-enter');
            setTimeout(() => {
                successCard.style.opacity = '1';
                successCard.style.transform = 'scale(1)';
                // CHAMA A FUNÇÃO DO CONFETE AQUI!
                launchConfetti();
            }, 50);
        }, 800);
    });

    // O botão 'Não' agora apenas treme um pouco, de forma modesta
    noBtn.addEventListener('click', () => {
        // Adiciona uma classe de 'shake' ao card
        proposalCard.style.animation = 'shake 0.5s';

        // Remove a animação para que possa ser acionada novamente
        setTimeout(() => {
            proposalCard.style.animation = '';
        }, 500);
    });

    // Adiciona a animação de 'shake' no CSS via JS
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
        }
    `;
    document.head.appendChild(style);

    // NOVA FUNÇÃO PARA O CONFETE
    function launchConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const colors = ['#e7a1b0', '#c08497', '#ecf0f1', '#f0d9e0'];
        const confettiCount = 100;
        const particles = [];

        for (let i = 0; i < confettiCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                size: Math.random() * 5 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedX: (Math.random() - 0.5) * 10,
                speedY: Math.random() * 5 + 2,
                rotation: Math.random() * 360
            });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.save();
                ctx.fillStyle = p.color;
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation * Math.PI / 180);
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                ctx.restore();

                p.y += p.speedY;
                p.x += p.speedX;
                p.rotation += p.speedX / 2;

                if (p.y > canvas.height) {
                    p.y = -20;
                    p.x = Math.random() * canvas.width;
                }
            });

            requestAnimationFrame(draw);
        }

        draw();
    }
});