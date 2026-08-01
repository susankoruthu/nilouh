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

const categoryTooltip = document.createElement('div');
categoryTooltip.className = 'category-tooltip';
categoryTooltip.setAttribute('role', 'tooltip');
document.body.append(categoryTooltip);

const showCategoryTooltip = (card) => {
  categoryTooltip.textContent = card.dataset.tooltip;
  categoryTooltip.classList.add('is-visible');
  const bounds = card.getBoundingClientRect();
  categoryTooltip.style.left = `${bounds.left + (bounds.width / 2)}px`;
  categoryTooltip.style.top = `${bounds.bottom + 8}px`;
};

document.querySelectorAll('.category-card[data-tooltip]').forEach((card) => {
  card.addEventListener('mouseenter', () => showCategoryTooltip(card));
  card.addEventListener('focus', () => showCategoryTooltip(card));
  card.addEventListener('mouseleave', () => categoryTooltip.classList.remove('is-visible'));
  card.addEventListener('blur', () => categoryTooltip.classList.remove('is-visible'));
});

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const slides = [...carousel.querySelectorAll('.carousel-slide')];
  const thumbnails = [...carousel.querySelectorAll('.carousel-thumbnails button')];
  const previous = carousel.querySelector('.carousel-control--previous');
  const next = carousel.querySelector('.carousel-control--next');
  let activeIndex = 0;

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => { slide.hidden = slideIndex !== activeIndex; });
    thumbnails.forEach((thumbnail, thumbnailIndex) => {
      thumbnail.classList.toggle('is-active', thumbnailIndex === activeIndex);
      thumbnail.setAttribute('aria-current', thumbnailIndex === activeIndex ? 'true' : 'false');
    });
  };

  previous.addEventListener('click', () => showSlide(activeIndex - 1));
  next.addEventListener('click', () => showSlide(activeIndex + 1));
  thumbnails.forEach((thumbnail, index) => thumbnail.addEventListener('click', () => showSlide(index)));
  showSlide(0);
});
