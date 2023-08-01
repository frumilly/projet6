/* eslint-disable */
function getQueryParam() {
  const str = new URL(window.location.href);
  const url = new URL(str);
  const name = url.searchParams.get('id');
  return name;
}

// la lightbox
// Index du média actuellement affiché dans la lightbox
let currentMediaIndex = 0;

// Tableau des médias pour la lightbox
let lightboxMedia = [];

// Fonction pour changer de média dans la lightbox
// eslint-disable-next-line
async function changeMedia(offset) {
  // Mettre à jour l'index du média actuel en tenant compte des limites
  currentMediaIndex += offset;
  if (currentMediaIndex >= lightboxMedia.length) {
    currentMediaIndex = 0;
  } else if (currentMediaIndex < 0) {
    currentMediaIndex = lightboxMedia.length - 1;
  }

  // Afficher le média suivant ou précédent dans la lightbox
  const lightboxContent = document.querySelector('.lightbox-content');
  const media = lightboxMedia[currentMediaIndex];
  // eslint-disable-next-line
  const response = await fetch('../../data/photographers.json');
  const data = await response.json();
  // eslint-disable-next-line
  const photographerM = data.photographers.find((photographer) => photographer.id === media.photographerId);
  // Vérifier si le média est une vidéo
  if (media && media.video) {
    lightboxContent.innerHTML = `<video autoplay ><source src="assets/images/${photographerM.name}/${media.video}" type="video/mp4"></video>`;
  } else {
    lightboxContent.innerHTML = `<img src="assets/images/${photographerM.name}/${media.image}" alt="${media.title}">`;
  }
  lightboxContent.style.display = 'flex';

  // Trouver l'index du média actuel dans le tableau
  currentMediaIndex = lightboxMedia.findIndex((item) => item.id === media.id);
}
// Fonction pour fermer la lightbox
// eslint-disable-next-line
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none';
}
// les donnée concernant le photographe
function photographerTemplatePh(data) {
  // eslint-disable-next-line
  const { name, portrait, city, tagline } = data;
  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const section = document.createElement('section');
    section.setAttribute('id', 'profil');

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('photographer_content');

    const h1 = document.createElement('h1');
    h1.textContent = name;
    h1.tabIndex = 0;

    const localP = document.createElement('p');
    localP.classList.add('content_local');
    localP.textContent = city;
    localP.tabIndex = 0;
    const tagP = document.createElement('p');
    tagP.classList.add('content_tag');
    tagP.textContent = tagline;
    tagP.tabIndex = 0;
    contentDiv.appendChild(h1);
    contentDiv.appendChild(localP);
    contentDiv.appendChild(tagP);

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('button_contact');

    const button = document.createElement('button');
    button.classList.add('contact_button');
    button.textContent = 'Contactez-moi';
    button.setAttribute('aria-label', 'Contact me');
    button.setAttribute('onclick', 'displayModal()');
    button.tabIndex = 0;
    buttonDiv.appendChild(button);

    const coverDiv = document.createElement('div');
    coverDiv.classList.add('cover');

    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.tabIndex = 0;
    coverDiv.appendChild(img);

    section.appendChild(contentDiv);
    section.appendChild(buttonDiv);
    section.appendChild(coverDiv);

    return section;
  }

  return { name, picture, getUserCardDOM };
}

// Fonction qui récupère les données des photographes depuis un fichier JSON
async function getMedia() {
  try {
    //  fetch pour récupérer le contenu du fichier photographers.json
    const response = await fetch('../../data/photographers.json');

    // Vérifier si la requête a réussi
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des photographes');
    }

    // Analyser la réponse JSON
    const data = await response.json();
    return data.photographers;
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
    return [];
  }
}

