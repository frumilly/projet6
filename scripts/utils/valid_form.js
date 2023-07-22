/* eslint-disable */
// Récupérer la référence de l'élément bouton
const submitButton = document.querySelector('.contact_button');
let isValid = true;
// Ajouter un gestionnaire d'événement pour l'événement 'click'
submitButton.addEventListener('click', function (event) {
  event.preventDefault();
  const firstInput = document.getElementById('firstname');
  // Récupérer la valeur saisie dans le champ
  const value = firstInput.value.trim();

  // Vérifier si la valeur a un minimum de 2 caractères et n'est pas vide
  if (value.length < 2 || value == '') {
    console.log('Le champ "first" est invalide.');
    // Ajoutez ici le code à exécuter si le champ est invalide
    isValid = false;
  }
  // Récupérer la référence de l'élément input du nom
  const lastInput = document.getElementById('lastname');

  // Récupérer la valeur saisie dans le champ du nom
  const lastName = lastInput.value.trim();

  // Vérifier si le nom a un minimum de 2 caractères et n'est pas vide
  if (lastName.length < 2 || lastName == '') {
    console.log('Le champ "Nom" est invalide.');
    isValid = false;
  }
  // Récupérer la référence de l'élément input de l'adresse électronique
  const emailInput = document.getElementById('mail');

  // Récupérer la valeur saisie dans le champ de l'adresse électronique
  const emailA = emailInput.value.trim();

  // Vérifier si l'adresse électronique est valide
  if (!validateEmail(emailA)) {
    console.log('L\'adresse électronique n\'est pas valide.');
    isValid = false;
  }

  // Récupérer la référence de l'élément input
  const message = document.getElementById('message');
  // Récupérer la valeur saisie dans le champ
  const valueMessage= message.value.trim();

  // Vérifier si la valeur a un minimum de 2 caractères et n'est pas vide
  if (valueMessage.length < 2 || valueMessage == '') {

    console.log('Le champ "message" est invalide.');
    isValid = false;
  }
 
  if (isValid == true) {
   // Afficher toutes les informations dans la console
   console.log('Informations valides :');
   console.log('Prénom:', value);
   console.log('Nom:', lastName);
   console.log('Adresse électronique:', emailA);


    // Supprimer le formulaire
    //formElement.remove();
    //resetFormulaire();
//formElement.style.display = "none";
 
  }

});
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function clearErrorMessages() {
  let errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(function (errorMessage) {
    errorMessage.remove();
  });
}


let  formSauv = document.forms.reserve;
function resetFormulaire() {
  formSauv.reset();
}

