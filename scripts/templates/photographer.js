// eslint-disable-next-line
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
    return (article);
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
    return { photographers: data };
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
    // En cas d'erreur, retourner un tableau vide ou gérer l'erreur selon votre besoin
    return { photographers: [] };
  }
}
// Fonction qui affiche les données des photographes dans le DOM (Document Object Model)
async function displayData2(photographers) {
  const photographersSection = document.querySelector('.media_section');
  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate2(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}
// Fonction d'initialisation qui récupère les données des photographes et les affiche
async function init2() {
  // Récupère les données des photographes
  const response = await getMedia();
  const photographers3 = response.photographers;
  // Obtenir le tableau des photographes depuis la propriété "photographers" de la réponse
  displayData2(photographers3.media);
}

init2();
