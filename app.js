(() => {
  'use strict';

  const ZH = {
    skip: '跳至正文', navWork: '研究', navPubs: '论文', navContact: '联系', scholar: '谷歌学术',
    role: '博士研究生 · 昆士兰大学 · 布里斯班',
    lede: '我研究深度学习系统是怎么出错的——模型本身，以及模型所依赖的软件库——并想办法<em>抢先</em>找到这些错误。',
    bio: '读博之前，我做的是让卷积网络更小、更省；现在，我主要在想办法把它们弄坏。我在昆士兰大学电气工程与计算机科学学院读博，导师是 <a href="https://guoweiyang.github.io/" target="_blank" rel="noopener noreferrer">Guowei Yang</a>。',
    figNo: '图 1', figCap: '一个示意性的决策空间。测试这件事，很大程度上就是知道该往哪里看。',
    workH: '研究',
    t1: '测试模型本身', t1d: '在神经网络的输入空间和参数空间里，寻找它会出错的地方；并防御针对模型权重的篡改。',
    t2: '测试模型所依赖的库', t2d: '深度学习库是每个模型都无条件信任的代码。我从它们的文档出发、并在不同框架间匹配等价 API，来为它们生成测试。',
    t3: '让大模型做工程', t3d: '用大语言模型生成和挑选代码，并帮 Android 应用迁移掉已弃用或不兼容的 API。',
    android: 'Android API 迁移',
    pubsH: '论文', pubsNote: '共九篇，完整列表见谷歌学术。', earlier: '更早 — 高效网络',
    contactH: '联系', contactLine: '欢迎聊测试、鲁棒性，或者合作。', copy: '复制',
    updated: '最后更新于 2026 年 11 月'
  };
  const MESSAGES = {
    en: { copied: 'Email copied', copyFailed: 'Copy failed — select the address instead', toggle: '中文', toggleLang: 'zh' },
    zh: { copied: '邮箱已复制', copyFailed: '复制失败，请手动选中地址', toggle: 'English', toggleLang: 'en' }
  };
  const STORAGE_KEY = 'bd-lang';

  // Capture the English copy from the markup once, so the HTML stays the single source for English.
  const textNodes = [...document.querySelectorAll('[data-i18n]')].map(el => ({ el, key: el.dataset.i18n, en: el.textContent, html: false }));
  const htmlNodes = [...document.querySelectorAll('[data-i18n-html]')].map(el => ({ el, key: el.dataset.i18nHtml, en: el.innerHTML, html: true }));
  const nodes = [...textNodes, ...htmlNodes];
  const toggle = document.getElementById('lang-toggle');
  let lang = 'en';

  function applyLanguage(next) {
    lang = next === 'zh' ? 'zh' : 'en';
    nodes.forEach(({ el, key, en, html }) => {
      const value = lang === 'zh' && ZH[key] ? ZH[key] : en;
      if (html) el.innerHTML = value; else el.textContent = value; // ZH html strings are static, authored above
    });
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    toggle.textContent = MESSAGES[lang].toggle;
    toggle.lang = MESSAGES[lang].toggleLang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (err) { /* storage unavailable: language just won't persist */ }
  }

  toggle.addEventListener('click', () => applyLanguage(lang === 'en' ? 'zh' : 'en'));
  let saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (err) { saved = null; }
  if (saved === 'zh') applyLanguage('zh');

  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
  }

  document.getElementById('copy-email').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('b.duan@uq.edu.au');
      showToast(MESSAGES[lang].copied);
    } catch (err) {
      showToast(MESSAGES[lang].copyFailed);
    }
  });

  document.getElementById('year').textContent = String(new Date().getFullYear());

  const masthead = document.querySelector('.masthead');
  new IntersectionObserver(([entry]) => {
    masthead.classList.toggle('scrolled', !entry.isIntersecting);
  }).observe(document.getElementById('sentinel'));
})();
