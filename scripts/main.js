// ── SITE CONFIGURATION ──────────────────────────────────────────────────────
// To swap the video: replace the file in assets/videos/ and update heroVideo.
// To swap the resume: replace file at resumePath (same filename = zero changes).
// To change any content: edit portfolio_data.json — no JS changes needed.
const CONFIG = {
  heroVideo:         'assets/videos/portfolio_background_v2.mp4',
  heroVideoFallback: 'assets/videos/portfolio_background.mp4',
  dataFile:          'portfolio_data.json',
  resumePath:        'assets/docs/Mohamed_Mostafa_Resume_2.pdf',
};

document.addEventListener('DOMContentLoaded', () => {
  // Start particles immediately — no JSON needed
  if (typeof initParticles === 'function') initParticles();

  fetch(CONFIG.dataFile)
    .then(response => response.json())
    .then(data => {
      // 1. Call all renderer functions
      if (typeof renderHero === 'function') renderHero(data.identity);
      if (typeof renderAbout === 'function') renderAbout(data.identity, data.quotes, data.stats);
      if (typeof renderExperience === 'function') renderExperience(data.experience);
      if (typeof renderCommunity === 'function') renderCommunity(data.community);
      if (typeof renderProjects === 'function') renderProjects(data.projects);
      if (typeof renderSkills === 'function') renderSkills(data.skills);
      if (typeof renderContact === 'function') renderContact(data.links);
      if (typeof renderLinkedIn === 'function') renderLinkedIn(data.linkedin_posts);

      // 2. Init nav toggle
      if (typeof initNavToggle === 'function') initNavToggle();

      // 3. Init filter buttons
      if (typeof initFilterButtons === 'function') initFilterButtons();

      // 4. Init scroll reveal
      if (typeof initScrollReveal === 'function') initScrollReveal();

      // Init remaining animations and interactions
      const emailToCopy = (data.links && data.links.email) ? data.links.email : (data.identity ? data.identity.email : '');
      if (typeof initEmailCopy === 'function') initEmailCopy(emailToCopy);
      if (typeof initVideoFallback === 'function') initVideoFallback();
      if (typeof initNavHighlight === 'function') initNavHighlight();
      if (typeof initNavScroll === 'function') initNavScroll();

      // 5. Wire resume button to CONFIG.resumePath
      const resumeBtn = document.getElementById('resume-btn');
      if (resumeBtn) {
        resumeBtn.href = CONFIG.resumePath;
      }
      
      // Additional general bindings
      const footerName = document.getElementById('footer-name');
      if (footerName && data.identity) {
        footerName.textContent = data.identity.name;
      }
      const copyrightYear = document.getElementById('copyright-year');
      if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
      }
    })
    .catch(error => {
      console.error('Error fetching portfolio data:', error);
    });
});
