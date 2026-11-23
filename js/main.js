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
