/* eslint-disable */
function getQueryParam() {
  var str = new URL(window.location.href);
  var url = new URL(str);
  var name = url.searchParams.get("id");
  return name;
}
function photographerTemplate2(data) {
  const { name, portrait, city, tag } = data;
  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const section = document.createElement('section');
    section.setAttribute('id', 'profil');

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('photographer_content');

    const h1 = document.createElement('h1');
    h1.textContent = name;

    const localP = document.createElement('p');
    localP.classList.add('content_local');
    localP.textContent = city;

    const tagP = document.createElement('p');
    tagP.classList.add('content_tag');
    tagP.textContent = tag;

    contentDiv.appendChild(h1);
    contentDiv.appendChild(localP);
    contentDiv.appendChild(tagP);

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('button_contact');

    const button = document.createElement('button');
    button.classList.add('contact_button');
    button.textContent = 'Contactez-moi';
    button.setAttribute('onclick', 'displayModal()');
    button.setAttribute('tabindex', '0');

    buttonDiv.appendChild(button);

    const coverDiv = document.createElement('div');
    coverDiv.classList.add('cover');

    const img = document.createElement('img');
    img.setAttribute('src', picture);

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
  // Récupérer les données du photographe avec l'ID 
  const photographer = photographers.find((photographer) => photographer.id === photographerId);

  if (photographer) {
    const photographerModel = photographerTemplate2(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);

    // Récupérer les médias du photographe
    const media = await getPhotographerMedia(photographerId);
    // Afficher les données des médias pour le photographe
    media.forEach((media) => {
      const { title, image, likes, date, price } = media;
      const mediaCard = document.createElement('div');
      mediaCard.classList.add('media_card');
      mediaCard.innerHTML = `
          <img src="assets/images/${photographer.name}/${image}" alt="${title}" />
          <h3>${title}</h3>
          <p>Likes: ${likes}</p>
          <p>Date: ${date}</p>
          <p>Price: ${price}</p>
        `;
      photographersSection.appendChild(mediaCard);
    });
  }
  else {
    // Redirection vers la page d'accueil 
    window.location.href = 'index.html'; 
  }
}

// Fonction d'initialisation qui récupère les données des photographes et les affiche
async function init2() {
  // Récupère les données des photographes
  const photographers = await getMedia();
  // Affiche les données des photographes dans le DOM
  displayData2(photographers);
}

init2();
