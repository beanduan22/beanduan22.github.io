(() => {
  'use strict';

  const T = {
    bibtex: 'bibtex', paper: 'paper', code: 'code',
    earlier: 'Earlier', preprints: 'Preprints', publications: 'Publications'
  };
  const SELF = 'Bin Duan';
  const pubs = window.PUBLICATIONS || [];
  const isSelected = p => p.authors[0] === SELF;

  /* ---------- helpers ---------- */
  function el(tag, props = {}, children = []) {
    const node = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
      if (k === 'text') node.textContent = v;
      else if (k === 'class') node.className = v;
      else node.setAttribute(k, v);
    });
    children.filter(Boolean).forEach(c => node.append(c));
    return node;
  }
  function externalLink(href, text) {
    return el('a', { href, target: '_blank', rel: 'noopener noreferrer', text });
  }


  /* ---------- bibtex ---------- */
  function toBibtex(p) {
    const isPreprint = p.type === 'preprint';
    const venueField = p.type === 'article' ? 'journal' : 'booktitle';
    const fields = [
      ['title', `{${p.title}}`],
      ['author', p.authors.join(' and ')],
      isPreprint ? null : [venueField, p.fullVenue],
      isPreprint && p.arxiv ? ['eprint', p.arxiv] : null,
      isPreprint && p.arxiv ? ['archivePrefix', 'arXiv'] : null,
      ['year', String(p.year)],
      p.doi ? ['doi', p.doi] : null
    ].filter(Boolean);
    const body = fields.map(([k, v]) => `  ${k.padEnd(13)} = {${v}}`).join(',\n');
    return `@${isPreprint ? 'misc' : p.type}{${p.key},\n${body}\n}`;
  }

  /* ---------- publications ---------- */
  function authorsLine(authors) {
    const line = el('p', { class: 'authors' });
    authors.forEach((name, i) => {
      line.append(name === SELF ? el('b', { text: name }) : document.createTextNode(name));
      if (i < authors.length - 1) line.append(document.createTextNode(', '));
    });
    return line;
  }

  function rankBadges(p) {
    if (!p.ccf && !p.core) return null;
    return el('p', { class: 'ranks' }, [
      p.ccf ? el('span', { class: 'rank', text: `CCF-${p.ccf}` }) : null,
      p.core ? el('span', { class: 'rank', text: `CORE ${p.core}` }) : null
    ]);
  }

  function togglePanel(button, pubNode, kind, build) {
    const existing = pubNode.querySelector(`[data-panel="${kind}"]`);
    pubNode.querySelectorAll('[data-panel]').forEach(n => n.remove());
    pubNode.querySelectorAll('.pub-links button[aria-expanded]').forEach(b => b.setAttribute('aria-expanded', 'false'));
    if (existing) return;
    const panel = build();
    panel.dataset.panel = kind;
    pubNode.querySelector('.pub-body').append(panel);
    button.setAttribute('aria-expanded', 'true');
  }

  function renderPub(p, withSummary = false) {
    const titleHref = p.doi ? `https://doi.org/${p.doi}` : p.arxiv ? `https://arxiv.org/abs/${p.arxiv}` : `https://scholar.google.com/scholar?q=${encodeURIComponent(`"${p.title}"`)}`;
    const links = el('p', { class: 'pub-links' });
    if (p.doi) links.append(externalLink(`https://doi.org/${p.doi}`, T.paper));
    else if (p.arxiv) links.append(externalLink(`https://arxiv.org/abs/${p.arxiv}`, 'arXiv'));
    if (p.code) links.append(externalLink(p.code, T.code));
    const node = el('article', { class: 'pub' });
    const bibBtn = el('button', { type: 'button', 'aria-expanded': 'false', text: T.bibtex });
    bibBtn.addEventListener('click', () => togglePanel(bibBtn, node, 'bibtex', () => el('pre', { class: 'bibtex', text: toBibtex(p) })));
    links.append(bibBtn);

    const heading = el('h4', {}, [externalLink(titleHref, p.title)]);
    const venue = el('div', { class: 'pub-venue' }, [
      el('p', { text: p.venue }, [p.year < 2023 || p.type === 'preprint' ? el('span', { text: String(p.year) }) : null]),
      rankBadges(p)
    ]);
    const fullText = p.type === 'preprint' ? `arXiv:${p.arxiv}` : p.fullVenue;
    const full = fullText !== p.venue ? el('p', { class: 'pub-full', text: fullText }) : null;
    const summaryText = p.summary;
    const summary = withSummary && summaryText ? el('p', { class: 'pub-summary', text: summaryText }) : null;
    node.append(venue, el('div', { class: 'pub-body' }, [heading, summary, authorsLine(p.authors), full, links]));
    return node;
  }

  function yearGroups(items, withSummary = false) {
    const groups = [];
    items.forEach(p => {
      const label = p.year < 2023 ? T.earlier : String(p.year);
      const last = groups[groups.length - 1];
      if (last && last.label === label) last.items.push(p); else groups.push({ label, items: [p] });
    });
    return groups.flatMap(g => [el('h3', { class: 'year', text: g.label }), ...g.items.map(p => renderPub(p, withSummary))]);
  }

  function outputPart(id, title, items) {
    const h = el('h2', { class: 'part-h', id, text: title });
    return el('section', { class: 'output-part', 'aria-labelledby': id }, [h, ...yearGroups(items)]);
  }

  function renderPublications() {
    const list = document.getElementById('pub-list');
    if (!list) return;
    const view = list.dataset.view;
    const published = pubs.filter(p => p.type !== 'preprint' && (view === 'all' || isSelected(p)));
    if (view !== 'all') { list.replaceChildren(...yearGroups(published, true)); return; }
    const preprints = pubs.filter(p => p.type === 'preprint');
    list.replaceChildren(
      outputPart('part-pubs', T.publications, published),
      outputPart('part-pre', T.preprints, preprints)
    );
  }

  function renderThreadPapers() {
    const byNewest = (x, y) => y.year - x.year || (x.type === 'preprint') - (y.type === 'preprint');
    document.querySelectorAll('.thread[data-topic]').forEach(thread => {
      const slot = thread.querySelector('.thread-papers');
      const items = pubs.filter(p => p.topic === thread.dataset.topic).sort(byNewest).map(p => {
        const href = p.doi ? `https://doi.org/${p.doi}` : `https://arxiv.org/abs/${p.arxiv}`;
        const tag = p.type === 'preprint' ? `arXiv ${p.year}` : `${p.venue} ${p.year}`;
        const summaryText = p.summary;
        return el('li', { class: p.type === 'preprint' ? 'is-preprint' : '' }, [
          el('span', { class: 'tp-tag', text: tag }),
          el('div', {}, [
            externalLink(href, p.title),
            summaryText ? el('p', { class: 'tp-summary', text: summaryText }) : null
          ])
        ]);
      });
      slot.replaceChildren(...items);
    });
  }

  const portrait = document.getElementById('portrait');
  if (portrait) {
    const photo = portrait.querySelector('img');
    const markEmpty = () => portrait.classList.add('is-empty');
    photo.addEventListener('error', markEmpty);
    if (photo.complete && photo.naturalWidth === 0) markEmpty();
  }

  renderPublications();
  renderThreadPapers();

  /* ---------- auto-expanding sections ---------- */
  // A section opens the moment its heading scrolls into view, and its items fade/slide in.
  // Sections never close on their own: closing content above the reader would force scroll
  // corrections that interrupt the browser's smooth scrolling. Only transform/opacity are
  // animated, so nothing re-lays out the page mid-scroll. Clicking a heading still toggles it.
  const folds = [...document.querySelectorAll('details.fold')];
  if (folds.length) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const ITEMS = ':scope > .news > li, .pub-list > *, :scope .more, .thread';
    const itemsOf = fold => [...fold.querySelector('.fold-body').querySelectorAll(ITEMS)];

    const reveal = fold => {
      fold.open = true;
      if (reducedMotion.matches) return;
      const viewportH = window.innerHeight;
      let visibleIndex = 0;
      itemsOf(fold).forEach(item => {
        // Only stagger what can actually be seen; off-screen items appear instantly.
        if (item.getBoundingClientRect().top > viewportH) return;
        item.animate(
          [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }],
          { duration: 420, delay: Math.min(visibleIndex++, 6) * 45, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards' }
        );
      });
    };

    const conceal = fold => {
      if (reducedMotion.matches) { fold.open = false; return; }
      const body = fold.querySelector('.fold-body');
      body.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, easing: 'ease-out' })
        .onfinish = () => { fold.open = false; };
    };

    folds.forEach(fold => {
      fold.querySelector('summary').addEventListener('click', e => {
        e.preventDefault();
        if (fold.open) conceal(fold); else reveal(fold);
      });
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const fold = entry.target.parentElement;
        observer.unobserve(entry.target);
        if (!fold.open) reveal(fold);
      });
    }, { rootMargin: '0px 0px -6% 0px' });
    folds.filter(f => !f.open).forEach(f => observer.observe(f.querySelector('summary')));
  }

  /* ---------- misc ---------- */
  document.getElementById('year').textContent = String(new Date().getFullYear());

  const masthead = document.querySelector('.masthead');
  new IntersectionObserver(([entry]) => masthead.classList.toggle('scrolled', !entry.isIntersecting))
    .observe(document.getElementById('sentinel'));

})();
