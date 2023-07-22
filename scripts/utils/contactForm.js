const firstnameInput = document.getElementById('firstname');
async function getPhotographerName() {
  try {
    const str = new URL(window.location.href);
    const url = new URL(str);
    const photographerId = parseInt(url.searchParams.get('id'), 10);

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
    // Retourner le nom du photographe
    return res;
  } catch (error) {
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
// eslint-disable-next-line
async function displayModal() {
  const photographerName = await getPhotographerName();
  const modal = document.getElementById('contact_modal');
  const photographerNameElement = modal.querySelector('#photographer_name');
  photographerNameElement.textContent = photographerName;
  modal.style.display = 'block';
  firstnameInput.focus();
  displayModalOverlay();
}
// eslint-disable-next-line
function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
  hideModalOverlay();
}
