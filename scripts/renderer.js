// renderer.js

function renderHero(identity) {
  if (!identity) return;

  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) {
    heroTitle.textContent = identity.name;
  }
  
  const heroSubtitle = document.getElementById('hero-subtitle');
  if (heroSubtitle) {
    heroSubtitle.textContent = identity.tagline_subtitle || "Unity Game Developer | Graphics Programmer | Community Founder";
  }

  // Set up the typing animation for the tagline
  if (typeof initTypedText === 'function') {
    initTypedText(identity.tagline_typed, 'hero-typed');
  }
}

function renderAbout(identity, quotes, stats) {
  if (!identity) return;

  // Hello Badge
  const helloContainer = document.querySelector('.hello-badge');
  if (helloContainer && identity.hello_badge) {
    helloContainer.innerHTML = `<span class="dot"></span> ${identity.hello_badge}`;
  }

  // Floating Cards
  const photoWrap = document.querySelector('.profile-photo-wrap');
  if (photoWrap && identity.floating_cards) {
    // Remove existing floating cards before re-rendering
    photoWrap.querySelectorAll('.floating-card').forEach(c => c.remove());
    
    identity.floating_cards.forEach(card => {
      const cardEl = document.createElement('div');
      cardEl.className = `floating-card ${card.position} glass-card`;
      cardEl.innerHTML = `
        <div class="card-icon">${card.icon}</div>
        <div class="card-info">
          <span class="card-label">${card.label}</span>
          <span class="card-sub">${card.sub}</span>
        </div>
      `;
      photoWrap.appendChild(cardEl);
    });
  }

  // Bone Tooltip
  const boneTooltip = document.querySelector('.bone-tooltip');
  if (boneTooltip && identity.bone_tooltip) {
    boneTooltip.textContent = identity.bone_tooltip;
  }

  // Blockquote — first quote from JSON
  const quoteContainer = document.getElementById('about-quote');
  if (quoteContainer && quotes && quotes.length > 0) {
    const q = quotes[0];
    quoteContainer.innerHTML = `
      <p>"${q.text}"</p>
      <footer>— ${q.author}${q.source ? `, <cite>${q.source}</cite>` : ''}</footer>
    `;
  }

  // Bio paragraph
  const bioContainer = document.getElementById('about-bio');
  if (bioContainer && identity.bio) {
    bioContainer.innerHTML = `<p>${identity.bio}</p>`;
  }

  // Origin story — only render if it's different from bio
  const originContainer = document.getElementById('about-origin');
  if (originContainer) {
    const origin = identity.origin_story || '';
    const bio    = identity.bio || '';
    if (origin && origin.trim() !== bio.trim()) {
      originContainer.innerHTML = `<p>${origin}</p>`;
    } else {
      originContainer.remove(); // remove empty placeholder
    }
  }

  // Stat cards
  const statsContainer = document.getElementById('about-stats');
  if (statsContainer && stats) {
    statsContainer.innerHTML = stats.map(stat => `
      <div class="stat-card glass-card">
        <h3>${stat.value}</h3>
        <p>${stat.label}</p>
      </div>
    `).join('');
  }
}

function renderExperience(experience) {
  const container = document.getElementById('experience-timeline');
  if (!container || !experience) return;

  container.innerHTML = experience.map(exp => `
    <div class="timeline-item glass-card ${exp.current ? 'active-role' : ''}">
      <div class="timeline-header">
        <h3 class="role">${exp.role}</h3>
        <span class="company">${exp.company}</span>
        <span class="dates">${exp.dates}</span>
      </div>
      <ul class="timeline-bullets">
        ${exp.bullets ? exp.bullets.map(bullet => `<li>${bullet}</li>`).join('') : ''}
      </ul>
    </div>
  `).join('');
}

function renderCommunity(community) {
  const infoContainer = document.getElementById('community-info');
  if (infoContainer && community) {
    infoContainer.innerHTML = `
      <h3>${community.name}</h3>
      <p class="role">${community.role} | ${community.dates}</p>
      <p class="description">${community.description}</p>
    `;
  }

  const metricsContainer = document.getElementById('community-metrics');
  if (metricsContainer && community && community.metrics) {
    metricsContainer.innerHTML = community.metrics.map(metric => `
      <div class="stat-card glass-card">
        <h4>${metric.value}</h4>
        <p>${metric.label}</p>
      </div>
    `).join('');
  }

  const linksContainer = document.getElementById('community-links');
  if (linksContainer && community && community.links) {
    let linksHtml = '';
    if (community.links.linkedin) {
      linksHtml += `<a href="${community.links.linkedin}" target="_blank" class="btn-outline">LinkedIn</a>`;
    }
    if (community.links.linktree) {
      linksHtml += `<a href="${community.links.linktree}" target="_blank" class="btn-primary">Linktree</a>`;
    }
    linksContainer.innerHTML = linksHtml;
  }
}

