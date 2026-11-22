(() => {
  'use strict';

  const ZH = {
    skip: '跳至正文', navResearch: '研究', navTools: '工具', navPubs: '论文', navAbout: '关于', scholar: '谷歌学术',
    role: '博士研究生 · 昆士兰大学 · 布里斯班',
    lede: '我研究深度学习系统是怎么出错的——模型本身，以及模型所依赖的软件库——并想办法<em>抢先</em>找到这些错误。',
    bio: '我在昆士兰大学电气工程与计算机科学学院攻读计算机科学博士，导师是 <a href="https://guoweiyang.github.io/" target="_blank" rel="noopener noreferrer">Guowei Yang</a>。我的工作处在软件工程与机器学习之间：为神经网络、以及支撑它们的深度学习框架构建测试工具，并用大语言模型让测试更聪明。在此之前，我研究的是如何让卷积网络更小、更省。',
    figNo: '图 1', figCap: '一个示意性的决策空间。BayesWarp 就是在这样的空间里，寻找模型判断发生翻转的区域。',
    statPapers: '篇论文，其中 4 篇为第一作者', statBugs: '个在 OpenCV 和深度学习框架中新发现的 bug', statConfirmed: '个已被库的开发者确认', statLibs: '个被测试的库：OpenCV、PyTorch、TensorFlow、Keras、Chainer、JAX',
    researchH: '研究方向',
    t1: '测试模型本身',
    t1d: '随机变异或覆盖率引导的方法，往往反复找到同几类错误，而且生成的输入容易偏离真实数据。我更关注错误真正所在的地方：输入中对决策最关键的区域，并用模型的不确定性来引导搜索。另一面是防御——模型部署之后，权重可能被篡改，而这种破坏会影响之后的每一次预测。',
    t1how: '显著性引导的变异 + 贝叶斯优化（BayesWarp）；带密钥的通道重参数化 + 可纠错的权重量化（ParDef）。',
    t1on: 'MNIST、CIFAR-10/100、Tiny-ImageNet、ImageNet；包括 ResNet、VGG 在内的多种网络结构。',
    t2: '测试模型所依赖的库',
    t2d: '每个模型都无条件地信任它的框架。一次卷积或缩放调用里的 bug，会悄无声息地传到上层的每一个应用。我为这些库构建模糊测试工具：从文档中学习合法输入长什么样，并在不同框架之间比较等价的 API，从而发现那些在 CPU 和 GPU 上表现完全一致、因此很难被察觉的 bug。',
    t2how: '用大模型解析 API 文档 → 参数约束 → 定向生成输入（VistaFuzz）；跨框架 API 匹配 + 方差引导的差分测试（XAMT）。',
    t2found: '在 330 个 OpenCV API 中发现 17 个新 bug；在五个深度学习框架、839 个匹配 API 中发现 17 个 bug。',
    t3: '让大模型做工程',
    t3d: '大模型能写出看起来合理的代码，问题是该相信哪一段。我和合作者研究如何从多个模型的输出中挑出最可靠的程序，也用大模型去做那些不起眼但真实存在的维护工作：帮 Android 应用迁移掉已弃用、不兼容的 API。',
    t3how: '基于语法、语义和行为相似度的集成投票（EnsLLM）；“提示 + 测试”的迭代修复循环，用于 API 迁移（GUPPY）。',
    t3res: '集成方法在 HumanEval 上达到 90.2%，最好的单个模型为 83.5%。',
    how: '方法', tested: '数据', found: '发现', result: '结果',
    toolsH: '工具', toolsNote: '研究原型，大部分已开源。条形图表示论文中报告的 bug 数：发现 / 确认 / 修复。',
    colTool: '工具', colWhat: '做什么', colEvidence: '证据', colWhere: '发表于',
    vfWhat: '用大模型做文档引导的 OpenCV 模糊测试', xaWhat: '跨框架 API 匹配与差分测试', bwWhat: '贝叶斯引导的神经网络测试生成',
    bwEv: '在相同预算下发现更多、更多样的错误', pdWhat: '针对参数（权重）攻击的通用防御', pdEv: '在稀疏、连续、结构化三类攻击下都降低了攻击成功率',
    enWhat: '从多个大模型的输出中挑出最可信的程序', enNums: '90.2% 对 83.5%', guWhat: '用大模型自动更新已弃用的 Android API 用法', guEv: '覆盖至 API level 34 的 516 处弃用用法',
    kFound: '发现', kConf: '确认', kFixed: '修复',
    pubsH: '论文', fAll: '全部', fModels: '模型测试', fLibraries: '库测试', fLLM: '大模型与软件工程', fEfficient: '高效网络',
    timeH: '时间线',
    tl2026: 'BayesWarp 发表于 IEEE TSE，ParDef 发表于 IEEE TDSC；集成代码生成工作发表于 ICSE。',
    tl2025: '第一批第一作者会议论文：ICSME 上的 VistaFuzz 与 ISSRE 上的 XAMT；基于大模型的 Android API 工作发表于 IEEE TSE 与 FORGE。',
    tl2023: '10 月在昆士兰大学开始读博，与 Guowei Yang 一起研究深度学习系统的测试。',
    tl2021: '基于贝叶斯学习的共享分组卷积，发表于 IEEE TNNLS。',
    tl2019: '第一篇论文：在通道维度上共享卷积核以减少 CNN 参数，发表于 ICCECE。',
    aboutH: '关于与联系', eduH: '教育', eduWhen: '2023 年 10 月 – 至今', eduWhat: '计算机科学博士', eduWhere: '昆士兰大学 电气工程与计算机科学学院',
    intH: '兴趣', interests: '软件测试 · 模糊测试 · 深度学习可靠性 · 对抗与参数攻击 · 大模型与软件工程 · API 演化',
    contactLine: '欢迎聊测试、鲁棒性，或者合作。', copy: '复制', updated: '最后更新于 2026 年 11 月'
  };

  const UI = {
    en: { toggle: '中文', toggleLang: 'zh', abstract: 'abstract', bibtex: 'bibtex', copyBib: 'copy bibtex', paper: 'paper', code: 'code',
      emailCopied: 'Email copied', bibCopied: 'BibTeX copied', copyFailed: 'Copy failed — please select the text instead', earlier: 'Earlier' },
    zh: { toggle: 'English', toggleLang: 'en', abstract: '摘要', bibtex: 'BibTeX', copyBib: '复制 BibTeX', paper: '论文', code: '代码',
      emailCopied: '邮箱已复制', bibCopied: 'BibTeX 已复制', copyFailed: '复制失败，请手动选中文字', earlier: '更早' }
  };
  const STORAGE_KEY = 'bd-lang';
  const SELF = 'Bin Duan';
  const pubs = window.PUBLICATIONS || [];
  let lang = 'en';
  let topic = 'all';

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
    const venueField = p.type === 'article' ? 'journal' : 'booktitle';
    const fields = [
      ['title', `{${p.title}}`],
      ['author', p.authors.join(' and ')],
      [venueField, p.fullVenue],
      ['year', String(p.year)],
      p.doi ? ['doi', p.doi] : null
    ].filter(Boolean);
    const body = fields.map(([k, v]) => `  ${k.padEnd(9)} = {${v}}`).join(',\n');
    return `@${p.type}{${p.key},\n${body}\n}`;
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
    const venue = el('p', { class: 'pub-venue', text: p.venue }, [p.year < 2023 ? el('span', { text: String(p.year) }) : null]);
    const full = p.fullVenue !== p.venue ? el('p', { class: 'pub-full', text: p.fullVenue }) : null;
    node.append(venue, el('div', { class: 'pub-body' }, [heading, authorsLine(p.authors), full, links]));
    return node;
  }

  function renderPublications() {
    const list = document.getElementById('pub-list');
    if (!list) return;
    const shown = pubs.filter(p => topic === 'all' || p.topic === topic);
    const groups = [];
    shown.forEach(p => {
      const label = p.year < 2023 ? UI[lang].earlier : String(p.year);
      const last = groups[groups.length - 1];
      if (last && last.label === label) last.items.push(p); else groups.push({ label, items: [p] });
    });
    list.replaceChildren(...groups.flatMap(g => [el('h3', { class: 'year', text: g.label }), ...g.items.map(renderPub)]));
  }

  document.querySelectorAll('#pub-filters button').forEach(btn => {
    btn.addEventListener('click', () => {
      topic = btn.dataset.topic;
      document.querySelectorAll('#pub-filters button').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
      renderPublications();
    });
  });

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
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (err) { /* storage unavailable: choice just won't persist */ }
  }
  toggle.addEventListener('click', () => applyLanguage(lang === 'en' ? 'zh' : 'en'));

  let saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (err) { saved = null; }
  applyLanguage(saved === 'zh' ? 'zh' : 'en');

  /* ---------- misc ---------- */
  document.getElementById('copy-email').addEventListener('click', () => copyText('b.duan@uq.edu.au', UI[lang].emailCopied));
  document.getElementById('year').textContent = String(new Date().getFullYear());

  const masthead = document.querySelector('.masthead');
  new IntersectionObserver(([entry]) => masthead.classList.toggle('scrolled', !entry.isIntersecting))
    .observe(document.getElementById('sentinel'));

  const tools = document.getElementById('tools');
  const io = new IntersectionObserver(entries => {
    if (entries.some(e => e.isIntersecting)) { tools.classList.add('in-view'); io.disconnect(); }
  }, { threshold: 0.25 });
  io.observe(tools);
})();
