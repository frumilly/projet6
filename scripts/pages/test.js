/* eslint-disable */
function getQueryParam() {
  const str = new URL(window.location.href);
  const url = new URL(str);
  const name = url.searchParams.get('id');
  return name;
}
function photographerTemplate2(data) {
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
    // Effectuer la requête fetch pour récupérer le contenu du fichier photographers.json
    const response = await fetch('../../data/photographers.json');

    // Vérifier si la requête a réussi
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des photographes');
    }

    // Analyser la réponse JSON
    const data = await response.json();
    // Retourner le tableau de photographes récupéré depuis le fichier JSON
    return data.photographers;
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
    // En cas d'erreur, retourner un tableau vide ou gérer l'erreur selon votre besoin
    return [];
  }
}

// Fonction qui récupère les médias correspondants à un photographe
async function getPhotographerMedia(photographerId) {
  try {
    // Effectuer la requête fetch pour récupérer le contenu du fichier media.json
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
async function displayData2(photographers) {
  const photographersSection = document.querySelector('.media_section');
  const photographerId = parseInt(getQueryParam());
  const photographer = photographers.find((photographer) => photographer.id === photographerId);

  if (photographer) {
    const photographerModel = photographerTemplate2(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);

    const media2 = await getPhotographerMedia(photographerId);
    const totalLikes = media2.reduce((total, media) => total + media.likes, 0);

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
      console.log(`Option de tri sélectionnée : ${selectedOption}`);

      const media = await getPhotographerMedia(photographerId);

      let sortedMedia;
      if (selectedOption === 'popularity') {
        sortedMedia = media.sort((a, b) => b.likes - a.likes);
      } else if (selectedOption === 'date') {
        sortedMedia = media.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (selectedOption === 'title') {
        sortedMedia = media.sort((a, b) => a.title.localeCompare(b.title));
      }

      portfolioSection.innerHTML = '';

      sortedMedia.forEach((media) => {
        const { title, image, likes, price } = media;

        const mediaCard = document.createElement('div');
        mediaCard.classList.add('media_card');

        const link = document.createElement('a');
        link.href = '';

        const img = document.createElement('img');
        img.src = `assets/images/${photographer.name}/${image}`;
        img.alt = title;

        link.appendChild(img);

        const mediaContentDiv = document.createElement('div');
        mediaContentDiv.classList.add('media_content');

        const titleH3 = document.createElement('h3');
        titleH3.textContent = title;

        const likeCoeurDiv = document.createElement('div');
        likeCoeurDiv.classList.add('like_coeur');

        const likesP = document.createElement('p');
        likesP.textContent = `Likes: ${likes}`;
        likesP.classList.add('media_likes');

        const likeInput = document.createElement('input');
        likeInput.id = 'like_id';
        likeInput.setAttribute('aria-label', `${likes} likes`);
        likeInput.classList.add('favorite_input');
        likeInput.type = 'checkbox';

        const priceP = document.createElement('p');
        priceP.textContent = `Price: ${price}`;
        priceP.classList.add('media_price');

        likeCoeurDiv.appendChild(likesP);
        likeCoeurDiv.appendChild(likeInput);

        mediaContentDiv.appendChild(titleH3);
        mediaContentDiv.appendChild(likeCoeurDiv);

        mediaCard.appendChild(link);
        mediaCard.appendChild(mediaContentDiv);

        portfolioSection.appendChild(mediaCard);
      });
    });

    filterSection.appendChild(sortSelector);
    photographersSection.appendChild(filterSection);

    const portfolioSection = document.createElement('section');
    portfolioSection.id = 'portfolio';

    const media = await getPhotographerMedia(photographerId);

    media.forEach((media) => {
      const { title, image, likes, price } = media;

      const mediaCard = document.createElement('div');
      mediaCard.classList.add('media_card');

      const link = document.createElement('a');
      link.href = '';

      const img = document.createElement('img');
      img.src = `assets/images/${photographer.name}/${image}`;
      img.alt = title;

      link.appendChild(img);

      const mediaContentDiv = document.createElement('div');
      mediaContentDiv.classList.add('media_content');

      const titleH3 = document.createElement('h3');
      titleH3.textContent = title;

      const likeCoeurDiv = document.createElement('div');
      likeCoeurDiv.classList.add('like_coeur');

      const likesP = document.createElement('p');
      likesP.textContent = `Likes: ${likes}`;
      likesP.classList.add('media_likes');

      const likeInput = document.createElement('input');
      likeInput.id = 'like_id';
      likeInput.setAttribute('aria-label', `${likes} likes`);
      likeInput.classList.add('favorite_input');
      likeInput.type = 'checkbox';

      const priceP = document.createElement('p');
      priceP.textContent = `Price: ${price}`;
      priceP.classList.add('media_price');

      likeCoeurDiv.appendChild(likesP);
      likeCoeurDiv.appendChild(likeInput);

      mediaContentDiv.appendChild(titleH3);
      mediaContentDiv.appendChild(likeCoeurDiv);

      mediaCard.appendChild(link);
      mediaCard.appendChild(mediaContentDiv);

      portfolioSection.appendChild(mediaCard);
    });

    photographersSection.appendChild(portfolioSection);
  } else {
    window.location.href = 'index.html';
  }
}
async function init2() {
  const photographers = await getMedia();
  displayData2(photographers);
}

init2();