// Fonction qui récupère les médias correspondants à un photographe
async function getPhotographerMedia(photographerId) {
  try {
    //  fetch pour récupérer le contenu du fichier media.json
    const response = await fetch('../../data/photographers.json');

    // Vérifier si la requête a réussi
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des médias');
    }

    // Analyser la réponse JSON
    const data = await response.json();
    // Filtrer les médias correspondants au photographe ID
    const filteredMedia = data.media.filter((media) => media.photographerId === photographerId);
    // Retourner le tableau de médias filtrés
    return filteredMedia;
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
    // En cas d'erreur, retourner un tableau vide ou gérer l'erreur selon votre besoin
    return [];
  }
}
// Fonction qui affiche les données des photographes dans le DOM (Document Object Model)
async function displayDataPh(photographers) {
  const photographersSection = document.querySelector('.media_section');
  const photographerId = parseInt(getQueryParam(), 10);
  // eslint-disable-next-line
  const photographer = photographers.find((photographer) => photographer.id === photographerId);

  if (!photographer) {
    window.location.href = 'index.html';
    return;
  }
  const photographerModel = photographerTemplatePh(photographer);
  const userCardDOM = photographerModel.getUserCardDOM();
  photographersSection.appendChild(userCardDOM);

  const mediaCpt = await getPhotographerMedia(photographerId);
  const totalLikes = mediaCpt.reduce((total, media) => total + media.likes, 0);

  const asideSection = document.createElement('aside');
  asideSection.setAttribute('tabindex', '0');
  asideSection.setAttribute('data-hidden-on-modal', '');
  asideSection.classList.add('photographer_aside');
  asideSection.setAttribute('aria-label', `${totalLikes} j'aimes, tarifs: ${photographer.price}€ par jour`);

  const likeDiv = document.createElement('div');
  likeDiv.classList.add('photographer_like');
  likeDiv.setAttribute('aria-hidden', 'true');
  likeDiv.textContent = ` ${totalLikes} ♥  `;

  const priceDiv = document.createElement('div');
  priceDiv.classList.add('photographer_price');
  priceDiv.setAttribute('aria-hidden', 'true');
  priceDiv.textContent = ` ${photographer.price}€ /jour`;

  asideSection.appendChild(likeDiv);
  asideSection.appendChild(priceDiv);

  photographersSection.appendChild(asideSection);

  const filterSection = document.createElement('section');
  filterSection.id = 'filter';

  const filterLabel = document.createElement('h3');
  filterLabel.tabIndex = 0;
  filterLabel.textContent = 'Trier par';
  filterSection.appendChild(filterLabel);

  const sortSelector = document.createElement('select');
  sortSelector.id = 'sort-selector';
  sortSelector.setAttribute('aria-label', 'Sélectionnez le critère de tri');

  const options = [
    { value: 'popularity', label: 'Popularité' },
    { value: 'date', label: 'Date' },
    { value: 'title', label: 'Titre' },
  ];

  options.forEach((option) => {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option.label;
    sortSelector.appendChild(optionElement);
  });

  sortSelector.addEventListener('change', async () => {
    const selectedOption = sortSelector.value;

    const media = await getPhotographerMedia(photographerId);

    let sortedMedia;
    if (selectedOption === 'popularity') {
      sortedMedia = media.sort((a, b) => b.likes - a.likes);
    } else if (selectedOption === 'date') {
      sortedMedia = media.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (selectedOption === 'title') {
      sortedMedia = media.sort((a, b) => a.title.localeCompare(b.title));
    }
    // eslint-disable-next-line
    portfolioSection.innerHTML = '';
    // eslint-disable-next-line
    sortedMedia.forEach((media) => {
      // eslint-disable-next-line
      const { title, image, likes, price, video, vignette } = media;

      const mediaCard = document.createElement('div');
      mediaCard.classList.add('media_card');

      const link = document.createElement('a');
      // eslint-disable-next-line
      link.href = 'javascript:void(0)';

      link.addEventListener('click', () => {
        // Appelle la fonction pour afficher la lightbox
        // eslint-disable-next-line
        displayLightbox(media);
      });
      if (video) {
        const img = document.createElement('img');
        img.src = `assets/images/${photographer.name}/${vignette}`;
        img.alt = title;
        img.setAttribute('aria-label', `${title}, closeup view`);
        link.appendChild(img);
      } else {
        const img = document.createElement('img');
        img.src = `assets/images/${photographer.name}/${image}`;
        img.alt = title;
        img.setAttribute('aria-label', `${title}, closeup view`);
        link.appendChild(img);
      }

      const mediaContentDiv = document.createElement('div');
      mediaContentDiv.classList.add('media_content');

      const titleH3 = document.createElement('h3');
      titleH3.textContent = title;

      const likeCoeurDiv = document.createElement('div');
      likeCoeurDiv.classList.add('like_coeur');

      const likesP = document.createElement('p');
      likesP.textContent = `${likes}`;
      likesP.classList.add('media_likes');

      const likeButton = document.createElement('button');
      likeButton.classList.add('favorite_button');
      likeButton.setAttribute('aria-label', `${likes} likes`);
      likeButton.innerHTML = `
    <span class="icon-empty-heart" aria-hidden="true">🤍</span>
  `;
      likeButton.setAttribute('aria-label', `${likes} likes`);
      likeButton.classList.add('favorite_input');
  
      let isLiked = false; // Variable pour suivre l'état du bouton (coeur vide ou plein)
      let nbrLikes = 0;
      likeButton.addEventListener('click', () => {
        // Inversez l'état du bouton à chaque clic
        isLiked = !isLiked;
        if (isLiked) {
          likeButton.innerHTML = '❤️';
          nbrLikes = likes + 1;
          likesP.textContent = likes + 1;
          // Incrémentez le nombre de likes si le cœur est maintenant rempli
          likeButton.setAttribute('aria-label', `${nbrLikes} likes`);
          nbrTotLikes += 1;
          likeDiv.textContent = ` ${nbrTotLikes} ♥  `;
          asideSection.setAttribute('aria-label', `${nbrTotLikes} j'aimes, tarifs: ${photographer.price}€ par jour`);
        } else {
          likeButton.innerHTML = '🤍';
          likesP.textContent = likes;
          // Décrémentez le nombre de likes si le cœur est maintenant vide
          likeButton.setAttribute('aria-label', `${likes} likes`);
          // Mettre à jour le nombre de likes et le nombre total de likes en fonction de l'état
          nbrTotLikes -= 1;
          likeDiv.textContent = ` ${nbrTotLikes} ♥  `;
          asideSection.setAttribute('aria-label', `${nbrTotLikes} j'aimes, tarifs: ${photographer.price}€ par jour`);
        }
      });
  

      const priceP = document.createElement('p');
      priceP.textContent = `Price: ${price}`;
      priceP.classList.add('media_price');

      likeCoeurDiv.appendChild(likesP);
      likeCoeurDiv.appendChild(likeButton);

      mediaContentDiv.appendChild(titleH3);
      mediaContentDiv.appendChild(likeCoeurDiv);

      mediaCard.appendChild(link);
      mediaCard.appendChild(mediaContentDiv);
      // eslint-disable-next-line
      portfolioSection.appendChild(mediaCard);
    });
  });

  filterSection.appendChild(sortSelector);
  photographersSection.appendChild(filterSection);

  const portfolioSection = document.createElement('section');
  portfolioSection.id = 'portfolio';
  let nbrTotLikes = totalLikes;
  const media = await getPhotographerMedia(photographerId);
  const sortedMedia = media.sort((a, b) => b.likes - a.likes);
  // eslint-disable-next-line
  sortedMedia.forEach((media) => { // eslint-disable-next-line
    const { title, image, video, likes, price, vignette } = media;

    const mediaCard = document.createElement('div');
    mediaCard.classList.add('media_card');

    const link = document.createElement('a');
    // eslint-disable-next-line
    link.href = 'javascript:void(0)';
    link.addEventListener('click', () => {
      // Appelle la fonction pour afficher la lightbox
      // eslint-disable-next-line
      displayLightbox(media);
    });
    if (video) {
      const img = document.createElement('img');
      img.src = `assets/images/${photographer.name}/${vignette}`;
      img.alt = title;
      img.setAttribute('aria-label', `${title}, closeup view`);
      link.appendChild(img);
    } else {
      const img = document.createElement('img');
      img.src = `assets/images/${photographer.name}/${image}`;
      img.alt = title;
      img.setAttribute('aria-label', `${title}, closeup view`);
      link.appendChild(img);
    }
    const mediaContentDiv = document.createElement('div');
    mediaContentDiv.classList.add('media_content');

    const titleH3 = document.createElement('h3');
    titleH3.textContent = title;

    const likeCoeurDiv = document.createElement('div');
    likeCoeurDiv.classList.add('like_coeur');

    const likesP = document.createElement('p');
    likesP.textContent = `${likes}`;
    likesP.classList.add('media_likes');

    const likeButton = document.createElement('button');
    likeButton.classList.add('favorite_button');
    likeButton.setAttribute('aria-label', `${likes} likes`);
    likeButton.innerHTML = `
  <span class="icon-empty-heart" aria-hidden="true">🤍</span>
`;
    likeButton.setAttribute('aria-label', `${likes} likes`);
    likeButton.classList.add('favorite_input');

    let isLiked = false; // Variable pour suivre l'état du bouton (coeur vide ou plein)
    let nbrLikes = 0;
    likeButton.addEventListener('click', () => {
      // Inversez l'état du bouton à chaque clic
      isLiked = !isLiked;
      if (isLiked) {
        likeButton.innerHTML = '❤️';
        nbrLikes = likes + 1;
        likesP.textContent = likes + 1;
        // Incrémentez le nombre de likes si le cœur est maintenant rempli
        likeButton.setAttribute('aria-label', `${nbrLikes} likes`);
        nbrTotLikes += 1;
        likeDiv.textContent = ` ${nbrTotLikes} ♥  `;
        asideSection.setAttribute('aria-label', `${nbrTotLikes} j'aimes, tarifs: ${photographer.price}€ par jour`);
      } else {
        likeButton.innerHTML = '🤍';
        likesP.textContent = likes;
        // Décrémentez le nombre de likes si le cœur est maintenant vide
        likeButton.setAttribute('aria-label', `${likes} likes`);
        // Mettre à jour le nombre de likes et le nombre total de likes en fonction de l'état
        nbrTotLikes -= 1;
        likeDiv.textContent = ` ${nbrTotLikes} ♥  `;
        asideSection.setAttribute('aria-label', `${nbrTotLikes} j'aimes, tarifs: ${photographer.price}€ par jour`);
      }
    });

    const priceP = document.createElement('p');
    priceP.textContent = `Price: ${price}`;
    priceP.classList.add('media_price');

    likeCoeurDiv.appendChild(likesP);
    likeCoeurDiv.appendChild(likeButton);

    mediaContentDiv.appendChild(titleH3);
    mediaContentDiv.appendChild(likeCoeurDiv);

    mediaCard.appendChild(link);
    mediaCard.appendChild(mediaContentDiv);

    portfolioSection.appendChild(mediaCard);
  });

  photographersSection.appendChild(portfolioSection);
}
// fonction initiale
async function initPhotographe() {
  const photographers = await getMedia();
  displayDataPh(photographers);
}

async function displayLightbox(media) {
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = lightbox.querySelector('.lightbox-content');

  try {
    const response = await fetch('../../data/photographers.json');
    const data = await response.json();
    // eslint-disable-next-line
    const photographerM = data.photographers.find((photographer) => photographer.id === media.photographerId);
    lightboxMedia = await getPhotographerMedia(media.photographerId);
    // Récupérer la valeur du select
    const sortSelector = document.getElementById('sort-selector');
    const selectedOption = sortSelector.value;
    // Tri des médias en fonction de l'option sélectionnée
    if (selectedOption === 'popularity') {
      lightboxMedia.sort((a, b) => b.likes - a.likes);
    } else if (selectedOption === 'date') {
      lightboxMedia.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (selectedOption === 'title') {
      lightboxMedia.sort((a, b) => a.title.localeCompare(b.title));
    }
    // Vérifier si le média est une vidéo
    if (media.video) {
      lightboxContent.innerHTML = `<video autoplay ><source src="assets/images/${photographerM.name}/${media.video}" type="video/mp4"></video>`;
    } else {
      lightboxContent.innerHTML = `<img src="assets/images/${photographerM.name}/${media.image}" alt="${media.title}">`;
    }

    lightbox.style.display = 'flex';
    currentMediaIndex = lightboxMedia.findIndex((item) => item.id === media.id);
  } catch (error) {
    // eslint-disable-next-line
    console.error('Erreur lors de la récupération des données :', error);
  }
}
document.getElementById('contact_modal').addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});
    
    // Événement de pression de touche au niveau du document
    document.addEventListener('keydown', function(event) {
      // Vérifier si la touche pressée est "Escape" (Échap)
      if (event.key === 'Escape' || event.key === 'Esc') {
        closeLightbox(); // Fermer la lightbox
      }
    });
initPhotographe();
