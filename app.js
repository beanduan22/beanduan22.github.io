(() => {
  'use strict';
  const translations = {
    en: {
      skip:'Skip to content', navResearch:'Research', navPublications:'Publications', navAbout:'About', scholar:'Google Scholar',
      heroEyebrow:'PHD RESEARCHER · THE UNIVERSITY OF QUEENSLAND', heroStatement:'Making intelligent systems<br>more <em>reliable.</em>',
      heroDescription:'I explore the intersection of software engineering and AI — testing the boundaries of intelligent systems, and building confidence in what comes next.',
      exploreResearch:'Explore my research', getInTouch:'Get in touch', location:'Brisbane, Australia', affiliation:'UQ · School of EECS',
      artEyebrow:'THE BEAUTY IN EXPLORATION', artTag:'Finding the unexpected.', artCaption:'A decision landscape, reimagined.',
      introStrip:'Good questions lead to<br><em>better systems.</em>', topicSE:'Software engineering', topicAI:'Deep learning reliability', topicLLM:'LLMs for software',
      researchEyebrow:'FOLLOWING THE QUESTIONS', researchTitle:'A few things I’m <em>exploring.</em>', researchDescription:'From the behavior of a single model to the libraries that power an entire ecosystem.',
      research1Category:'TESTING & RELIABILITY', research1Title:'Beyond the expected.', research1Description:'Exploring decision landscapes and adversarial robustness to better understand where deep learning systems break.',
      research2Category:'LLMS FOR SOFTWARE', research2Title:'From language to action.', research2Description:'Bringing large language models into software testing, code generation and the evolution of software APIs.',
      research3Category:'LIBRARIES & ECOSYSTEMS', research3Title:'Connecting the dots.', research3Description:'Matching APIs across deep learning frameworks and testing the compatibility of the libraries we depend on.',
      publicationsEyebrow:'IDEAS, IN PRINT', publicationsTitle:'Research & <em>publications.</em>', discussWork:'Interested in this work? Let’s talk.',
      filterAll:'All work', filterReliability:'Testing & reliability', filterLLM:'LLMs for software', filterEfficient:'Efficient learning', searchPlaceholder:'Find a paper',
      noResults:'No papers found.', noResultsDescription:'Try another title, author or keyword.', resetSearch:'Show all publications', publicationNote:'A continuing exploration of reliable software and intelligent systems.',
      aboutEyebrow:'THE PERSON BEHIND THE PAPERS', aboutTitle:'Driven by curiosity.<br>Grounded in <em>research.</em>',
      aboutDescription:'I’m Bin, a PhD researcher in Computer Science at the University of Queensland’s School of Electrical Engineering and Computer Science.',
      supervisedBy:'I’m fortunate to be advised by',
      aboutDescription2:'My research brings together software engineering and the reliability of deep learning systems, with a focus on how we test, understand and improve the software behind AI.',
      educationLabel:'EDUCATION', educationDate:'OCT 2023 — PRESENT', educationTitle:'A deeper understanding.', degree:'PhD in Computer Science', school:'School of Electrical Engineering and Computer Science', university:'The University of Queensland',
      contactEyebrow:'THE NEXT GOOD IDEA STARTS WITH A CONVERSATION', contactTitle:'Let’s talk <em>research.</em>', contactDescription:'Have a question, a shared curiosity, or an idea for collaboration? I’d love to hear it.', footerCopy:'Made with curiosity, in Brisbane.', backToTop:'Back to top',
      details:'Details', findPaper:'Find on Scholar', paperLink:'Paper', code:'Code', citation:'Citation', copyCitation:'Copy citation', citationCopied:'Citation copied', emailCopied:'Email address copied', copyFailed:'Couldn’t copy automatically. Please select and copy the text.', found:'publications found',
      themeDark:'Switch to dark theme', themeLight:'Switch to light theme', openMenu:'Open navigation', closeMenu:'Close navigation', closePaper:'Close publication details', copyEmail:'Copy email address', rotate:'Rotate landscape', searchLabel:'Search publications', filterLabel:'Filter publications', mainNav:'Main navigation', mobileNav:'Mobile navigation', landscapeLabel:'Interactive illustration of a decision landscape. Drag to explore, or use the Rotate landscape button.',
      preprintEyebrow:'WORK IN PROGRESS', preprintTitle:'New ideas. <em>Open conversations.</em>', preprintLabel:'Preprint'
    },
    zh: {
      skip:'跳至主要内容', navResearch:'研究方向', navPublications:'论文发表', navAbout:'关于我', scholar:'谷歌学术',
      heroEyebrow:'博士研究生 · 昆士兰大学', heroStatement:'探索智能系统的边界，<br>让每一步更加<em>可靠。</em>',
      heroDescription:'我的研究位于软件工程与人工智能的交汇处，关注如何测试、理解并提升智能系统的可靠性。',
      exploreResearch:'探索我的研究', getInTouch:'联系我', location:'澳大利亚 · 布里斯班', affiliation:'昆士兰大学 · EECS',
      artEyebrow:'探索之中，自有秩序', artTag:'发现意料之外。', artCaption:'换个视角，看见决策空间。',
      introStrip:'从好问题出发，<br><em>构建更可靠的系统。</em>', topicSE:'软件工程', topicAI:'深度学习系统可靠性', topicLLM:'大模型赋能软件工程',
      researchEyebrow:'循着问题，继续探索', researchTitle:'我正在探索的<em>方向。</em>', researchDescription:'从一个模型的行为，到支撑整个生态的软件库。',
      research1Category:'测试与可靠性', research1Title:'探索预期之外。', research1Description:'探索决策空间与对抗鲁棒性，理解深度学习系统在何处、为何出现问题。',
      research2Category:'大模型与软件工程', research2Title:'从语言，到行动。', research2Description:'将大语言模型应用于软件测试、代码生成与 API 演化。',
      research3Category:'软件库与生态', research3Title:'连接不同的世界。', research3Description:'匹配不同深度学习框架中的 API，测试我们所依赖的软件库的兼容性。',
      publicationsEyebrow:'让想法成为论文', publicationsTitle:'研究与<em>论文发表。</em>', discussWork:'对这些研究感兴趣？欢迎交流。',
      filterAll:'全部论文', filterReliability:'测试与可靠性', filterLLM:'大模型与软件', filterEfficient:'高效学习', searchPlaceholder:'搜索论文',
      noResults:'没有找到相关论文。', noResultsDescription:'试试其他标题、作者或关键词。', resetSearch:'查看全部论文', publicationNote:'持续探索可靠软件与智能系统。',
      aboutEyebrow:'论文之外的我', aboutTitle:'始于好奇，<br>深耕于<em>研究。</em>',
      aboutDescription:'我是 Bin Duan，自 2023 年 10 月起在昆士兰大学电气工程与计算机科学学院攻读计算机科学博士学位。',
      supervisedBy:'我的导师是',
      aboutDescription2:'我的研究结合软件工程与深度学习系统可靠性，关注如何测试、理解并改进人工智能背后的软件。',
      educationLabel:'教育经历', educationDate:'2023 年 10 月 — 至今', educationTitle:'求知，向更深处。', degree:'计算机科学博士在读', school:'电气工程与计算机科学学院', university:'澳大利亚昆士兰大学',
      contactEyebrow:'一个好想法，往往始于一次交流', contactTitle:'聊聊<em>研究吧。</em>', contactDescription:'无论是一个问题、共同的好奇，还是合作的想法，都欢迎与我联系。', footerCopy:'带着好奇，在布里斯班。', backToTop:'返回顶部',
      details:'查看详情', findPaper:'在学术中查找', paperLink:'论文', code:'代码', citation:'引用', copyCitation:'复制引用', citationCopied:'引用已复制', emailCopied:'邮箱地址已复制', copyFailed:'自动复制未成功，请选中文字后手动复制。', found:'篇相关论文',
      themeDark:'切换至深色模式', themeLight:'切换至浅色模式', openMenu:'打开导航', closeMenu:'关闭导航', closePaper:'关闭论文详情', copyEmail:'复制邮箱地址', rotate:'旋转决策空间', searchLabel:'搜索论文', filterLabel:'筛选论文', mainNav:'主导航', mobileNav:'移动端导航', landscapeLabel:'可交互的决策空间示意图。拖动以探索，或点击旋转按钮。',
      preprintEyebrow:'进行中的探索', preprintTitle:'新的想法，<em>开放的讨论。</em>', preprintLabel:'预印本'
    }
  };
  const storage={get(key){try{return localStorage.getItem(key)}catch{return null}},set(key,value){try{localStorage.setItem(key,value)}catch{}}};
  let language=storage.get('bd-language')==='zh'?'zh':'en';
  let activeFilter='all', query='', currentPaper=null, toastTimer;
  const list=document.getElementById('publication-list');
  const search=document.getElementById('publication-search');
  const dialog=document.getElementById('paper-dialog');
  const t=key=>translations[language][key]||translations.en[key]||key;
  const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const icon='<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M11 3H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9M11 3v6h6M11 3l6 6"/></svg>';
  function safeUrl(value) {try{const url=new URL(value);return ['https:','http:'].includes(url.protocol)?escape(url.href):''}catch{return ''}}
  function citation(p){return `${p.authors.join(', ')}. ${p.title}. ${p.fullVenue||p.venue||'Preprint'}${p.year?`, ${p.year}`:''}.`;}
  function authorHTML(p){return p.authors.map(name=>name==='Bin Duan'?`<strong>${escape(name)}</strong>`:escape(name)).join(', ');}
  function externalLink(url,label){const href=safeUrl(url);return href?`<a href="${href}" target="_blank" rel="noopener noreferrer">${escape(label)}</a>`:'';}
  function scholarURL(p){return `https://scholar.google.com/scholar?q=${encodeURIComponent('"'+p.title+'"')}`;}
  function renderPaper(p,isPreprint=false){
    return `<article class="publication-item" data-tone="${escape(p.tone||'blue')}"><div class="publication-venue"><span class="venue-label">${escape(isPreprint?t('preprintLabel'):p.venue)}</span>${p.year?`<span class="venue-year">${escape(p.year)}</span>`:''}</div><div class="publication-content"><h3><button class="paper-title" data-paper="${escape(p.id)}">${escape(p.title)}</button></h3><p class="publication-authors">${authorHTML(p)}</p><div class="publication-links">${p.url?externalLink(p.url,t('paperLink')):externalLink(scholarURL(p),t('findPaper'))}${p.arxivUrl?externalLink(p.arxivUrl,'arXiv'):''}<button data-cite="${escape(p.id)}">${icon}${t('citation')}</button>${p.codeUrl?externalLink(p.codeUrl,t('code')):''}</div></div><button class="icon-button paper-open" data-paper="${escape(p.id)}" aria-label="${escape(t('details')+': '+p.title)}">+</button></article>`;
  }
  function renderPublications(){
    const papers=window.PUBLICATIONS.filter(p=>(activeFilter==='all'||p.categories.includes(activeFilter))&&[p.title,...p.authors,p.venue,p.year||''].join(' ').toLowerCase().includes(query.toLowerCase().trim()));
    list.innerHTML=papers.map(p=>renderPaper(p)).join('');
    document.getElementById('no-results').hidden=papers.length!==0;
    document.getElementById('publication-status').textContent=language==='zh'?`找到 ${papers.length} ${t('found')}`:`${papers.length} ${t('found')}`;
    document.querySelector('.filter-total').textContent=window.PUBLICATIONS.length;
    document.querySelectorAll('[data-filter]').forEach(button=>{const active=button.dataset.filter===activeFilter;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
  }
  function renderPreprints(){
    let section=document.getElementById('preprints');
    if(!window.PREPRINTS.length){if(section)section.remove();return;}
    if(!section){section=document.createElement('section');section.id='preprints';section.className='preprints-section container';section.setAttribute('aria-labelledby','preprints-title');document.getElementById('publications').after(section);}
    section.innerHTML=`<div class="section-heading"><div><div class="eyebrow">${t('preprintEyebrow')}</div><h2 id="preprints-title">${t('preprintTitle')}</h2></div></div><div class="publication-list">${window.PREPRINTS.map(p=>renderPaper(p,true)).join('')}</div>`;
  }
  function updateThemeLabel(){const dark=document.documentElement.dataset.theme==='dark';document.getElementById('theme-toggle').setAttribute('aria-label',t(dark?'themeLight':'themeDark'));document.getElementById('theme-toggle').setAttribute('aria-pressed',String(dark));document.querySelector('meta[name="theme-color"]').content=dark?'#111722':'#f9fafc';}
  function updateLanguage(){
    document.documentElement.lang=language==='zh'?'zh-CN':'en';
    document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));
    document.querySelectorAll('[data-i18n-html]').forEach(el=>el.innerHTML=t(el.dataset.i18nHtml));
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>el.placeholder=t(el.dataset.i18nPlaceholder));
    const toggle=document.getElementById('language-toggle');toggle.textContent=language==='zh'?'EN':'中文';toggle.setAttribute('aria-label',language==='zh'?'Switch to English':'切换至中文');
    [['#close-dialog','closePaper'],['#copy-email','copyEmail'],['#rotate-landscape','rotate'],['#publication-search','searchLabel'],['.publication-filters','filterLabel'],['.main-nav','mainNav'],['.mobile-nav','mobileNav'],['#landscape','landscapeLabel']].forEach(([sel,key])=>document.querySelector(sel).setAttribute('aria-label',t(key)));
    document.getElementById('menu-toggle').setAttribute('aria-label',t(document.getElementById('menu-toggle').getAttribute('aria-expanded')==='true'?'closeMenu':'openMenu'));
    updateThemeLabel();renderPublications();renderPreprints();if(currentPaper)renderDialog(currentPaper);
  }
  function toast(message){const element=document.getElementById('toast');clearTimeout(toastTimer);element.textContent=message;element.classList.add('visible');toastTimer=setTimeout(()=>element.classList.remove('visible'),3000);}
  async function copy(text,success){
    try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text);}else{const input=document.createElement('textarea');input.value=text;input.style.cssText='position:fixed;left:-9999px;top:0';(dialog.open?dialog:document.body).append(input);input.select();const ok=document.execCommand('copy');input.remove();if(!ok)throw new Error('copy failed');}toast(t(success));}catch{toast(t('copyFailed'));}
  }
  function renderDialog(p){
    const preprint=window.PREPRINTS.includes(p);
    document.getElementById('dialog-content').innerHTML=`<span class="venue-label">${escape(preprint?t('preprintLabel'):p.venue)}${p.year?` · ${escape(p.year)}`:''}</span><h2 class="dialog-title" id="dialog-title">${escape(p.title)}</h2><p class="dialog-authors">${authorHTML(p)}</p><p class="dialog-venue">${escape(p.fullVenue||p.venue||t('preprintLabel'))}</p><div class="dialog-actions"><a class="button button-primary" href="${safeUrl(p.url||scholarURL(p))}" target="_blank" rel="noopener noreferrer">${escape(p.url?t('paperLink'):t('findPaper'))}</a>${p.arxivUrl?`<a class="button button-outline" href="${safeUrl(p.arxivUrl)}" target="_blank" rel="noopener noreferrer">arXiv</a>`:''}<button class="button button-outline" data-cite="${escape(p.id)}">${t('copyCitation')}</button>${p.codeUrl?`<a class="button button-outline" href="${safeUrl(p.codeUrl)}" target="_blank" rel="noopener noreferrer">${t('code')}</a>`:''}</div><p class="dialog-label">${t('citation').toUpperCase()}</p><p class="dialog-citation">${escape(citation(p))}</p>`;
  }
  function findPaper(id){return [...window.PUBLICATIONS,...window.PREPRINTS].find(p=>p.id===id);}
  document.addEventListener('click',e=>{
    const paperButton=e.target.closest('[data-paper]');
    if(paperButton){const p=findPaper(paperButton.dataset.paper);if(p){currentPaper=p;renderDialog(p);dialog.showModal();document.body.classList.add('dialog-open');}return;}
    const citeButton=e.target.closest('[data-cite]');if(citeButton){const p=findPaper(citeButton.dataset.cite);if(p)copy(citation(p),'citationCopied');}
  });
  document.getElementById('close-dialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{currentPaper=null;document.body.classList.remove('dialog-open');});
  dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)dialog.close();});
  document.getElementById('language-toggle').addEventListener('click',()=>{language=language==='en'?'zh':'en';storage.set('bd-language',language);updateLanguage();});
  document.getElementById('theme-toggle').addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=theme;storage.set('bd-theme',theme);updateThemeLabel();});
  document.getElementById('copy-email').addEventListener('click',()=>copy('b.duan@uq.edu.au','emailCopied'));
  search.addEventListener('input',()=>{query=search.value;renderPublications();});
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{activeFilter=button.dataset.filter;renderPublications();}));
  document.getElementById('reset-search').addEventListener('click',()=>{activeFilter='all';query='';search.value='';renderPublications();search.focus();});
  document.querySelectorAll('[data-focus]').forEach(link=>link.addEventListener('click',()=>{activeFilter=link.dataset.focus;query='';search.value='';renderPublications();}));
  const menuToggle=document.getElementById('menu-toggle'),mobileNav=document.getElementById('mobile-nav');
  function closeMenu(){mobileNav.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label',t('openMenu'));}
  menuToggle.addEventListener('click',()=>{const open=mobileNav.hidden;mobileNav.hidden=!open;menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',t(open?'closeMenu':'openMenu'));});
  mobileNav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!mobileNav.hidden){closeMenu();menuToggle.focus();}});
  window.matchMedia('(min-width: 651px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
  document.getElementById('current-year').textContent=new Date().getFullYear();
  if('IntersectionObserver' in window){
    document.documentElement.classList.add('motion-ready');
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
    const navObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)document.querySelectorAll('.main-nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+entry.target.id));}),{rootMargin:'-18% 0px -58% 0px'});document.querySelectorAll('#research,#publications,#about').forEach(el=>navObserver.observe(el));
  }
  updateLanguage();
})();
