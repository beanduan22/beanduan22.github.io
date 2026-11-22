(() => {
  'use strict';

  const ZH = {
    skip: '跳至正文', navPubs: '论文', scholar: '谷歌学术',
    role: '博士研究生 · 昆士兰大学 · 布里斯班',
    bio: '我在昆士兰大学电气工程与计算机科学学院攻读计算机科学博士，导师是 <a href="https://guoweiyang.github.io/" target="_blank" rel="noopener noreferrer">Guowei Yang</a>。我的研究聚焦三个方向：<em>深度学习库测试</em>、<em>深度学习模型可靠性</em>，以及<em>大模型与软件工程</em>。',
    researchH: '研究方向',
    t1: '深度学习库测试',
    t1d: '每个模型都无条件地信任它的框架。一次卷积或缩放调用里的 bug，会悄无声息地传到上层的每一个应用。我为这些库构建模糊测试工具：从文档中学习合法输入长什么样，并在不同框架之间比较等价的 API，从而发现那些在 CPU 和 GPU 上表现完全一致、因此很难被察觉的 bug。',
    t1how: '用大模型解析 API 文档 → 参数约束 → 定向生成输入（VistaFuzz）；跨框架 API 匹配 + 方差引导的差分测试（XAMT）。',
    t1found: '在 330 个 OpenCV API 中发现 17 个新 bug；在五个深度学习框架、839 个匹配 API 中发现 17 个 bug。',
    t2: '模型可靠性：神经网络的测试与防御',
    t2d: '模型会以两种方式失效：遇到没人预料到的输入，或者权重被人篡改。在测试一侧，我不做随机变异，而是去错误真正所在的地方找——输入中对决策最关键的区域，并由网络的不确定性来引导搜索。在防御一侧，我保护已部署模型的权重，让稀疏、连续或结构化的参数攻击在无需重新训练的情况下失效。',
    t2how: '显著性引导的变异 + 贝叶斯优化（BayesWarp）；带密钥的通道重参数化 + 可纠错的权重量化（ParDef）。',
    t2on: 'MNIST、CIFAR-10/100、Tiny-ImageNet、ImageNet；ResNet、VGG 等多种网络结构。',
    t3: '大模型与软件工程',
    t3d: '大模型能写出看起来合理的代码，问题是该相信哪一段。我和合作者研究如何从多个模型的输出中挑出最可靠的程序，也用大模型去做那些不起眼但真实存在的维护工作：帮 Android 应用迁移掉已弃用、不兼容的 API。',
    t3how: '基于语法、语义和行为相似度的集成投票（EnsLLM）；“提示 + 测试”的迭代修复循环，用于 API 迁移（GUPPY）。',
    t3res: '集成方法在 HumanEval 上达到 90.2%，最好的单个模型为 83.5%。',
    how: '方法', tested: '数据', found: '发现', result: '结果', papers: '论文',
    navAbout: '关于', pubsH: '论文', selectedH: '代表论文', noteSelected: '第一作者论文。', allLink: '全部论文',
    pubsIntro: '等级参考 CCF 推荐目录（2022）与 CORE 2023（会议）。完整列表见 <a href="https://scholar.google.com/citations?user=vhagAc0AAAAJ" target="_blank" rel="noopener noreferrer">谷歌学术</a>。',
    newsH: '动态',
    n1: '<em>Testing Neural Networks via Bayesian-Guided Exploration of Decision Landscapes</em>（BayesWarp）发表于 IEEE TSE。',
    n2: '<em>Toward a Generalized Defense Across Sparse, Continuous, and Structured Parameter Attacks</em>（ParDef）发表于 IEEE TDSC。',
    n3: '我们关于集成式代码生成的论文发表于 ICSE 2026（里约热内卢）。',
    n4: '我们用大模型更新 Android 弃用 API 用法的论文（GUPPY）发表于 IEEE TSE。',
    n5: 'XAMT（跨框架 API 匹配的深度学习库测试）发表于 ISSRE 2025（圣保罗）。',
    n6: 'VistaFuzz（大模型驱动、文档引导的 OpenCV 模糊测试）发表于 ICSME 2025（奥克兰）。',
    n7: '我们关于检测 Android 第三方库不兼容 API 的工作发表于 FORGE 2025（渥太华）。',
    n8: '在昆士兰大学开始读博，导师 Guowei Yang。',
    updated: '最后更新于 2026 年 11 月'
  };

  const UI = {
    en: { toggle: '中文', toggleLang: 'zh', abstract: 'abstract', bibtex: 'bibtex', copyBib: 'copy bibtex', paper: 'paper', code: 'code',
      emailCopied: 'Email copied', bibCopied: 'BibTeX copied', copyFailed: 'Copy failed — please select the text instead', earlier: 'Earlier', preprints: 'Preprints' },
    zh: { toggle: 'English', toggleLang: 'en', abstract: '摘要', bibtex: 'BibTeX', copyBib: '复制 BibTeX', paper: '论文', code: '代码',
      emailCopied: '邮箱已复制', bibCopied: 'BibTeX 已复制', copyFailed: '复制失败，请手动选中文字', earlier: '更早', preprints: '预印本' }
  };
  const STORAGE_KEY = 'bd-lang';
  const SELF = 'Bin Duan';
  const pubs = window.PUBLICATIONS || [];
  let lang = 'en';
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

  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
  }
  async function copyText(text, okMessage) {
    try {
      await navigator.clipboard.writeText(text);
      showToast(okMessage);
    } catch (err) {
      showToast(UI[lang].copyFailed);
    }
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
      p.ccf ? el('span', { class: `rank rank-${p.ccf === 'A' ? 'top' : 'mid'}`, text: `CCF-${p.ccf}` }) : null,
      p.core ? el('span', { class: `rank rank-${p.core.startsWith('A') ? 'top' : 'mid'}`, text: `CORE ${p.core}` }) : null
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

  function renderPub(p) {
    const t = UI[lang];
    const titleHref = p.doi ? `https://doi.org/${p.doi}` : `https://scholar.google.com/scholar?q=${encodeURIComponent(`"${p.title}"`)}`;
    const links = el('p', { class: 'pub-links' });
    if (p.doi) links.append(externalLink(`https://doi.org/${p.doi}`, t.paper));
    if (p.arxiv) links.append(externalLink(`https://arxiv.org/abs/${p.arxiv}`, 'arXiv'));
    if (p.code) links.append(externalLink(p.code, t.code));
    const node = el('article', { class: 'pub' });
    if (p.abstract) {
      const b = el('button', { type: 'button', 'aria-expanded': 'false', text: t.abstract });
      b.addEventListener('click', () => togglePanel(b, node, 'abstract', () => el('p', { class: 'abstract', text: p.abstract })));
      links.append(b);
    }
    const bibBtn = el('button', { type: 'button', 'aria-expanded': 'false', text: t.bibtex });
    bibBtn.addEventListener('click', () => togglePanel(bibBtn, node, 'bibtex', () => el('pre', { class: 'bibtex', text: toBibtex(p) })));
    const copyBtn = el('button', { type: 'button', text: t.copyBib });
    copyBtn.addEventListener('click', () => copyText(toBibtex(p), UI[lang].bibCopied));
    links.append(bibBtn, copyBtn);

    const heading = el('h4', {}, [p.tool ? el('span', { class: 'pub-tool', text: p.tool }) : null, externalLink(titleHref, p.title)]);
    const venue = el('div', { class: 'pub-venue' }, [
      el('p', { text: p.venue }, [p.year < 2023 ? el('span', { text: String(p.year) }) : null]),
      rankBadges(p)
    ]);
    const full = p.fullVenue !== p.venue ? el('p', { class: 'pub-full', text: p.fullVenue }) : null;
    node.append(venue, el('div', { class: 'pub-body' }, [heading, authorsLine(p.authors), full, links]));
    return node;
  }

  function renderPublications() {
    const list = document.getElementById('pub-list');
    if (!list) return;
    const view = list.dataset.view;
    const shown = pubs.filter(p => view === 'all' || isSelected(p))
      .sort((a, b) => (b.type === 'preprint') - (a.type === 'preprint'));
    const groups = [];
    shown.forEach(p => {
      const label = p.type === 'preprint' ? UI[lang].preprints : p.year < 2023 ? UI[lang].earlier : String(p.year);
      const last = groups[groups.length - 1];
      if (last && last.label === label) last.items.push(p); else groups.push({ label, items: [p] });
    });
    list.replaceChildren(...groups.flatMap(g => [el('h3', { class: 'year', text: g.label }), ...g.items.map(renderPub)]));
  }


  function renderThreadPapers() {
    document.querySelectorAll('.thread[data-topic]').forEach(thread => {
      const slot = thread.querySelector('.thread-papers');
      const items = pubs.filter(p => p.topic === thread.dataset.topic).map(p => {
        const label = p.type === 'preprint' ? `${p.tool || p.title} · ${UI[lang].preprints}` : `${p.tool ? p.tool + ' · ' : ''}${p.venue} ’${String(p.year).slice(2)}`;
        const href = p.doi ? `https://doi.org/${p.doi}` : p.arxiv ? `https://arxiv.org/abs/${p.arxiv}` : 'publications.html';
        return el('a', { class: 'thread-paper', href, target: href.startsWith('http') ? '_blank' : '_self', rel: 'noopener noreferrer', text: label });
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

  /* ---------- language ---------- */
  const nodes = [
    ...[...document.querySelectorAll('[data-i18n]')].map(n => ({ n, key: n.dataset.i18n, en: n.textContent, html: false })),
    ...[...document.querySelectorAll('[data-i18n-html]')].map(n => ({ n, key: n.dataset.i18nHtml, en: n.innerHTML, html: true }))
  ];
  const toggle = document.getElementById('lang-toggle');

  function applyLanguage(next) {
    lang = next === 'zh' ? 'zh' : 'en';
    nodes.forEach(({ n, key, en, html }) => {
      const value = lang === 'zh' && ZH[key] ? ZH[key] : en;
      if (html) n.innerHTML = value; else n.textContent = value; // ZH html strings are static, authored above
    });
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    toggle.textContent = UI[lang].toggle;
    toggle.lang = UI[lang].toggleLang;
    renderPublications();
    renderThreadPapers();
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (err) { /* storage unavailable: choice just won't persist */ }
  }
  toggle.addEventListener('click', () => applyLanguage(lang === 'en' ? 'zh' : 'en'));

  let saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (err) { saved = null; }
  applyLanguage(saved === 'zh' ? 'zh' : 'en');

  /* ---------- misc ---------- */
  document.getElementById('year').textContent = String(new Date().getFullYear());

  const masthead = document.querySelector('.masthead');
  new IntersectionObserver(([entry]) => masthead.classList.toggle('scrolled', !entry.isIntersecting))
    .observe(document.getElementById('sentinel'));

})();
