// Fonction qui génère un DOM pour une carte utilisateur de photographe
// à partir des données fournies
function photographerTemplate(data) {
  // eslint-disable-next-line
  const { name, portrait, city, country, tagline, price,id } = data;

  const picture = `assets/photographers/${portrait}`;
  function getUserCardDOM() {
    const article = document.createElement('article');
    const infoDiv = document.createElement('div');
    const a = document.createElement('a'); // Ajout de l'élément <a>
    a.setAttribute('href', `photographer.html?id=${id}`);
    a.setAttribute('aria-label', `Photo de ${name}`);
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', `Photo de ${name}`);
    a.appendChild(img);
    const h2 = document.createElement('h2');
    h2.textContent = name;
    const pLocation = document.createElement('p');
    pLocation.textContent = `${city}, ${country}`;
    pLocation.id = 'plocation';
    const pTagline = document.createElement('p');
    pTagline.textContent = ` ${tagline}`;
    pTagline.id = 'ptag';
    const pPrice = document.createElement('p');
    pPrice.textContent = ` ${price}€/jour`;
    pPrice.id = 'p-price';
    infoDiv.class = 'info';
    infoDiv.setAttribute('tabindex', '0');
    infoDiv.appendChild(pLocation);
    infoDiv.appendChild(pTagline);
    infoDiv.appendChild(pPrice);
    article.appendChild(a);
    article.appendChild(h2);
    article.appendChild(infoDiv);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
// Fonction qui récupère les données des photographes depuis un fichier JSON
async function getPhotographers() {
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
async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');
  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}
// Fonction d'initialisation qui récupère les données des photographes et les affiche
async function init() {
  // Récupère les données des photographes
  const response = await getPhotographers();
  const photographers3 = response.photographers;
  // Obtenir le tableau des photographes depuis la propriété "photographers" de la réponse
  displayData(photographers3.photographers);
}

init();
