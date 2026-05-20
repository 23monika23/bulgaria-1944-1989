// === Navigation ===
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
}

// === Active nav link ===
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === page) link.classList.add('active');
});

// === Scroll fade-in animations ===
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.card, .timeline-item, .person-card, .blog-post, .period-card, .feature-card, .forum-thread-row, .split-section > *, .stat-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// === Animated stat counters ===
function animateCounter(el, target, suffix) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current).toLocaleString('bg-BG') + suffix;
    }, 25);
}

const statsObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target);
            const suffix = el.dataset.suffix || '';
            animateCounter(el, target, suffix);
            statsObs.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => statsObs.observe(el));

// === Forum reply toggle ===
document.querySelectorAll('.forum-thread-row').forEach(row => {
    row.addEventListener('click', function () {
        const replySection = this.nextElementSibling;
        if (replySection && replySection.classList.contains('forum-reply-thread')) {
            replySection.classList.toggle('open');
        }
    });
});

// === Forum reply submit ===
document.querySelectorAll('.reply-submit-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const form = this.closest('.forum-reply-thread');
        const textarea = form.querySelector('textarea');
        if (!textarea.value.trim()) return;

        const commentsWrap = form.querySelector('.comments-wrap');
        const initials = 'ГО';
        const now = new Date();
        const dateStr = now.toLocaleDateString('bg-BG', { day: 'numeric', month: 'long', year: 'numeric' });

        const newComment = document.createElement('div');
        newComment.className = 'comment';
        newComment.innerHTML = `
            <div class="comment-header">
                <div class="comment-avatar">${initials}</div>
                <span class="comment-author">Гост</span>
                <span class="comment-date">${dateStr}</span>
            </div>
            <p>${textarea.value.trim()}</p>
        `;
        commentsWrap.appendChild(newComment);
        textarea.value = '';

        this.textContent = 'Коментарът е добавен!';
        this.disabled = true;
        setTimeout(() => {
            this.textContent = 'Публикувай';
            this.disabled = false;
        }, 3000);
    });
});

// === Blog like buttons ===
document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const countEl = this.querySelector('.like-count');
        const current = parseInt(countEl.textContent);
        if (!this.classList.contains('liked')) {
            countEl.textContent = current + 1;
            this.classList.add('liked');
        } else {
            countEl.textContent = current - 1;
            this.classList.remove('liked');
        }
    });
});

// === Contact form ===
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = this.querySelector('.submit-btn');
        const msg = document.getElementById('successMsg');
        btn.textContent = 'Изпраща се...';
        btn.disabled = true;
        setTimeout(() => {
            btn.textContent = 'Изпрати съобщение';
            btn.disabled = false;
            if (msg) { msg.style.display = 'block'; setTimeout(() => { msg.style.display = 'none'; }, 5000); }
            this.reset();
        }, 1200);
    });
}

// === Smooth scroll for anchor links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
