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
  // While scrolling, the lowest section whose heading sits in the top three quarters of the
  // screen opens and the others close. Reaching the bottom opens the last section; scrolling
  // back to the top opens the first. Opening/closing is animated, and every frame the scroll
  // position absorbs the height change of sections above the active one, so its heading stays
  // put without fighting the user's own scrolling.
  const folds = [...document.querySelectorAll('details.fold')];
  if (folds.length) {
    const TRIGGER = 0.75;
    const DURATION = 460;
    const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const bodyOf = f => f.querySelector('.fold-body');
    const anims = new Map();
    let lastY = window.scrollY;
    let busyUntil = 0;
    let compensating = false;

    const animateFold = (fold, open) => {
      const body = bodyOf(fold);
      const running = anims.get(fold);
      const from = fold.open ? body.getBoundingClientRect().height : 0;
      const fromOpacity = running ? Number(getComputedStyle(body).opacity) : (fold.open ? 1 : 0);
      if (running) running.cancel();
      if (open) fold.open = true;
      const to = open ? body.scrollHeight : 0;
      body.classList.add('is-animating');
      const anim = body.animate(
        [{ height: `${from}px`, opacity: fromOpacity }, { height: `${to}px`, opacity: open ? 1 : 0 }],
        { duration: DURATION, easing: EASE }
      );
      anims.set(fold, anim);
      anim.onfinish = () => {
        if (!open) fold.open = false;
        body.classList.remove('is-animating');
        anims.delete(fold);
      };
    };

    // Total rendered height of the fold bodies above `index`.
    const heightAbove = index => folds.slice(0, index)
      .reduce((sum, f) => sum + (f.open ? bodyOf(f).getBoundingClientRect().height : 0), 0);

    const compensate = index => {
      if (compensating) return;
      compensating = true;
      let prev = heightAbove(index);
      const step = () => {
        const now = heightAbove(index);
        if (now !== prev) window.scrollBy({ top: now - prev, behavior: 'instant' });
        prev = now;
        if (anims.size) requestAnimationFrame(step);
        else { compensating = false; lastY = window.scrollY; }
      };
      requestAnimationFrame(step);
    };

    const focusFold = target => {
      if (target.open && !anims.get(target) && folds.every(f => f === target || !f.open)) return;
      const index = folds.indexOf(target);
      if (reducedMotion.matches) {
        const anchor = target.querySelector('summary');
        const before = anchor.getBoundingClientRect().top;
        folds.forEach(f => { f.open = f === target; });
        const shift = anchor.getBoundingClientRect().top - before;
        if (shift) window.scrollBy({ top: shift, behavior: 'instant' });
        busyUntil = performance.now() + 250;
        return;
      }
      folds.forEach(f => {
        const wantOpen = f === target;
        const isOpening = anims.has(f) ? f.dataset.state === 'opening' : f.open;
        if (wantOpen !== isOpening) { f.dataset.state = wantOpen ? 'opening' : 'closing'; animateFold(f, wantOpen); }
      });
      busyUntil = performance.now() + DURATION;
      compensate(index);
    };

    const closeFold = fold => {
      if (!fold.open) return;
      if (reducedMotion.matches) { fold.open = false; return; }
      fold.dataset.state = 'closing';
      animateFold(fold, false);
      busyUntil = performance.now() + DURATION;
    };

    const openIndex = () => folds.findIndex(f => f.open && f.dataset.state !== 'closing');
    const atTop = () => window.scrollY <= 2;
    const atBottom = () => window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    const pickActive = goingUp => {
      const line = window.innerHeight * TRIGGER;
      const byLine = Math.max(0, folds.map(f => f.querySelector('summary').getBoundingClientRect().top < line).lastIndexOf(true));
      if (!goingUp && atBottom() && folds[byLine].open) return folds[Math.min(folds.length - 1, byLine + 1)];
      if (goingUp && atTop()) return folds[Math.max(0, openIndex() - 1)];
      return folds[byLine];
    };
    const update = () => {
      const y = window.scrollY;
      const goingUp = y < lastY;
      lastY = y;
      if (performance.now() < busyUntil || compensating) return;
      focusFold(pickActive(goingUp));
    };

    folds.forEach(f => {
      f.dataset.state = f.open ? 'opening' : 'closing';
      f.querySelector('summary').addEventListener('click', e => {
        e.preventDefault();
        const opening = f.dataset.state !== 'opening' || !f.open;
        if (opening) focusFold(f); else closeFold(f);
      });
    });

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; update(); });
    }, { passive: true });
    // Already at the top: a further upward wheel/swipe produces no scroll event, so listen for it.
    window.addEventListener('wheel', e => {
      if (performance.now() < busyUntil || compensating) return;
      if (e.deltaY < 0 && atTop()) focusFold(folds[Math.max(0, openIndex() - 1)]);
      else if (e.deltaY > 0 && atBottom()) focusFold(folds[Math.min(folds.length - 1, openIndex() + 1)]);
    }, { passive: true });
  }

  /* ---------- misc ---------- */
  document.getElementById('year').textContent = String(new Date().getFullYear());

  const masthead = document.querySelector('.masthead');
  new IntersectionObserver(([entry]) => masthead.classList.toggle('scrolled', !entry.isIntersecting))
    .observe(document.getElementById('sentinel'));

})();
