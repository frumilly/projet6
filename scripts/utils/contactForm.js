async function getPhotographerName() {
  try {
    const str = new URL(window.location.href);
    const url = new URL(str);
    const photographerId = parseInt(url.searchParams.get('id'));

    const response = await fetch('../../data/photographers.json');

    // Vérifier si la requête a réussi
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des photographes');
    }

    // Analyser la réponse JSON
    const data = await response.json();
    // Trouver le photographe avec l'ID correspondant
    const foundPhotographer = data.photographers.find((p) => p.id === photographerId);
    const res = foundPhotographer.name;
     console.log(res);
    // Retourner le nom du photographe
    return res;
  } catch (error) {
    console.error(error);
    return '';
  }
}
function displayModalOverlay() {
  const modalOverlay = document.querySelector('.modal-overlay');
  modalOverlay.style.display = 'block';
}

function hideModalOverlay() {
  const modalOverlay = document.querySelector('.modal-overlay');
  modalOverlay.style.display = 'none';
}
async function displayModal() {
  const photographerName = await getPhotographerName();
  console.log(photographerName);
  const modal = document.getElementById('contact_modal');
  const photographerNameElement = modal.querySelector('#photographer_name');
  photographerNameElement.textContent = photographerName;
  modal.style.display = 'block';
  displayModalOverlay();
}

function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
  hideModalOverlay();
}
