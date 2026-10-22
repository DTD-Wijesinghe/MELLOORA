const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

document.addEventListener('mousemove', (event) => {
  const glow = $('.cursor-glow');
  if (glow) { glow.style.left = `${event.clientX}px`; glow.style.top = `${event.clientY}px`; }
});

$$('[data-scroll]').forEach((button) => button.addEventListener('click', () => {
  const target = document.querySelector(button.dataset.scroll);
  if (target) target.scrollIntoView({ behavior: 'smooth' });
}));

const moodStage = $('.mood-stage');
const moodTitle = $('.mood-title');
const moodDescription = $('.mood-description');
const moodOverline = $('.mood-overline');
const moodDetails = $('.mood-details');
const productSticker = $('.product-sticker');
const swatch = $('.swatch');
const moodCopy = {
  love: { title: 'Love <em>Bloom</em>', description: 'A rose-tinted pause for the people who make ordinary days feel softer.', overline: 'for affection, appreciation & little celebrations', details: [['inside', 'rose milk · 3 cookies · loving note'], ['best for', 'thank-yous · anniversaries · just because']], sticker: 'handmade<br /><strong>with feeling</strong>', color: '#e98ea6' },
  sunny: { title: 'Sunny <em>Smile</em>', description: 'A bright little boost for the people who bring good energy wherever they go.', overline: 'for friendship, encouragement & bright beginnings', details: [['inside', 'mango milk · 3 cookies · cheerful note'], ['best for', 'birthdays · exams · new adventures']], sticker: 'made for<br /><strong>good days</strong>', color: '#e0a928' },
};
$$('.mood-tab').forEach((tab) => tab.addEventListener('click', () => {
  const mood = moodCopy[tab.dataset.mood];
  $$('.mood-tab').forEach((item) => item.classList.toggle('active', item === tab));
  moodStage.dataset.theme = tab.dataset.mood;
  moodTitle.innerHTML = mood.title; moodDescription.textContent = mood.description; moodOverline.textContent = mood.overline; productSticker.innerHTML = mood.sticker; swatch.style.background = mood.color;
  moodDetails.innerHTML = mood.details.map(([label, value]) => `<div><span>${label}</span><b>${value}</b></div>`).join('');
}));

const videoModal = $('.video-modal');
$$('[data-open-video]').forEach((button) => button.addEventListener('click', () => { videoModal.classList.add('open'); videoModal.setAttribute('aria-hidden', 'false'); const video = $('video', videoModal); video.play().catch(() => {}); }));
$$('[data-close-modal]').forEach((button) => button.addEventListener('click', () => { videoModal.classList.remove('open'); videoModal.setAttribute('aria-hidden', 'true'); $('video', videoModal).pause(); }));
const lightbox = $('.lightbox');
$$('[data-lightbox]').forEach((tile) => tile.addEventListener('click', () => { $('img', lightbox).src = tile.dataset.lightbox; lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden', 'false'); }));
$$('[data-close-lightbox]').forEach((button) => button.addEventListener('click', () => { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden', 'true'); }));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { videoModal.classList.remove('open'); lightbox.classList.remove('open'); } });

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('in-view'); }), { threshold: .15 });
$$('.ingredient-card,.timeline-item,.stat-card,.gallery-tile,.price-card').forEach((item) => { item.classList.add('reveal-on-scroll'); observer.observe(item); });
