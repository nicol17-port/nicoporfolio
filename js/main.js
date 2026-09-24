function renderProjects() {
  const container = document.getElementById('works-container');
  if (!container || typeof projects === 'undefined') return;

  projects.forEach(project => {
    const card = document.createElement(project.page ? 'a' : 'div');
    card.className = 'project-card';
    if (project.page) card.href = project.page;

    let mediaHTML;
    if (project.media && project.media.src) {
      mediaHTML = project.media.type === 'video'
        ? `<div class="project-media"><video src="${project.media.src}" controls onerror="this.parentElement.innerHTML='<p class=media-placeholder>IMAGE / VIDEO COMING SOON</p>'"></video></div>`
        : `<div class="project-media"><img src="${project.media.src}" alt="${project.name}" onerror="this.parentElement.innerHTML='<p class=media-placeholder>IMAGE / VIDEO COMING SOON</p>'"></div>`;
    } else {
      const mediaText = project.placeholder ? "PROJECT DETAILS COMING SOON" : "IMAGE / VIDEO COMING SOON";
      mediaHTML = `<div class="project-media"><p class="media-placeholder">${mediaText}</p></div>`;
    }

    const tagsHTML = (project.tags && project.tags.length)
      ? `<div class="project-tags">${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>`
      : '';

    const viewHintHTML = project.page ? `<span class="view-project-hint">View Project →</span>` : '';

    const infoHTML = `
      <div class="project-info">
        <div class="project-header">
          <h3 class="project-name">${project.name}</h3>
          ${project.type ? `<span class="project-type">${project.type}</span>` : ''}
        </div>
        ${project.contribution ? `<p class="project-contribution">Contribution: ${project.contribution}</p>` : ''}
        <p class="project-description">${project.description}</p>
        ${tagsHTML}
        ${viewHintHTML}
      </div>
    `;

    card.innerHTML = mediaHTML + infoHTML;
    container.appendChild(card);
  });
}

function renderVouches() {
  const container = document.getElementById('vouches-container');
  if (!container || typeof vouches === 'undefined') return;

  if (vouches.length === 0) {
    container.innerHTML = `<p class="section-note">Proof and vouches will be added here soon.</p>`;
    return;
  }

  vouches.forEach(v => {
    const card = document.createElement('div');
    card.className = 'proof-card';

    let mediaHTML = '';
    if (v.type === 'image') {
      mediaHTML = `<div class="proof-media"><img src="${v.src}" alt="${v.caption || 'Proof screenshot'}"></div>`;
    } else if (v.type === 'video') {
      mediaHTML = `<div class="proof-media"><video src="${v.src}" controls></video></div>`;
    }

    const quoteHTML = v.type === 'quote'
      ? `<p class="proof-quote">"${v.quote}"</p><p class="proof-client">— ${v.client}</p>`
      : '';

    const captionHTML = v.caption ? `<p class="proof-caption">${v.caption}</p>` : '';

    card.innerHTML = mediaHTML + quoteHTML + captionHTML;
    container.appendChild(card);
  });
}

function renderReviews() {
  const container = document.getElementById('reviews-container');
  if (!container || typeof reviews === 'undefined') return;

  container.innerHTML = reviews.map(r => `
    <div class="review-card">
      <p class="review-quote">"${r.quote}"</p>
      <p class="review-name">${r.name}</p>
      <p class="review-service">${r.service}</p>
    </div>
  `).join('');
}

function renderBuilds() {
  const container = document.getElementById('builds-container');
  if (!container || typeof builds === 'undefined') return;

  container.innerHTML = builds.map(item => {
    const mediaTag = item.type === 'video'
      ? `<video src="${item.src}" controls onerror="this.parentElement.innerHTML='<p class=media-placeholder>IMAGE COMING SOON</p>'"></video>`
      : `<img src="${item.src}" alt="${item.caption || 'Build screenshot'}" onerror="this.parentElement.innerHTML='<p class=media-placeholder>IMAGE COMING SOON</p>'">`;

    const captionHTML = item.caption ? `<p class="build-caption">${item.caption}</p>` : '';

    return `<div class="build-item-wrap"><div class="build-item">${mediaTag}</div>${captionHTML}</div>`;
  }).join('');
}

function setupScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));
}

function setupPricingFeedback() {
  document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.add('pulse');
      setTimeout(() => card.classList.remove('pulse'), 250);
    });
  });
}

function setupNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
    });
  });
}

function setupBackgroundAnimation() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const speedFactor = prefersReducedMotion ? 0.3 : 1;
  const ctx = canvas.getContext('2d');
  let width, height, farParticles, nearParticles, lastTime = 0;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function makeLayer(divisor, speedMult, size, accentChance) {
    const isMobile = window.innerWidth < 768;
    const count = Math.floor((width * height) / (isMobile ? divisor * 1.8 : divisor));
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22 * speedMult,
        vy: (Math.random() - 0.5) * 0.22 * speedMult,
        size,
        accent: Math.random() < accentChance,
        pulse: Math.random() * Math.PI * 2
      });
    }
    return arr;
  }

  function createParticles() {
    farParticles = makeLayer(42000, 0.6, 1.0, 0.08);
    nearParticles = makeLayer(60000, 1.1, 1.6, 0.18);
  }

  function drawLayer(particles, lineDist, lineOpacity, dtScale) {
    particles.forEach(p => {
      p.x += p.vx * dtScale;
      p.y += p.vy * dtScale;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      p.pulse += 0.02 * dtScale;

      const glow = p.accent ? (Math.sin(p.pulse) + 1) / 2 : 0;
      const radius = p.accent ? p.size + glow * 0.8 : p.size;

      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = p.accent
        ? `rgba(163, 24, 44, ${0.35 + glow * 0.35})`
        : 'rgba(255, 255, 255, 0.2)';
      ctx.fill();
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < lineDist) {
          const bothAccent = particles[i].accent && particles[j].accent;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = bothAccent
            ? `rgba(163, 24, 44, ${lineOpacity * 1.6 * (1 - dist / lineDist)})`
            : `rgba(255, 255, 255, ${lineOpacity * (1 - dist / lineDist)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  function drawSweep(time) {
    const cycle = 14000;
    const t = (time % cycle) / cycle;
    const pos = t * (width + height) - height;
    const grad = ctx.createLinearGradient(pos, 0, pos + height, height);
    grad.addColorStop(0, 'rgba(163, 24, 44, 0)');
    grad.addColorStop(0.5, 'rgba(163, 24, 44, 0.035)');
    grad.addColorStop(1, 'rgba(163, 24, 44, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  }

  function draw(time) {
    if (!lastTime) lastTime = time;
    const dt = time - lastTime;
    lastTime = time;
    // Normalize movement to a ~60fps baseline so speed stays consistent
    // regardless of actual frame rate or brief tab-focus hiccups.
    const dtScale = Math.min(dt / 16.67, 3) * speedFactor;

    ctx.clearRect(0, 0, width, height);
    drawLayer(farParticles, 100, 0.035, dtScale);
    drawLayer(nearParticles, 130, 0.06, dtScale);
    drawSweep(time);

    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  requestAnimationFrame(draw);

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderBuilds();
  renderProjects();
  renderVouches();
  renderReviews();
  setupScrollReveal();
  setupPricingFeedback();
  setupNavToggle();
  setupBackgroundAnimation();
});