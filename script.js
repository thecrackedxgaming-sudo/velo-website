// ===== FLOATING PARTICLES (Relaxing Vibe) =====
(function addParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particleCanvas';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');

    let w, h;
    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    for (let i = 0; i < 35; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 2.5 + 0.8,
            dx: (Math.random() - 0.5) * 0.25,
            dy: (Math.random() - 0.5) * 0.25 - 0.08,
            o: Math.random() * 0.4 + 0.1,
        });
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => {
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > w) p.dx *= -1;
            if (p.y < 0 || p.y > h) p.dy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(180, 210, 255, ${p.o})`;
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    draw();
})();

(function () {
    'use strict';

    // ==================== PAGE READY ====================
    window.addEventListener('load', function () {
        document.body.classList.add('page-ready');
    });

    // ==================== NAV TOGGLE ====================
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            const isOpen = navLinks.classList.toggle('open');
            navToggle.classList.toggle('open', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ==================== NAVBAR SCROLL ====================
    const navbar = document.getElementById('navbar');
    let ticking = false;

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                const y = window.scrollY || window.pageYOffset;
                if (navbar) {
                    navbar.classList.toggle('scrolled', y > 20);
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // ==================== SCROLL REVEAL ====================
    const revealEls = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window && revealEls.length) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        revealEls.forEach(function (el) {
            el.classList.add('in-view');
        });
    }

    // ==================== TYPING ANIMATION (SLOW & SMOOTH) ====================
const words = [
    'Premium Gaming Assets Hub',
    'Top Gaming Mod APKs',
    'Pro AI Editing Tools',
    'Next-Gen Creator Resources'
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typingText');

function typeEffect() {
    if (!typingElement) return;
    const currentWord = words[wordIndex];

    if (!isDeleting) {
        // TYPING SPEED: 120ms (pehle 80ms tha)
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000); // Word complete hone ke baad 2 sec rukna
            return;
        }
    } else {
        // DELETING SPEED: 80ms (pehle 40ms tha)
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeEffect, 600); // Naya word start karne se pehle thoda rukna
            return;
        }
    }

    setTimeout(typeEffect, isDeleting ? 80 : 120);
}

typeEffect();

    // ==================== COUNTER ANIMATION ====================
    const counters = document.querySelectorAll('.counter');

    if ('IntersectionObserver' in window && counters.length) {
        const counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseFloat(el.getAttribute('data-target')) || 0;
                    const duration = 1200;
                    const startTime = performance.now();

                    function updateCounter(currentTime) {
                        const progress = Math.min((currentTime - startTime) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const current = target * eased;

                        el.textContent = current.toFixed(1);

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            el.textContent = target;
                        }
                    }

                    requestAnimationFrame(updateCounter);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.4 });

        counters.forEach(function (el) {
            counterObserver.observe(el);
        });
    } else {
        counters.forEach(function (el) {
            const target = parseFloat(el.getAttribute('data-target')) || 0;
            el.textContent = target;
        });
    }

    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            const id = link.getAttribute('href');
            if (id.length < 2) return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const navHeight = navbar ? navbar.offsetHeight : 0;
            const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
            window.scrollTo({ top: top, behavior: 'smooth' });
        });
    });
    // ==================== DOWNLOAD PAGE TIMER ====================
    // Automatically runs if .timer exists (download.html)
    const timerEl = document.getElementById('timer');
    const downloadBtn = document.getElementById('downloadBtn');

    if (timerEl && downloadBtn) {
        let timeLeft = 15;
        const countdown = setInterval(function () {
            timeLeft--;
            timerEl.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(countdown);
                timerEl.style.display = 'none';
                downloadBtn.classList.add('show');
                downloadBtn.textContent = '⬇ Download File Now';
            }
        }, 1000);

        downloadBtn.addEventListener('click', function () {
            window.open('https://t.me/Ve_Official', '_blank');
        });
    }

})();

// ============================================================
// NEW PAGE FUNCTIONALITY (Add at the very end of script.js)
// ============================================================

// ===== COMPANY NAMES =====
const companies = [
    'NVIDIA', 'AMD', 'Intel', 'MSI', 'ASUS', 'Razer',
    'Logitech', 'Corsair', 'HyperX', 'SteelSeries', 'Acer', 'Lenovo',
    'Dell', 'HP', 'Samsung', 'LG', 'Sony', 'Microsoft',
    'Google', 'Apple', 'Spotify', 'Netflix', 'Amazon', 'Tesla'
];

// ===== RESOURCES WITH FIXED KEYS =====
const resources = {
    video: [
        { icon: '🎬', name: 'CapCut Pro', badge: 'AI', key: 'video_capcut_pro' },
        { icon: '📹', name: 'Premiere Pro', badge: 'Pro', key: 'video_premiere_pro' },
        { icon: '🎞️', name: 'After Effects', badge: 'Pro', key: 'video_after_effects' },
        { icon: '📽️', name: 'DaVinci Resolve', badge: 'Free', key: 'video_davinci_resolve' },
        { icon: '🎥', name: 'Filmora', badge: 'Pro', key: 'video_filmora' },
        { icon: '📸', name: 'Lightroom', badge: 'AI', key: 'video_lightroom' },
        { icon: '🎨', name: 'Photoshop', badge: 'Pro', key: 'video_photoshop' },
        { icon: '✂️', name: 'InShot', badge: 'Pro', key: 'video_inshot' },
        { icon: '🎬', name: 'VN Video Editor', badge: 'Free', key: 'video_vn_video_editor' },
        { icon: '📹', name: 'KineMaster', badge: 'Pro', key: 'video_kinemaster' },
    ],
    games: [
        { icon: '🎮', name: 'BGMI', badge: 'Mod', key: 'games_bgmi' },
        { icon: '🕹️', name: 'Free Fire', badge: 'Mod', key: 'games_free_fire' },
        { icon: '🎯', name: 'Call of Duty', badge: 'Mod', key: 'games_call_of_duty' },
        { icon: '🏎️', name: 'Asphalt 9', badge: 'Mod', key: 'games_asphalt_9' },
        { icon: '⚽', name: 'FIFA', badge: 'Mod', key: 'games_fifa' },
        { icon: '🧟', name: 'PUBG', badge: 'Mod', key: 'games_pubg' },
        { icon: '🎮', name: 'Genshin Impact', badge: 'Mod', key: 'games_genshin_impact' },
        { icon: '🕹️', name: 'Among Us', badge: 'Mod', key: 'games_among_us' },
        { icon: '🎯', name: 'Valorant', badge: 'Config', key: 'games_valorant' },
        { icon: '🏎️', name: 'NFS', badge: 'Mod', key: 'games_nfs' },
    ],
    editing: [
        { icon: '🤖', name: 'AI Video Editor', badge: 'AI', key: 'editing_ai_video_editor' },
        { icon: '🎨', name: 'AI Photo Editor', badge: 'AI', key: 'editing_ai_photo_editor' },
        { icon: '✏️', name: 'AI Writer', badge: 'AI', key: 'editing_ai_writer' },
        { icon: '🎵', name: 'AI Music Maker', badge: 'AI', key: 'editing_ai_music_maker' },
        { icon: '📹', name: 'AI Face Swap', badge: 'AI', key: 'editing_ai_face_swap' },
        { icon: '🖼️', name: 'AI Upscaler', badge: 'AI', key: 'editing_ai_upscaler' },
        { icon: '🎬', name: 'AI Video Enhancer', badge: 'AI', key: 'editing_ai_video_enhancer' },
        { icon: '📸', name: 'AI Photo Enhancer', badge: 'AI', key: 'editing_ai_photo_enhancer' },
    ],
    premium: [
        { icon: '💎', name: 'Mega Pack Vol.1', badge: 'Premium', key: 'premium_mega_pack_vol1' },
        { icon: '💎', name: 'Mega Pack Vol.2', badge: 'Premium', key: 'premium_mega_pack_vol2' },
        { icon: '💎', name: 'Gaming Bundle', badge: 'Premium', key: 'premium_gaming_bundle' },
        { icon: '💎', name: 'Creator Bundle', badge: 'Premium', key: 'premium_creator_bundle' },
        { icon: '💎', name: 'AI Tools Bundle', badge: 'premium_ai_tools_bundle' },
        { icon: '💎', name: 'Sound Pack', badge: 'Premium', key: 'premium_sound_pack' },
        { icon: '💎', name: 'Overlay Pack', badge: 'Premium', key: 'premium_overlay_pack' },
        { icon: '💎', name: 'Transition Pack', badge: 'Premium', key: 'premium_transition_pack' },
    ]
};

const categoryTitles = {
    video: '🎬 Video Resources',
    games: '🎮 All Games',
    editing: '🤖 Editing / Tools',
    premium: '💎 Premium Packs'
};

// ===== OPEN NEW PAGE =====
function openNewPage(category) {
    const newPage = document.getElementById('newPage');
    const homepage = document.getElementById('homepage');
    const categoryTitle = document.getElementById('categoryTitle');
    const resourceGrid = document.getElementById('resourceGrid');

    categoryTitle.textContent = categoryTitles[category] || 'Resources';

    const items = resources[category] || [];
    resourceGrid.innerHTML = '';
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'resource-item';
        div.innerHTML = `
            <div class="icon">${item.icon}</div>
            <div class="name">${item.name}</div>
            <span class="badge">${item.badge}</span>
        `;
        // Generate file key from name
        const fileKey = item.key;
        div.onclick = () => {
            window.location.href = `download.html?file=${fileKey}`;
        };
        resourceGrid.appendChild(div);
    });

    homepage.style.display = 'none';
    newPage.classList.add('active');
    document.body.style.overflow = 'hidden';
    newPage.scrollTop = 0;

    populateCompanyLists();
}

// ===== CLOSE NEW PAGE =====
function closeNewPage() {
    const newPage = document.getElementById('newPage');
    const homepage = document.getElementById('homepage');
    newPage.classList.remove('active');
    homepage.style.display = 'block';
    document.body.style.overflow = 'auto';
}

// ===== POPULATE COMPANY LISTS =====
function populateCompanyLists() {
    const leftList = document.getElementById('companyListLeft');
    const rightList = document.getElementById('companyListRight');
    const doubleCompanies = [...companies, ...companies];

    leftList.innerHTML = '';
    rightList.innerHTML = '';

    const leftInner = document.createElement('div');
    leftInner.className = 'scroll-list-inner';
    doubleCompanies.forEach(name => {
        const div = document.createElement('div');
        div.className = 'company-item';
        div.textContent = name;
        leftInner.appendChild(div);
    });
    leftList.appendChild(leftInner);

    const rightInner = document.createElement('div');
    rightInner.className = 'scroll-list-inner';
    doubleCompanies.forEach(name => {
        const div = document.createElement('div');
        div.className = 'company-item';
        div.textContent = name;
        rightInner.appendChild(div);
    });
    rightList.appendChild(rightInner);
}

// ===== SEARCH FILTER =====
function filterResources(searchTerm) {
    const items = document.querySelectorAll('.resource-item');
    const term = searchTerm.toLowerCase().trim();
    items.forEach(item => {
        const name = item.querySelector('.name')?.textContent?.toLowerCase() || '';
        const badge = item.querySelector('.badge')?.textContent?.toLowerCase() || '';
        const match = name.includes(term) || badge.includes(term);
        item.style.display = match ? 'block' : 'none';
    });
}

// ===== ESCAPE KEY =====
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const newPage = document.getElementById('newPage');
        if (newPage.classList.contains('active')) {
            closeNewPage();
        }
    }
});

// ===== BRAND CLICK =====
document.getElementById('homeBrand')?.addEventListener('click', function(e) {
    const newPage = document.getElementById('newPage');
    if (newPage.classList.contains('active')) {
        e.preventDefault();
        closeNewPage();
    }
});