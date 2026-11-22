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

  /* ---------- accordion sections ---------- */
  // One section is open at a time and it follows the reader:
  //  - scrolling down, the next section opens once its heading rises above DOWN_LINE;
  //  - scrolling up, the previous one opens once the active heading sinks below UP_LINE
  //    (its content grows upward, off screen, so it reads as if it had always been there);
  //  - back at the very top, the first section opens;
  //  - the section being left fades out, then collapses in a single step.
  // Whenever content above the reader changes height, everything on screen is held still by
  // native scroll anchoring (which, unlike scrollBy, does not interrupt smooth scrolling); the
  // sections above are temporarily excluded so the browser anchors to what the reader sees.
  // Browsers without scroll anchoring get one scrollBy instead. Only opacity/transform animate.
  const folds = [...document.querySelectorAll('details.fold')];
  const main = document.getElementById('main');
  if (folds.length && main) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const nativeAnchoring = window.CSS && CSS.supports('overflow-anchor', 'auto');
    const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
    const DOWN_LINE = 0.7;
    const UP_LINE = 0.8;
    const FADE_OUT = 180;
    const ITEMS = ':scope > .news > li, .pub-list > *, :scope .more, .thread';
    const summaryOf = f => f.querySelector('summary');
    const bodyOf = f => f.querySelector('.fold-body');
    const fades = new Map();
    let active = Math.max(0, folds.findIndex(f => f.open));
    // Scroll events caused by our own anchoring corrections must not read as the user scrolling.
    let settleUntil = 0;

    const animate = (el, frames, opts) =>
      reducedMotion.matches ? null : el.animate(frames, { easing: EASE, ...opts });

    // Run `mutate` without moving `keep` (and everything after it) on screen.
    const holdStill = (keep, mutate) => {
      if (!keep) { mutate(); return; }
      const blocks = [...main.children];
      const above = blocks.slice(0, blocks.indexOf(keep.closest('#main > *')));
      above.forEach(n => { n.style.overflowAnchor = 'none'; });
      const before = keep.getBoundingClientRect().top;
      mutate();
      if (!nativeAnchoring) {
        const shift = keep.getBoundingClientRect().top - before;
        if (shift) window.scrollBy({ top: shift, behavior: 'instant' });
      }
      settleUntil = performance.now() + 100;
      setTimeout(() => above.forEach(n => { n.style.overflowAnchor = ''; }), 120);
    };

    const fadeInItems = fold => {
      let n = 0;
      bodyOf(fold).querySelectorAll(ITEMS).forEach(item => {
        const r = item.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        animate(item, [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }],
          { duration: 420, delay: Math.min(n++, 6) * 45, fill: 'backwards' });
      });
    };

    const reveal = (fold, keep) => {
      const fade = fades.get(fold);
      if (fade) { fades.delete(fold); fade.cancel(); }
      if (fold.open) return;
      holdStill(keep, () => { fold.open = true; });
      fadeInItems(fold);
    };

    const collapse = fold => {
      const above = folds.indexOf(fold) < active;
      holdStill(above ? summaryOf(folds[active]) : null, () => { fold.open = false; });
      animate(summaryOf(fold), [{ opacity: 0 }, { opacity: 1 }], { duration: 260 });
    };

    const conceal = fold => {
      if (!fold.open || fades.has(fold)) return;
      const fade = animate(bodyOf(fold), [{ opacity: 1 }, { opacity: 0 }], { duration: FADE_OUT, fill: 'forwards' });
      if (!fade) { collapse(fold); return; }
      fades.set(fold, fade);
      fade.onfinish = () => {
        if (fades.get(fold) !== fade) return;
        fades.delete(fold);
        collapse(fold);
        fade.cancel();
      };
    };

    const activate = (index, { anchored = true } = {}) => {
      if (index === active || index < 0 || index >= folds.length) return;
      const goingUp = index < active;
      const leaving = folds[active];
      active = index;
      // Going up, the new section opens above the reader: hold the old heading still.
      reveal(folds[index], goingUp && anchored ? summaryOf(leaving) : null);
      folds.forEach((f, i) => { if (i !== index) conceal(f); });
    };

    const atTop = () => window.scrollY <= 2;
    const atBottom = () => window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    const headingTop = i => summaryOf(folds[i]).getBoundingClientRect().top;
    const shouldGoDown = () => active + 1 < folds.length &&
      (headingTop(active + 1) < window.innerHeight * DOWN_LINE || (atBottom() && headingTop(active + 1) < window.innerHeight));
    const shouldGoUp = () => active > 0 && headingTop(active) > window.innerHeight * UP_LINE;

    let lastY = window.scrollY;
    const update = () => {
      const y = window.scrollY;
      if (performance.now() < settleUntil) { lastY = y; return; }
      if (y > lastY) { while (shouldGoDown()) activate(active + 1); }
      else if (y < lastY) {
        if (atTop()) activate(0, { anchored: false });
        else if (shouldGoUp()) activate(active - 1);
      }
      lastY = window.scrollY;
    };

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; update(); });
    }, { passive: true });
    // At either end of the page a further wheel/swipe produces no scroll event.
    // A cooldown keeps one swipe (many wheel events) from stepping through several sections.
    let wheelReadyAt = 0;
    window.addEventListener('wheel', e => {
      const now = performance.now();
      if (now < wheelReadyAt) return;
      const before = active;
      if (e.deltaY < 0 && atTop()) activate(0, { anchored: false });
      else if (e.deltaY > 0 && atBottom()) activate(active + 1);
      if (active !== before) wheelReadyAt = now + 600;
    }, { passive: true });

    folds.forEach((fold, i) => {
      summaryOf(fold).addEventListener('click', e => {
        e.preventDefault();
        if (i !== active) { activate(i, { anchored: false }); return; }
        if (fold.open && !fades.has(fold)) conceal(fold); else reveal(fold, null);
      });
    });
  }

  /* ---------- misc ---------- */
  document.getElementById('year').textContent = String(new Date().getFullYear());

  const masthead = document.querySelector('.masthead');
  new IntersectionObserver(([entry]) => masthead.classList.toggle('scrolled', !entry.isIntersecting))
    .observe(document.getElementById('sentinel'));

})();
