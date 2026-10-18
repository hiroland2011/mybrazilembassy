/* Shared site chrome. Classic script keeps the pages usable from file://. */
(() => {
  const script = document.currentScript;
  const page = location.pathname.split('/').pop() || 'index.html';
  const navigation = [
    ['information_sur_le_pays.html', 'navFacts', 'Repères'],
    ['brezil_vs_canada.html', 'navCompare', 'Comparaison'],
    ['enjeux_a_suivre.html', 'navIssues', 'Enjeux 2026–27'],
    ['histoire_contemporaine.html', 'navHistory', 'Histoire'],
    ['fiche_sur_le_chef.html', 'navLeader', 'Chef d’État'],
    ['a_propos.html', 'navAbout', 'À propos']
  ];

  if (script.dataset.part === 'header') {
    const makeLink = ([href, key, label]) => {
      const active = page === href;
      return `<a href="${href}" data-t="${key}"${active ? ' class="current" aria-current="page"' : ''}>${label}</a>`;
    };
    const factsLink = makeLink(navigation[0]);
    const aboutLink = makeLink(navigation[5]);
    const factSheetItems = navigation.slice(1, 5);
    const factSheetActive = factSheetItems.some(([href]) => page === href);
    const factSheetLinks = factSheetItems.map(makeLink).join('');
    script.insertAdjacentHTML('beforebegin', `
      <header class="site-header"><div class="wrap nav">
        <a href="index.html#accueil" class="brand" aria-label="Accueil">
          <img class="brandmark" src="img/icon/brazil-150403_1280.png" alt="" aria-hidden="true">
          <span class="brandtext" data-t="brand">Brésil<small>Ambassade du Brésil</small></span>
        </a>
        <button class="menu-toggle" id="menuToggle" type="button" aria-expanded="false" aria-controls="mainNav">Menu</button>
        <nav class="links" id="mainNav" aria-label="Navigation">
          ${factsLink}
          <details class="header-facts-menu${factSheetActive ? ' current' : ''}">
            <summary data-shell-fact-sheets>Fiches pays</summary>
            <div class="header-dropdown">${factSheetLinks}</div>
          </details>
          ${aboutLink}
        </nav>
        <div class="auth-actions">
          <button class="login-link" id="loginOpen" type="button" data-t="login">Connexion</button>
          <button class="profile-button" id="profileOpen" type="button" aria-label="Profil" title="Profil">C</button>
          <button class="lang" id="lang" type="button" aria-label="Changer de langue">FR⌄</button>
        </div>
      </div></header>`);

    // The comparison page already wires a translated menu handler of its own.
    if (page !== 'brezil_vs_canada.html') {
      const toggle = document.getElementById('menuToggle');
      const nav = document.getElementById('mainNav');
      toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
      });
      nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        nav.querySelector('.header-facts-menu')?.removeAttribute('open');
      }));
    }
    const factSheetsLabel = document.querySelector('[data-shell-fact-sheets]');
    const updateFactSheetsLabel = () => {
      const lang = document.documentElement.lang || 'fr';
      factSheetsLabel.textContent = lang === 'en' ? 'Fact sheets' : lang === 'pt' ? 'Fichas informativas' : 'Fiches pays';
    };
    updateFactSheetsLabel();
    new MutationObserver(updateFactSheetsLabel).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    document.addEventListener('click', event => {
      if (!event.target.closest('.header-facts-menu')) document.querySelector('.header-facts-menu')?.removeAttribute('open');
    });
  } else if (script.dataset.part === 'footer') {
    const leftKey = page === 'brezil_vs_canada.html' ? 'foot' : 'footerLeft';
    const leftText = page === 'index.html'
      ? 'BRÉSIL · CANADA — DOSSIER DIPLOMATIQUE'
      : page === 'brezil_vs_canada.html'
        ? 'BRÉSIL — CANADA · DOSSIER DIPLOMATIQUE'
        : page === 'information_sur_le_pays.html'
          ? 'BRÉSIL · DOSSIER DIPLOMATIQUE'
          : 'BRÉSIL · CANADA — DOSSIER DIPLOMATIQUE';
    const rightText = page === 'information_sur_le_pays.html' ? '2026–2027' : 'OTTAWA · 2026–2027';
    script.insertAdjacentHTML('beforebegin', `
      <footer class="site-footer">
        <div class="wrap footer-inner"><span data-t="${leftKey}">${leftText}</span><span>${rightText}</span></div>
      </footer>`);
  }

  script.remove();
})();
