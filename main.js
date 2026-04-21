const header = document.getElementById('site-header');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Glow cards — sync pointer position to CSS vars (background-attachment:fixed
// means coordinates are in viewport space, matching clientX/clientY directly)
document.addEventListener('pointermove', (e) => {
    document.querySelectorAll('.glow-card').forEach(card => {
        card.style.setProperty('--x', e.clientX.toFixed(2));
        card.style.setProperty('--y', e.clientY.toFixed(2));
        card.style.setProperty('--xp', (e.clientX / window.innerWidth).toFixed(2));
        card.style.setProperty('--yp', (e.clientY / window.innerHeight).toFixed(2));
    });
});

// Inline video panel for local MP4 work items
document.querySelectorAll('.work-play-btn').forEach(btn => {
    const row   = btn.closest('.work-item');
    const panel = row.nextElementSibling;
    const video = panel?.querySelector('video');
    const close = panel?.querySelector('.work-video-close');

    if (!panel || !video) return;

    btn.addEventListener('click', () => {
        const isOpen = !panel.hidden;
        if (isOpen) {
            panel.hidden = true;
            video.pause();
            btn.textContent = '▶';
        } else {
            panel.hidden = false;
            video.play();
            btn.textContent = '◼';
            panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });

    close.addEventListener('click', () => {
        panel.hidden = true;
        video.pause();
        btn.textContent = '▶';
    });
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

document.querySelector('.contact-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('.form-btn');
    btn.textContent = 'Message Sent';
    btn.style.background = 'var(--fg-muted)';
    setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        e.target.reset();
    }, 3000);
});
