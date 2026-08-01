const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

document.querySelectorAll('[id="year"]').forEach((year) => {
  year.textContent = new Date().getFullYear();
});

document.querySelectorAll('.image-frame img').forEach((image) => {
  image.addEventListener('error', () => { image.style.display = 'none'; });
});

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.querySelector('.sr-only').textContent = isOpen ? 'Open menu' : 'Close menu';
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('.sr-only').textContent = 'Open menu';
    navigation.classList.remove('is-open');
  }));
}
