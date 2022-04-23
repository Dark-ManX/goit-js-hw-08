import SimpleLightbox from 'simplelightbox';

// Add imports above this line
import { galleryItems } from './gallery-items.js';

// Change code below this line

const galleryRef = document.querySelector('.gallery');

// ------------Создать галлерею------------

function createGalleryCard(galleryRef) {
    return galleryItems.map(galleryItem => {
       galleryRef.insertAdjacentHTML('beforeend', `<a class="gallery__item" href="${galleryItem.original}">
  <img class="gallery__image" src="${galleryItem.preview}" alt="${galleryItem.description}"/> 
</a>`);
    });
}
console.log(createGalleryCard(galleryRef));

// ---------------Создание simplelightbox---------------

  let gallery = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  captionsData: 'alt',});
    gallery.on('show.simplelightbox');

console.log(galleryItems);

export default {
  galleryRef,
  gallery,
}

