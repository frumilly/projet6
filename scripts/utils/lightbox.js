/* eslint-disable */
const lightbox = document.getElementById('lightbox');
const mediaContainer = document.getElementById('mediaContainer');
const closeButton = document.getElementById('closeButton');
const mediaData = [
  { type: 'image', src: 'chemin_vers_image1.jpg', title: 'Image 1' },
  { type: 'video', src: 'chemin_vers_video1.mp4', title: 'Vidéo 1' },
]; 
let currentIndex = 0;
function openLightbox(index) {
    currentIndex = index;
  const media = mediaData[index];
  if (media.type === 'image') {
    const imgElement = document.createElement('img');
    imgElement.src = media.src;
    mediaContainer.innerHTML = '';
    mediaContainer.appendChild(imgElement);
  } else if (media.type === 'video') {
    const videoElement = document.createElement('video');
    videoElement.src = media.src;
    videoElement.setAttribute('controls', 'controls');
    mediaContainer.innerHTML = '';
    mediaContainer.appendChild(videoElement);
  }
  lightbox.style.display = 'block';
}

function closeLightbox() {
  lightbox.style.display = 'none';
  mediaContainer.innerHTML = '';
}

// Ajoutez des gestionnaires d'événements sur les images et vidéos pour ouvrir la lightbox
mediaData.forEach((media, index) => {
  const element = document.createElement(media.type === 'image' ? 'img' : 'video');
  element.src = media.src;
  element.alt = media.title;
  element.addEventListener('click', () => openLightbox(index));
  // Ajoutez cet élément dans votre page où vous souhaitez afficher les médias
  document.body.appendChild(element);
});

closeButton.addEventListener('click', closeLightbox);

// Ajoutez les gestionnaires d'événements pour naviguer entre les médias (suivant/précédent)
// Vous pouvez utiliser currentIndex pour suivre l'index du média actuellement affiché dans la lightbox
// Assurez-vous de mettre à jour currentIndex lorsque l'utilisateur clique sur le bouton suivant ou précédent.
