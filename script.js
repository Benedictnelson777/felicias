document.addEventListener('DOMContentLoaded', () => {
    const questionCard = document.getElementById('question-card');
    const successCard = document.getElementById('success-card');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');

    // Phase 1: Enhanced "No" button tracking
    let noHoverCount = 0;
    const yesBtnOriginalSize = 1;


    // ENHANCED MUSIC PLAYER
    const whooshSound = document.getElementById('whoosh-sound');
    const clickSound = document.getElementById('click-sound');
    const confettiSound = document.getElementById('confetti-sound');

    const tracks = [
        { audio: document.getElementById('bg-music'), name: '💕 Feel The Love - Kahuti ft Kinoti' },
        { audio: document.getElementById('track-2'), name: '✨ Happy Ever After' }
    ];

    let currentTrackIndex = 0;
    let currentAudio = tracks[0].audio;
    let isPlaying = false;

    // Autoplay attempt
    const startMusic = () => {
        if (!isPlaying) {
            currentAudio.play().then(() => {
                isPlaying = true;
                if (playIcon) playIcon.style.display = 'none';
                if (pauseIcon) pauseIcon.style.display = 'inline';
            }).catch(e => console.log('Autoplay blocked, waiting for interaction'));
        }
        // Remove listeners after first successful interaction if desired, 
        // but simple click on anything will trigger this.
    };

    document.addEventListener('click', startMusic, { once: true });
    document.addEventListener('touchstart', startMusic, { once: true });

    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');
    const trackTitle = document.getElementById('track-title');
    const progressFill = document.getElementById('progress-fill');
    const progressContainer = document.getElementById('progress-container');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeBtn = document.getElementById('volume-btn');
    const playlistBtn = document.getElementById('playlist-btn');
    const playlistContainer = document.getElementById('playlist-container');
    const customMusicInput = document.getElementById('custom-music');

    if (volumeSlider) currentAudio.volume = volumeSlider.value / 100;

    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (isPlaying) {
                currentAudio.pause();
                playIcon.style.display = 'inline';
                pauseIcon.style.display = 'none';
                isPlaying = false;
            } else {
                currentAudio.play().catch(e => console.log('Auto-play blocked'));
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'inline';
                isPlaying = true;
            }
        });
    }

    currentAudio.addEventListener('timeupdate', () => {
        if (currentAudio.duration && progressFill) {
            const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
            progressFill.style.width = progress + '%';
        }
    });

    if (progressContainer) {
        progressContainer.addEventListener('click', (e) => {
            const rect = progressContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const seekTime = (clickX / width) * currentAudio.duration;
            currentAudio.currentTime = seekTime;
        });
    }

    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            currentAudio.volume = volume;

            if (volumeBtn) {
                if (volume === 0) {
                    volumeBtn.textContent = '🔇';
                } else if (volume < 0.5) {
                    volumeBtn.textContent = '🔉';
                } else {
                    volumeBtn.textContent = '🔊';
                }
            }
        });
    }

    if (volumeBtn) {
        volumeBtn.addEventListener('click', () => {
            if (currentAudio.volume > 0) {
                currentAudio.volume = 0;
                volumeSlider.value = 0;
                volumeBtn.textContent = '🔇';
            } else {
                currentAudio.volume = 0.7;
                volumeSlider.value = 70;
                volumeBtn.textContent = '🔊';
            }
        });
    }

    if (playlistBtn) {
        playlistBtn.addEventListener('click', () => {
            if (playlistContainer.style.display === 'none') {
                playlistContainer.style.display = 'block';
            } else {
                playlistContainer.style.display = 'none';
            }
        });
    }

    document.querySelectorAll('.playlist-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            switchTrack(index);
        });
    });

    function switchTrack(index) {
        currentAudio.pause();
        currentAudio.currentTime = 0;

        currentAudio = tracks[index].audio;
        if (trackTitle) trackTitle.textContent = tracks[index].name;

        // Update track info in playlist
        document.querySelectorAll('.playlist-item').forEach((item, i) => {
            if (i === index) item.classList.add('active');
            else item.classList.remove('active');
        });

        if (volumeSlider) currentAudio.volume = volumeSlider.value / 100;

        if (isPlaying) {
            currentAudio.play().catch(e => console.log('Auto-play blocked'));
        }

        currentAudio.addEventListener('timeupdate', () => {
            if (currentAudio.duration && progressFill) {
                const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
                progressFill.style.width = progress + '%';
            }
        });
    }

    // Custom music logic removed as requested for exclusive playlist

    // Phase 2: Theme Switcher
    const themeButtons = document.querySelectorAll('.theme-btn[data-theme]');
    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-theme');
            document.body.setAttribute('data-theme', theme);
            playSound(clickSound);
        });
    });

    // Phase 2: Countdown Timer
    function updateCountdown() {
        const valentine = new Date('2026-02-14T00:00:00');
        const now = new Date();
        const diff = valentine - now;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        } else {
            document.getElementById('countdown').innerHTML = '<h3>It\'s Valentine\'s Day! ❤️</h3>';
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Phase 2: Enhanced Particle System
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 20;
            this.size = Math.random() * 15 + 5;
            this.speedY = -(Math.random() * 2 + 1);
            this.speedX = (Math.random() - 0.5) * 2;
            this.opacity = Math.random() * 0.5 + 0.3;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 5;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;

            if (this.y < -this.size) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.globalAlpha = this.opacity;

            // Draw heart
            ctx.fillStyle = 'rgba(255, 192, 203, 0.6)';
            ctx.beginPath();
            const size = this.size;
            ctx.moveTo(0, size / 4);
            ctx.bezierCurveTo(-size / 2, -size / 4, -size, size / 8, 0, size);
            ctx.bezierCurveTo(size, size / 8, size / 2, -size / 4, 0, size / 4);
            ctx.fill();

            ctx.restore();
        }
    }

    const particles = [];
    for (let i = 0; i < 20; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Helper function to play sounds
    function playSound(audio) {
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.log('Sound play blocked'));
        }
    }

    // Create background hearts (original)
    const bgContainer = document.querySelector('.background-animation');
    const heartCount = 15;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';

        const left = Math.random() * 100;
        const leftEnd = left + (Math.random() * 20 - 10);
        const duration = 5 + Math.random() * 10;
        const delay = Math.random() * 5;
        const size = 10 + Math.random() * 30;

        heart.style.setProperty('--left', `${left}%`);
        heart.style.setProperty('--left-end', `${leftEnd}%`);
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `${delay}s`;

        bgContainer.appendChild(heart);
    }

    // Enhanced "No" button movement logic with progression
    const moveNoButton = () => {
        noHoverCount++;

        if (noHoverCount > 7) {
            noBtn.style.opacity = '0';
            noBtn.style.pointerEvents = 'none';
            setTimeout(() => {
                noBtn.style.display = 'none';
            }, 300);
            return;
        }

        playSound(whooshSound);

        // Get button and card dimensions
        const btnRect = noBtn.getBoundingClientRect();
        const cardRect = questionCard.getBoundingClientRect();

        const btnWidth = btnRect.width;
        const btnHeight = btnRect.height;
        const cardWidth = cardRect.width;
        const cardHeight = cardRect.height;

        // Larger buffer for more dramatic movement
        const buffer = 30;
        const maxX = cardWidth - btnWidth - buffer;
        const maxY = cardHeight - btnHeight - buffer;

        const randomX = Math.floor(Math.random() * (maxX - buffer + 1)) + buffer;
        const randomY = Math.floor(Math.random() * (maxY - buffer + 1)) + buffer;

        // Random rotation for playfulness
        const randomRotation = (Math.random() - 0.5) * 30; // -15 to +15 degrees

        noBtn.style.position = 'absolute';
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
        noBtn.style.zIndex = '1000';
        noBtn.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)'; // Bounce effect

        // Progressive changes based on hover count
        if (noHoverCount === 6) {
            noBtn.innerHTML = 'Really? 😢';
            noBtn.style.transform = `rotate(${randomRotation}deg) scale(0.6)`;
        } else if (noHoverCount === 4) {
            noBtn.innerHTML = 'Are you sure? 🥺';
            noBtn.style.transform = `rotate(${randomRotation}deg) scale(0.85)`;
        } else {
            noBtn.style.transform = `rotate(${randomRotation}deg) scale(1)`;
        }

        // Make YES button grow more aggressively
        const yesScale = yesBtnOriginalSize + (noHoverCount * 0.12);
        yesBtn.style.transform = `scale(${yesScale})`;
        yesBtn.style.transition = 'transform 0.3s ease';
    };

    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveNoButton();
    });

    // Multi-stage "Yes" celebration
    yesBtn.addEventListener('click', () => {
        playSound(clickSound);
        questionCard.classList.add('hidden');

        // Hide countdown and theme selector
        document.getElementById('countdown').style.display = 'none';
        document.querySelector('.theme-selector').style.display = 'none';

        // Stage 1: Freeze Frame Effect
        const freezeOverlay = document.getElementById('freeze-overlay');
        freezeOverlay.classList.add('active');
        setTimeout(() => freezeOverlay.classList.remove('active'), 500);

        setTimeout(() => {
            questionCard.style.display = 'none';

            // Stage 2: Screen Flash
            const flashOverlay = document.getElementById('flash-overlay');
            flashOverlay.classList.add('active');
            setTimeout(() => flashOverlay.classList.remove('active'), 1000);

            // Stage 3: Reveal success card with zoom
            successCard.classList.remove('hidden');
            successCard.style.display = 'block';
            successCard.style.transform = 'scale(0.5)';
            successCard.style.opacity = '0';

            setTimeout(() => {
                successCard.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                successCard.style.transform = 'scale(1)';
                successCard.style.opacity = '1';
            }, 50);

            const container = document.querySelector('.container');
            container.style.maxWidth = '800px';
            container.classList.add('expanded');

            // Stage 4: Confetti Cannon
            setTimeout(() => {

                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffffff']
                });

                setTimeout(() => {
                    confetti({
                        particleCount: 100,
                        angle: 60,
                        spread: 55,
                        origin: { x: 0.1, y: 0.7 },
                        colors: ['#ff4d6d', '#ff758f']
                    });
                }, 200);

                setTimeout(() => {
                    confetti({
                        particleCount: 100,
                        angle: 120,
                        spread: 55,
                        origin: { x: 0.9, y: 0.7 },
                        colors: ['#ff4d6d', '#ff758f']
                    });
                }, 400);

                // Continuous heart confetti
                const end = Date.now() + (3 * 1000);
                (function frame() {
                    confetti({
                        particleCount: 2,
                        angle: 60,
                        spread: 55,
                        origin: { x: 0 },
                        colors: ['#ff4d6d', '#ff758f']
                    });
                    confetti({
                        particleCount: 2,
                        angle: 120,
                        spread: 55,
                        origin: { x: 1 },
                        colors: ['#ff4d6d', '#ff758f']
                    });

                    if (Date.now() < end) {
                        requestAnimationFrame(frame);
                    }
                }());
            }, 1200);

            // Stage 6: Unroll the letter
            setTimeout(() => {
                const letter = document.getElementById('heartfelt-letter');
                if (letter) letter.classList.add('open');
            }, 2000);

            // Stage 7: Polaroid Photos Drop In
            setTimeout(() => {
                const polaroids = document.querySelectorAll('.polaroid');
                polaroids.forEach(polaroid => {
                    polaroid.classList.add('drop-in');
                });
            }, 3500);

        }, 300);
    });

    // Photo Upload Functionality
    const uploadTrigger = document.getElementById('upload-trigger');
    const photoUpload = document.getElementById('photo-upload');
    const memoryGrid = document.getElementById('memory-grid');

    uploadTrigger.addEventListener('click', () => {
        photoUpload.click();
    });

    photoUpload.addEventListener('change', (e) => {
        const files = e.target.files;

        Array.from(files).forEach((file, index) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const polaroid = document.createElement('div');
                polaroid.className = 'memory-card polaroid';
                polaroid.setAttribute('data-index', memoryGrid.children.length);

                polaroid.innerHTML = `
                    <div class="polaroid-image">
                        <img src="${event.target.result}" alt="Memory">
                    </div>
                    <p class="polaroid-caption">New Memory</p>
                    <p class="polaroid-date">${new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                `;

                memoryGrid.appendChild(polaroid);

                setTimeout(() => {
                    polaroid.classList.add('drop-in');
                }, 100 * index);
            };

            reader.readAsDataURL(file);
        });
    });

    // Lightbox Photo Viewer
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    let currentImageIndex = 0;
    let allImages = [];

    memoryGrid.addEventListener('click', (e) => {
        const polaroid = e.target.closest('.polaroid');
        if (polaroid) {
            currentImageIndex = parseInt(polaroid.getAttribute('data-index'));
            openLightbox();
        }
    });

    function openLightbox() {
        allImages = Array.from(memoryGrid.querySelectorAll('.polaroid'));

        if (allImages.length === 0) return;

        const currentPolaroid = allImages[currentImageIndex];
        const img = currentPolaroid.querySelector('img');
        const placeholder = currentPolaroid.querySelector('.image-placeholder span');
        const caption = currentPolaroid.querySelector('.polaroid-caption');

        if (img) {
            lightboxImage.src = img.src;
        } else if (placeholder) {
            lightboxImage.style.display = 'none';
            lightboxCaption.innerHTML = placeholder.textContent + '<br><small>(Upload a photo to see it here!)</small>';
        }

        if (caption) {
            lightboxCaption.textContent = caption.textContent;
        }

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
        lightboxImage.style.display = 'block';
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
        openLightbox();
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % allImages.length;
        openLightbox();
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    });

    // ============ PHASE 3 FEATURES ============


    // Phase 3: Scroll-triggered Animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe scroll-reveal elements
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        scrollObserver.observe(el);
    });


    // Phase 3: Interactive Mouse Trail
    const trailContainer = document.getElementById('mouse-trail-container');
    let lastTrailTime = 0;
    const trailDelay = 50; // milliseconds

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTrailTime < trailDelay) return;
        lastTrailTime = now;

        // Create sparkle
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = e.pageX + 'px';
        sparkle.style.top = e.pageY + 'px';
        sparkle.style.fontSize = '35px';
        sparkle.innerHTML = '✨';
        trailContainer.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 800);

        // Occasionally add a heart
        if (Math.random() > 0.85) {
            const heart = document.createElement('div');
            heart.className = 'trail-heart';
            heart.style.left = e.pageX + 'px';
            heart.style.top = e.pageY + 'px';
            heart.style.fontSize = '40px';
            heart.innerHTML = '❤️';
            trailContainer.appendChild(heart);

            setTimeout(() => heart.remove(), 1500);
        }
    });



    // Disable mouse trail on mobile for performance
    if (window.innerWidth < 768) {
        trailContainer.style.display = 'none';
    }
});

