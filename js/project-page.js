function renderProjectPage() {
  if (typeof projectData === 'undefined') return;

  const titleEl = document.getElementById('project-title');
  const typeEl = document.getElementById('project-type-label');
  const contribList = document.getElementById('project-contrib-list');
  const featuredContainer = document.getElementById('featured-media');
  const tabsContainer = document.getElementById('category-tabs');
  const mediaContainer = document.getElementById('category-media');
  const linkContainer = document.getElementById('project-external-link');

  if (titleEl) titleEl.textContent = projectData.name;
  if (typeEl) typeEl.textContent = projectData.type;

  if (contribList && projectData.contributions) {
    contribList.innerHTML = projectData.contributions.map(c => `<li>${c}</li>`).join('');
  }

  if (linkContainer && projectData.externalLink) {
    linkContainer.innerHTML = `<a href="${projectData.externalLink}" class="btn btn-secondary" target="_blank">VIEW ON ROBLOX →</a>`;
  }

  if (featuredContainer) {
    const f = projectData.featured;
    featuredContainer.innerHTML = (f && f.src)
      ? (f.type === 'video'
          ? `<video src="${f.src}" controls onerror="this.outerHTML='<p class=media-placeholder>FEATURED MEDIA COMING SOON</p>'"></video>`
          : `<img src="${f.src}" alt="${projectData.name} featured media" onerror="this.outerHTML='<p class=media-placeholder>FEATURED MEDIA COMING SOON</p>'">`)
      : `<p class="media-placeholder">FEATURED MEDIA COMING SOON</p>`;
  }

  function renderMediaTag(item) {
    return item.type === 'video'
      ? `<video src="${item.src}" controls onerror="this.style.display='none'"></video>`
      : `<img src="${item.src}" alt="Screenshot" onerror="this.style.display='none'">`;
  }

  function renderSingleBox(item, fallbackAlt) {
    const mediaTag = item.type === 'video'
      ? `<video src="${item.src}" controls onerror="this.parentElement.innerHTML='<p class=media-placeholder>MEDIA COMING SOON</p>'"></video>`
      : `<img src="${item.src}" alt="${fallbackAlt}" onerror="this.parentElement.innerHTML='<p class=media-placeholder>MEDIA COMING SOON</p>'">`;
    const captionHTML = item.caption ? `<p class="build-caption">${item.caption}</p>` : '';
    return `<div class="build-item-wrap"><div class="build-item">${mediaTag}</div>${captionHTML}</div>`;
  }

  function renderMedia(category) {
    if (!category.media || category.media.length === 0) {
      mediaContainer.innerHTML = `<div class="build-item"><p class="media-placeholder">SCREENSHOTS / VIDEO COMING SOON</p></div>`;
      return;
    }

    const isMobile = window.innerWidth <= 640;

    mediaContainer.innerHTML = category.media.map(entry => {
      if (entry.group) {
        if (isMobile) {
          return entry.group.map(item => renderSingleBox(item, category.name)).join('');
        }
        const innerHTML = entry.group.map(renderMediaTag).join('');
        return `<div class="build-item build-item-stack">${innerHTML}</div>`;
      }
      return renderSingleBox(entry, category.name);
    }).join('');
  }

  // ---- Sliding pill indicator ----
  let pillEl = null;

  function positionPill(btn, animate) {
    if (!pillEl || !btn) return;
    if (!animate) pillEl.style.transition = 'none';
    pillEl.style.width = btn.offsetWidth + 'px';
    pillEl.style.transform = `translateX(${btn.offsetLeft}px)`;
    if (!animate) {
      // Force reflow so the "no transition" jump applies before restoring it
      void pillEl.offsetWidth;
      pillEl.style.transition = '';
    }
  }

  function setActiveTab(index, isInitial) {
    const buttons = tabsContainer.querySelectorAll('.category-btn');
    buttons.forEach((btn, i) => btn.classList.toggle('active', i === index));
    renderMedia(projectData.categories[index]);
    positionPill(buttons[index], !isInitial);
  }

  if (tabsContainer && projectData.categories) {
    pillEl = document.createElement('div');
    pillEl.className = 'category-tab-pill';
    tabsContainer.appendChild(pillEl);

    const buttonsHTML = projectData.categories
      .map((cat, i) => `<button class="category-btn" type="button" data-index="${i}">${cat.name}</button>`)
      .join('');
    tabsContainer.insertAdjacentHTML('beforeend', buttonsHTML);

    tabsContainer.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.add('pulse');
        setTimeout(() => btn.classList.remove('pulse'), 250);
        setActiveTab(Number(btn.dataset.index), false);
      });
    });

    setActiveTab(0, true);

    window.addEventListener('resize', () => {
      const activeBtn = tabsContainer.querySelector('.category-btn.active');
      positionPill(activeBtn, false);
    });
  }
}

function setupNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjectPage();
  setupNavToggle();
});