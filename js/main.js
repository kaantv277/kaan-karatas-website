// Küçük mobil menü kontrolü. Site, JavaScript kapalıyken de temel içeriğini gösterir.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.textContent = isOpen ? 'Close' : 'Menu';
  });
}

document.querySelectorAll('.year').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

// Contact form: sends the message to my inbox through FormSubmit (no account, no database on this site).
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const status = document.getElementById('form-status');
  const button = contactForm.querySelector('button[type="submit"]');
  const fallback = 'If that does not work, please write to <a href="mailto:kaanburak2009@gmail.com">kaanburak2009@gmail.com</a>.';
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    if (data.get('_honey')) return;
    button.disabled = true; button.textContent = 'Sending…';
    try {
      const res = await fetch('https://formsubmit.co/ajax/6803db90101989a61a36aa06d7b542a9', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'), email: data.get('email'), message: data.get('message'),
          _subject: 'Website message: ' + data.get('subject'), _replyto: data.get('email'),
          _template: 'table', _captcha: 'false'
        })
      });
      const out = await res.json().catch(() => ({}));
      if (res.ok && String(out.success) === 'true') {
        contactForm.reset();
        status.innerHTML = '<strong>Thank you. Your message has been sent.</strong> I will reply to the email address you gave.';
        button.textContent = 'Sent ✓';
        return;
      }
      throw new Error(out.message || 'Not sent');
    } catch (err) {
      status.innerHTML = 'Sorry, the message could not be sent right now. ' + fallback;
      button.disabled = false; button.textContent = 'Try again →';
    }
  });
}

// Lightbox: click a photo in the home collage to open it large.
const clips = document.querySelectorAll('.clip img');
if (clips.length) {
  const box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.innerHTML = '<button type="button" aria-label="Close">Close ✕</button><img alt=""><p></p>';
  document.body.appendChild(box);
  const big = box.querySelector('img');
  const cap = box.querySelector('p');
  const close = () => box.classList.remove('open');
  clips.forEach((img) => {
    img.setAttribute('tabindex', '0');
    const open = () => {
      big.src = img.currentSrc || img.src;
      big.alt = img.alt;
      const fc = img.closest('figure').querySelector('figcaption');
      cap.textContent = fc ? fc.textContent : img.alt;
      box.classList.add('open');
    };
    img.addEventListener('click', open);
    img.addEventListener('keydown', (e) => { if (e.key === 'Enter') open(); });
  });
  box.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

// "New on the blog" notice. Update LATEST_POST when a new post is published.
const LATEST_POST = { slug: 'persistence', title: 'Persist until you succeed', more: 'A new chapter from my book in progress' };
(function () {
  const css = document.querySelector('link[href*="css/style.css"]');
  if (!css) return;
  const root = css.getAttribute('href').split('css/style.css')[0];
  const url = root + 'blog/' + LATEST_POST.slug + '/';
  if (location.pathname.replace(/\/$/, '').endsWith('/blog/' + LATEST_POST.slug)) return;
  const key = 'kk-seen-' + LATEST_POST.slug;
  try { if (localStorage.getItem(key)) return; } catch (e) {}
  const t = document.createElement('aside');
  t.className = 'post-toast';
  t.setAttribute('role', 'status');
  t.innerHTML = '<p class="t-label">New on the blog</p><a class="t-link"></a><p class="t-more"></p><button type="button" aria-label="Dismiss">✕</button>';
  t.querySelector('.t-link').href = url;
  t.querySelector('.t-link').textContent = LATEST_POST.title + ' →';
  t.querySelector('.t-more').textContent = LATEST_POST.more;
  const remember = () => { try { localStorage.setItem(key, '1'); } catch (e) {} };
  t.querySelector('button').addEventListener('click', () => { t.classList.remove('show'); remember(); });
  t.querySelector('.t-link').addEventListener('click', remember);
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('show'), 1200);
})();
