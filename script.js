const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

document.querySelectorAll('[id="year"]').forEach((year) => {
  year.textContent = new Date().getFullYear();
});

document.querySelectorAll('.collection-page__intro .eyebrow, .coming-soon .eyebrow').forEach((label) => {
  const [collectionName, pageName] = label.textContent.split('/').map((part) => part.trim());
  if (!collectionName || !pageName) return;

  const breadcrumb = document.createElement('nav');
  breadcrumb.className = 'breadcrumbs';
  breadcrumb.setAttribute('aria-label', 'Breadcrumb');
  breadcrumb.innerHTML = `<a href="index.html">${collectionName}</a><span aria-hidden="true">/</span><span aria-current="page">${pageName}</span>`;
  label.replaceWith(breadcrumb);
});

document.querySelectorAll('.collection-page__intro h1').forEach((heading) => {
  heading.querySelectorAll('br').forEach((lineBreak) => lineBreak.replaceWith(' '));
});

const blueLotusHomepageImage = document.querySelector(
  '.product-card img[alt="Blue lotus hand-painted Kotta saree in a light-blue studio setting"]',
);
if (blueLotusHomepageImage) {
  blueLotusHomepageImage.src = 'images/blue-lotus-kotta-saree-home.jpeg';
  blueLotusHomepageImage.alt = 'Blue Lotus hand-painted Kotta saree on a mannequin';
}

const raahiDupattaCard = [...document.querySelectorAll('.collection-product')].find(
  (card) => card.querySelector('h2')?.textContent.trim() === 'Raahi Dupatta',
);
if (raahiDupattaCard) {
  const dupattaGrid = raahiDupattaCard.parentElement;
  const skyDaisyDupatta = document.createElement('article');
  skyDaisyDupatta.className = 'collection-product';
  skyDaisyDupatta.innerHTML = `<div class="collection-image image-frame"><img src="images/sky-daisy-organza-dupatta.jpeg" alt="Sky blue hand-painted organza dupatta with white daisy motifs" loading="lazy" /></div><h2>Sky Daisy Organza Dupatta</h2><p>Hand-painted organza · White daisy motif</p><a class="text-action" href="https://www.instagram.com/nilouh.story?igsh=MXhwOWQxM3IzNGx6aw==" target="_blank" rel="noopener">Enquire about this piece <span aria-hidden="true">↗</span></a>`;
  dupattaGrid.append(skyDaisyDupatta);
}

['Madhavi Dupatta', 'Noor Stole'].forEach((productName) => {
  [...document.querySelectorAll('.collection-product')]
    .find((card) => card.querySelector('h2')?.textContent.trim() === productName)
    ?.remove();
});

const neelSetCard = [...document.querySelectorAll('.collection-product')].find(
  (card) => card.querySelector('h2')?.textContent.trim() === 'Neel Set',
);

if (neelSetCard) {
  const images = [
    ['lilac-floral-churidar-set-1.jpg', 'Hand-painted white churidar top and lilac floral dupatta'],
    ['lilac-floral-churidar-set-2.jpg', 'Lilac floral hand-painted churidar set worn with the matching dupatta'],
    ['lilac-floral-churidar-set-3.jpg', 'Close view of the hand-painted flowers on the churidar top and dupatta'],
    ['lilac-floral-churidar-set-4.jpg', 'Close view of the lilac hand-painted dupatta and lace trim'],
    ['lilac-floral-churidar-set-5.jpg', 'Lilac floral churidar set styled with the matching dupatta'],
    ['lilac-floral-churidar-set-6.jpg', 'Detailed view of the hand-painted floral churidar set'],
    ['lilac-floral-churidar-set-7.jpg', 'Close view of the pink and lilac hand-painted floral design'],
    ['lilac-floral-churidar-set-8.jpg', 'Hand-painted churidar top with the sheer lilac floral dupatta'],
  ];
  const slides = images.map(([source, alt], index) => `<figure class="carousel-slide"${index ? ' hidden' : ''}><img src="images/${source}" alt="${alt}"${index ? ' loading="lazy"' : ''} /></figure>`).join('');
  const thumbnails = images.map(([source], index) => `<button class="${index ? '' : 'is-active'}" type="button" aria-label="Show photo ${index + 1}"${index ? '' : ' aria-current="true"'}><img src="images/${source}" alt=""${index ? ' loading="lazy"' : ''} /></button>`).join('');

  neelSetCard.className = 'collection-product collection-product--carousel';
  neelSetCard.innerHTML = `<div class="product-carousel" data-carousel aria-label="Lilac Floral Churidar Set photo gallery"><div class="carousel-stage">${slides}<button class="carousel-control carousel-control--previous" type="button" aria-label="Previous photo">←</button><button class="carousel-control carousel-control--next" type="button" aria-label="Next photo">→</button></div><div class="carousel-thumbnails" aria-label="Choose a product photo">${thumbnails}</div></div><h2>Lilac Floral Churidar Set</h2><p>Hand-painted churidar top &amp; dupatta · Sold out · Customisable to order</p><p class="product-note">This original has found its home. A similar hand-painted set can be recreated or customised especially for you.</p><a class="text-action" href="https://www.instagram.com/nilouh.story?igsh=MXhwOWQxM3IzNGx6aw==" target="_blank" rel="noopener">Enquire to customise <span aria-hidden="true">↗</span></a>`;
}

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