function renderProjects(projects) {
  const container = document.getElementById('projects-grid');
  if (!container || !projects) return;

  container.innerHTML = projects.map(proj => {
    let linksHtml = '';
    if (proj.links) {
      if (proj.links.itch) linksHtml += `<a href="${proj.links.itch}" target="_blank" class="btn-primary">Itch.io</a>`;
      if (proj.links.github) linksHtml += `<a href="${proj.links.github}" target="_blank" class="btn-outline">GitHub</a>`;
      if (proj.links.youtube) linksHtml += `<a href="${proj.links.youtube}" target="_blank" class="btn-outline">YouTube</a>`;
    }

    const badgeClass = proj.category === 'gamejam' ? 'badge--game' :
                       proj.category === 'published' ? 'badge--published' :
                       proj.category === 'software' ? 'badge--software' : '';

    const categoryLabel = proj.category === 'gamejam' ? 'Game Jam' :
                          proj.category === 'published' ? 'Published Game' :
                          proj.category === 'software' ? 'Software Eng' : proj.category;

    const thumbSrc = proj.thumbnail ? proj.thumbnail : 'assets/images/projects/warzone-kitchen-placeholder.png';

    return `
      <div class="project-card glass-card" data-category="${proj.category}">
        <img src="${thumbSrc}" alt="${proj.title}" class="project-thumb" loading="lazy">
        <div class="project-content">
          <div class="project-header">
            <h3>${proj.title}</h3>
            <span class="badge ${badgeClass}">${categoryLabel}</span>
          </div>
          <div class="project-tech">
            ${proj.tech ? proj.tech.map(t => `<span class="tech-pill">${t}</span>`).join('') : ''}
          </div>
          <div class="project-hover-overlay">
            <p>${proj.description || ''}</p>
            <div class="project-links">
              ${linksHtml}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderSkills(skills) {
  const track1 = document.getElementById('skills-track-1');
  const track2 = document.getElementById('skills-track-2');
  
  if (!skills) return;

  const buildSkillHtml = (skillList) => {
    if (!skillList) return '';
    return skillList.map(skill => `
      <div class="skill-item glass-card">
        ${skill.icon_svg_or_emoji ? `<span class="skill-icon">${skill.icon_svg_or_emoji}</span>` : ''}
        <span class="skill-name">${skill.name}</span>
      </div>
    `).join('');
  };

  const gameSkillsHtml = buildSkillHtml(skills.game);
  const progSkillsHtml = buildSkillHtml(skills.programming);

  // Duplicate items x3 for seamless ticker loop
  if (track1 && skills.game) {
    track1.innerHTML = gameSkillsHtml + gameSkillsHtml + gameSkillsHtml;
  }
  if (track2 && skills.programming) {
    track2.innerHTML = progSkillsHtml + progSkillsHtml + progSkillsHtml;
  }
}

function renderContact(links) {
  // Fill intro paragraph
  const textEl = document.getElementById('contact-text');
  if (textEl) {
    textEl.textContent = "Let's build something great together. Reach out through any channel below.";
  }

  const container = document.getElementById('contact-links');
  if (!container || !links) return;

  const config = {
    linkedin: { label: 'LinkedIn',  emoji: '💼' },
    github:   { label: 'GitHub',    emoji: '🐙' },
    itchio:   { label: 'Itch.io',   emoji: '🎮' },
    youtube:  { label: 'YouTube',   emoji: '▶️' },
  };

  let html = '';
  for (const [key, meta] of Object.entries(config)) {
    if (links[key]) {
      html += `<a href="${links[key]}" target="_blank" rel="noopener noreferrer" class="btn-outline contact-link">${meta.emoji} ${meta.label}</a>`;
    }
  }
  container.innerHTML = html;

  // Also set email on copy button aria-label so screen readers know the address
  const emailBtn = document.getElementById('contact-email-btn');
  if (emailBtn && links.email) {
    emailBtn.href = `mailto:${links.email}`;
    emailBtn.setAttribute('aria-label', `Send email to ${links.email}`);
    const span = emailBtn.querySelector('.btn-text');
    if (span) span.textContent = `✉️  ${links.email}`;
  }
}

// Renders the linkedin_posts array from portfolio_data.json into #linkedin-posts.
// To update posts: edit the "linkedin_posts" array in portfolio_data.json — no code changes needed.
function renderLinkedIn(posts) {
  const container = document.getElementById('linkedin-posts');
  if (!container || !posts || posts.length === 0) return;

  container.innerHTML = posts.map(post => {
    if (post.embedHtml) {
      return `
        <article class="linkedin-embed-wrapper glass-card">
          ${post.embedHtml}
        </article>
      `;
    }
    // Fallback to old format
    return `
      <article class="linkedin-card glass-card">
        <div class="linkedin-card-header">
          <span class="linkedin-emoji" aria-hidden="true">${post.emoji || '💼'}</span>
          <time class="linkedin-date">${post.date}</time>
        </div>
        <p class="linkedin-text">"${post.text}"</p>
        <a href="${post.url}" target="_blank" rel="noopener noreferrer" class="btn-outline linkedin-read-more">
          Read on LinkedIn ↗
        </a>
      </article>
    `;
  }).join('');
}

