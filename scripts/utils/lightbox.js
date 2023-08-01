/* eslint-disable */

// Fonction pour afficher la lightbox
function openLightbox(mediaUrl) {
  document.body.classList.add('lightbox-open'); 
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightboxContent');

  // Effacer le contenu précédent de la lightbox
  lightboxContent.innerHTML = '';

  if (mediaUrl.endsWith('.mp4')) {
    // Si c'est une vidéo, créer une balise <video>
    const video = document.createElement('video');
    video.controls = true; // Afficher les contrôles vidéo (play, pause, etc.)
    video.src = mediaUrl;
    lightboxContent.appendChild(video);
  } else {
    // Sinon, c'est une image, créer une balise <img>
    const img = document.createElement('img');
    img.src = mediaUrl;
    img.alt = 'Média de la lightbox';
    lightboxContent.appendChild(img);
  }

  // Afficher la lightbox
  lightbox.style.display = 'block';
}

// Gestionnaire d'événement pour le clic sur une image ou une vidéo
portfolioSection.addEventListener('click', (event) => {
  const clickedElement = event.target;
  const mediaUrl = clickedElement.getAttribute('src') || clickedElement.getAttribute('data-src');
  if (mediaUrl) {
    openLightbox(mediaUrl);
  }
});

// Gestionnaire d'événement pour le clic sur le bouton de fermeture de la lightbox
const closeButton = document.getElementById('closeButton');
closeButton.addEventListener('click', () => {
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none';
});

const lightbox = document.getElementById('lightbox');


  // Gestionnaire d'événement pour la touche "Échap"
  document.forEach((element) => {
    element.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        lightbox.style.display = 'none';
      }
    })
  })
