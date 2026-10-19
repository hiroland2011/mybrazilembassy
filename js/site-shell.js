/* Shared site chrome. Classic script keeps the pages usable from file://. */
(() => {
  const script = document.currentScript;
  const page = location.pathname.split('/').pop() || 'index.html';
  const savedLanguage = localStorage.getItem('embassyDemoLanguage');
  const language = ['en', 'pt'].includes(savedLanguage) ? savedLanguage : 'fr';
  const labelsByLanguage = {
    fr: { brand: 'Brésil<small>Ambassade du Canada au Brésil</small>', home: 'Accueil', countryMenu: 'Informations sur le pays', countryFacts: "Fiches d'informations générales", topicsMenu: 'Fiches thématiques', demography: 'Démographie', issues: "3 enjeux de l'année à surveiller", history: 'Histoire contemporaine du pays', leader: 'Fiche du chef d’État', about: 'À propos', login: 'Connexion', menu: 'Menu', navigation: 'Navigation', profile: 'Profil', changeLanguage: 'Changer de langue', menuOpen: 'Ouvrir le menu', menuClose: 'Fermer le menu' },
    en: { brand: 'Brazil<small>Embassy of Canada in Brazil</small>', home: 'Home', countryMenu: 'Country information', countryFacts: 'General information', topicsMenu: 'Thematic fact sheets', demography: 'Demography', issues: '3 issues to watch this year', history: 'Contemporary history of the country', leader: 'Head of State profile', about: 'About us', login: 'Sign in', menu: 'Menu', navigation: 'Navigation', profile: 'Profile', changeLanguage: 'Change language', menuOpen: 'Open menu', menuClose: 'Close menu' },
    pt: { brand: 'Brasil<small>Embaixada do Canadá no Brasil</small>', home: 'Início', countryMenu: 'Informações sobre o país', countryFacts: 'Informações gerais', topicsMenu: 'Fichas temáticas', demography: 'Demografia', issues: '3 desafios a acompanhar este ano', history: 'História contemporânea do país', leader: 'Perfil do chefe de Estado', about: 'Sobre nós', login: 'Entrar', menu: 'Menu', navigation: 'Navegação', profile: 'Perfil', changeLanguage: 'Mudar idioma', menuOpen: 'Abrir o menu', menuClose: 'Fechar o menu' }
  };
  const labels = labelsByLanguage[language];
  const footerVariant = page === 'brezil_vs_canada.html' ? 'compare' : page === 'information_sur_le_pays.html' ? 'country' : 'default';
  const footerLabels = {
    fr: { default: 'BRÉSIL · CANADA — DOSSIER DIPLOMATIQUE', compare: 'BRÉSIL — CANADA · DOSSIER DIPLOMATIQUE', country: 'BRÉSIL · DOSSIER DIPLOMATIQUE' },
    en: { default: 'BRAZIL · CANADA — DIPLOMATIC BRIEF', compare: 'BRAZIL — CANADA · DIPLOMATIC DOSSIER', country: 'BRAZIL · DIPLOMATIC DOSSIER' },
    pt: { default: 'BRASIL · CANADÁ — DOSSIÊ DIPLOMÁTICO', compare: 'BRASIL — CANADÁ · DOSSIÊ DIPLOMÁTICO', country: 'BRASIL · DOSSIÊ DIPLOMÁTICO' }
  };
  const getCurrentLabels = () => labelsByLanguage[document.documentElement.lang] || labelsByLanguage.fr;
  const refreshShellText = () => {
    const current = getCurrentLabels();
    document.querySelectorAll('[data-shell-key]').forEach(el => {
      const key = el.dataset.shellKey;
      const value = current[key];
      if (value === undefined) return;
      if (key === 'brand') el.innerHTML = value;
      else el.textContent = value;
    });
    const profile = document.getElementById('profileOpen');
    const homeLink = document.querySelector('[data-shell-home]');
    const langButton = document.getElementById('lang');
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('mainNav');
    if (profile) { profile.setAttribute('aria-label', current.profile); profile.title = current.profile; }
    if (homeLink) homeLink.setAttribute('aria-label', current.home);
    if (langButton) langButton.setAttribute('aria-label', current.changeLanguage);
    if (nav) nav.setAttribute('aria-label', current.navigation);
    if (menuToggle) menuToggle.setAttribute('aria-label', menuToggle.getAttribute('aria-expanded') === 'true' ? current.menuClose : current.menuOpen);
    const footerText = document.querySelector('[data-shell-footer]');
    if (footerText) footerText.textContent = footerLabels[document.documentElement.lang]?.[footerVariant] || footerLabels.fr[footerVariant];
  };
  window.getSiteShellText = (lang, key) => labelsByLanguage[lang]?.[key] || labelsByLanguage.fr[key];
  new MutationObserver(refreshShellText).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  window.addEventListener('storage', event => { if (event.key === 'embassyDemoLanguage') refreshShellText(); });
  document.documentElement.lang = language;
  if (script.dataset.part === 'header') {
    const makeLink = (href, key, label) => {
      const active = page === href;
      return `<a href="${href}" data-t="${key}" data-shell-key="${key}"${active ? ' class="current" aria-current="page"' : ''}>${label}</a>`;
    };
    const countryPages = ['information_sur_le_pays.html', 'enjeux_a_suivre.html', 'histoire_contemporaine.html', 'fiche_sur_le_chef.html'];
    const countryActive = countryPages.includes(page);
    const topicPages = ['brezil_vs_canada.html'];
    const topicsActive = topicPages.includes(page);
    const countryLink = makeLink('information_sur_le_pays.html', 'countryFacts', labels.countryFacts);
    const countryLinks = [
      countryLink,
      makeLink('enjeux_a_suivre.html', 'issues', labels.issues),
      makeLink('histoire_contemporaine.html', 'history', labels.history),
      makeLink('fiche_sur_le_chef.html', 'leader', labels.leader)
    ].join('');
    const topicLinks = makeLink('brezil_vs_canada.html', 'demography', labels.demography);
    const aboutLink = makeLink('a_propos.html', 'about', labels.about);
    script.insertAdjacentHTML('beforebegin', `
      <header class="site-header" data-site-chrome><div class="wrap nav">
        <a href="index.html#accueil" class="brand" data-shell-home aria-label="${labels.home}">
          <img class="brandmark" src="img/icon/brazil-150403_1280.png" alt="" aria-hidden="true">
          <span class="brandtext" data-t="brand" data-shell-key="brand">${labels.brand}</span>
        </a>
        <button class="menu-toggle" id="menuToggle" type="button" data-shell-key="menu" aria-label="${labels.menuOpen}" aria-expanded="false" aria-controls="mainNav">${labels.menu}</button>
        <nav class="links" id="mainNav" aria-label="${labels.navigation}">
          ${aboutLink}
          <details class="header-nav-menu${countryActive ? ' current' : ''}">
            <summary data-shell-key="countryMenu">${labels.countryMenu}</summary>
            <div class="header-dropdown">${countryLinks}</div>
          </details>
          <details class="header-nav-menu${topicsActive ? ' current' : ''}">
            <summary data-shell-key="topicsMenu">${labels.topicsMenu}</summary>
            <div class="header-dropdown">${topicLinks}</div>
          </details>
        </nav>
        <div class="auth-actions">
          <button class="login-link" id="loginOpen" type="button" data-t="login" data-shell-key="login">${labels.login}</button>
          <button class="profile-button" id="profileOpen" type="button" aria-label="${labels.profile}" title="${labels.profile}">C</button>
          <button class="lang" id="lang" type="button" aria-label="${labels.changeLanguage}">${language.toUpperCase()}⌄</button>
        </div>
      </div><div class="reading-progress" aria-hidden="true"><span></span></div></header>`);

    const nav = document.getElementById('mainNav');
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      document.getElementById('menuToggle').setAttribute('aria-expanded', 'false');
      nav.querySelectorAll('.header-nav-menu').forEach(menu => menu.removeAttribute('open'));
    }));
    // The comparison page already wires a translated menu handler of its own.
    if (page !== 'brezil_vs_canada.html') {
      const toggle = document.getElementById('menuToggle');
      toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
      });
    }
    refreshShellText();
    document.addEventListener('click', event => {
      if (!event.target.closest('.header-nav-menu')) document.querySelectorAll('.header-nav-menu').forEach(menu => menu.removeAttribute('open'));
    });
    nav.querySelectorAll('.header-nav-menu').forEach(menu => menu.addEventListener('toggle', () => {
      if (menu.open) nav.querySelectorAll('.header-nav-menu').forEach(other => { if (other !== menu) other.removeAttribute('open'); });
    }));
    const initializeReveal = () => {
      const progress = document.querySelector('.reading-progress span');
      if (progress) {
        let queued = false;
        const updateProgress = () => {
          queued = false;
          const range = document.documentElement.scrollHeight - window.innerHeight;
          const fraction = range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0;
          progress.style.transform = `scaleX(${fraction})`;
        };
        const queueProgress = () => {
          if (queued) return;
          queued = true;
          requestAnimationFrame(updateProgress);
        };
        window.addEventListener('scroll', queueProgress, { passive: true });
        window.addEventListener('resize', queueProgress, { passive: true });
        window.addEventListener('pageshow', queueProgress);
        updateProgress();
      }
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const items = document.querySelectorAll('main h1, main .section-head, main .panel, main .team-card, main .service-card, main .metric-card, main .chart-card, main .cities-card, main .language-card, main .population-card, main .profile-card');
      if (!('IntersectionObserver' in window)) {
        items.forEach(item => item.classList.add('reveal-item', 'is-visible'));
        return;
      }
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
      items.forEach(item => {
        item.classList.add('reveal-item');
        observer.observe(item);
      });
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initializeReveal, { once: true });
    else initializeReveal();
  } else if (script.dataset.part === 'footer') {
    const rightText = page === 'information_sur_le_pays.html' ? '2026–2027' : 'OTTAWA · 2026–2027';
    script.insertAdjacentHTML('beforebegin', `
      <footer class="site-footer" data-site-chrome>
        <div class="wrap footer-inner"><span data-shell-footer></span><span>${rightText}</span></div>
      </footer>`);
    refreshShellText();
  }

  script.remove();
})();
