// Shared script for the luxury pages. Each page defines `dict` and `marqueeItems` before loading this file.
function renderMarquee(lang){
  const el = document.getElementById('marqueeIn');
  if (!el) return;
  const html = marqueeItems[lang].map(t => `<span>${t}</span>`).join('');
  el.innerHTML = html + html;
}
function setLang(lang){
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.body.classList.toggle('ar', lang === 'ar');
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const d = dict[el.getAttribute('data-i18n')];
    if (d) el.innerHTML = d[lang];
  });
  document.title = dict.pageTitle[lang];
  renderMarquee(lang);
  document.getElementById('langToggle').textContent = lang === 'en' ? 'العربية' : 'English';
  try { localStorage.setItem('jiji_lang', lang); } catch(e){}
}
function toggleLang(){ setLang(document.documentElement.lang === 'ar' ? 'en' : 'ar'); }
let initialLang = 'en';
try { initialLang = localStorage.getItem('jiji_lang') || 'en'; } catch(e){}
setLang(initialLang);

const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
