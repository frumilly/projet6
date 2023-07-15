/* eslint-disable */
function getQueryParam() {
  var str = new URL(window.location.href);
  var url = new URL(str);
  var name = url.searchParams.get("id");
  return name;
}
function photographerTemplate2(data) {
  const { name, portrait } = data;
  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    const h2 = document.createElement('h2');
    h2.textContent = name;
    article.appendChild(img);
    article.appendChild(h2);
    return article;
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
}

// Fonction d'initialisation qui récupère les données des photographes et les affiche
async function init2() {
  // Récupère les données des photographes
  const photographers = await getMedia();
  // Affiche les données des photographes dans le DOM
  displayData2(photographers);
}

init2();
