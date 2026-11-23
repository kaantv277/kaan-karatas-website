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

// Contact form: opens the visitor's own email app with the message filled in.
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const body = `${data.get('message')}\n\n— ${data.get('name')}`;
    window.location.href = 'mailto:kaanburak2009@gmail.com?subject=' + encodeURIComponent(data.get('subject')) + '&body=' + encodeURIComponent(body);
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
