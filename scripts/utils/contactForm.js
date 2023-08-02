const firstnameInput = document.getElementById('firstname');
function hideOtherDivs() {
  const mediaDivs = document.querySelectorAll('.media_section, .lightbox');
  mediaDivs.forEach((div) => {
    div.setAttribute('aria-hidden', 'true');
  });
}

function showOtherDivs() {
  const mediaDivs = document.querySelectorAll('.media_section, .lightbox');
  mediaDivs.forEach((div) => {
    div.removeAttribute('aria-hidden');
  });
}
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
  hideOtherDivs();
  document.documentElement.classList.add('overflow-hidden');
  const photographerName = await getPhotographerName();
  const modal = document.getElementById('contact_modal');
  const photographerNameElement = modal.querySelector('#photographer_name');
  photographerNameElement.textContent = photographerName;
  modal.style.display = 'block';
  firstnameInput.focus();
  displayModalOverlay();
}
const formSauv = document.forms.contactForm;
function resetFormulaire() {
  formSauv.reset();
}
function clearErrorMessages() {
  const errorMessages = document.querySelectorAll('.small-error-message');
  // eslint-disable-next-line
  errorMessages.forEach(function (errorMessage) {errorMessage.textContent = ''; });
}
// eslint-disable-next-line
function closeModal() {
  showOtherDivs();
  document.documentElement.classList.remove('overflow-hidden');
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
  hideModalOverlay();
  resetFormulaire();
  clearErrorMessages();
}

// eslint-disable-next-line
document.querySelector('.modal img[aria-label="close dialog"]').addEventListener('keydown', function (event) {
  // Vérifier si la touche pressée est "Enter" (Entrée)
  if (event.key === 'Enter') {
    closeModal(); // Fermer la modale lorsque la touche Entrée est pressée sur la croix
  }
});
