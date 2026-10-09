const header=document.getElementById('header');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>45),{passive:true});

const menu=document.getElementById('menuBtn');
menu?.addEventListener('click',()=>{
  document.body.classList.toggle('mobile-open');
  menu.setAttribute('aria-expanded',document.body.classList.contains('mobile-open'));
  let panel=document.querySelector('.mobile-panel');
  if(!panel){
    panel=document.createElement('div');
    panel.className='mobile-panel';
    panel.innerHTML=`
      <button class="mobile-close" aria-label="Close menu">×</button>
      <a href="#services">SERVICES</a>
      <a href="#government">GOVERNMENT</a>
      <a href="#community">COMMUNITY</a>
      <a href="#portfolio">EXPLORE</a>
      <a href="#business">BUSINESS</a>
      <a href="#news">NEWS & EVENTS</a>`;
    document.body.appendChild(panel);
    panel.querySelector('.mobile-close').onclick=closeMenu;
    panel.querySelectorAll('a').forEach(a=>a.onclick=closeMenu);
    const s=document.createElement('style');
    s.textContent=`
      .mobile-panel{position:fixed;z-index:140;inset:0;background:#111;color:#fff;display:flex;flex-direction:column;justify-content:center;padding:10vw;gap:24px;transform:translateX(100%);transition:.4s}
      .mobile-open .mobile-panel{transform:none}
      .mobile-panel a{font:800 48px/.88 'Barlow Condensed';text-transform:uppercase}
      .mobile-panel a:hover{color:#FFFF00}
      .mobile-close{position:absolute;top:24px;right:7vw;background:none;border:0;color:#fff;font-size:44px}`;
    document.head.appendChild(s);
  }
});
function closeMenu(){document.body.classList.remove('mobile-open');menu?.setAttribute('aria-expanded','false')}

const searchPanel=document.getElementById('searchPanel');
const searchTrigger=document.getElementById('searchTrigger');
const searchClose=document.getElementById('searchClose');
const siteSearch=document.getElementById('siteSearch');
searchTrigger?.addEventListener('click',()=>{
  searchPanel.classList.add('open');
  searchPanel.setAttribute('aria-hidden','false');
  setTimeout(()=>siteSearch.focus(),80)
});
searchClose?.addEventListener('click',()=>{
  searchPanel.classList.remove('open');
  searchPanel.setAttribute('aria-hidden','true')
});
window.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    searchPanel.classList.remove('open');
    searchPanel.setAttribute('aria-hidden','true');
  }
});
document.getElementById('searchForm')?.addEventListener('submit',e=>{
  e.preventDefault();
  const value=siteSearch.value.trim();
  document.getElementById('searchResult').textContent=value
    ? `Search interface ready for “${value}”. Connect this field to the final CMS/search index in development.`
    : 'Enter a service, document, meeting, news topic or event.';
});

const heroInput=document.getElementById('heroSearch');
document.getElementById('heroSearchBtn')?.addEventListener('click',()=>{
  const value=heroInput.value.trim();
  searchPanel.classList.add('open');
  searchPanel.setAttribute('aria-hidden','false');
  siteSearch.value=value;
  setTimeout(()=>siteSearch.focus(),80);
});

const revealItems=document.querySelectorAll('.quick-card,.service-card,.portfolio-card,.news-card,.event-list article,.number-block');
revealItems.forEach(el=>el.classList.add('reveal'));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting)e.target.classList.add('visible')
}),{threshold:.12});
revealItems.forEach(el=>observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const target=document.querySelector(a.getAttribute('href'));
  if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'})}
}));
