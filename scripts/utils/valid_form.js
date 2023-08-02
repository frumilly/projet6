/* eslint-disable */
const submitButton = document.querySelector('.contact_button');
    const formElement = document.forms.contactForm;

    // Ajouter un gestionnaire d'événement pour l'événement 'submit' du formulaire
    formElement.addEventListener('submit', function (event) {
      event.preventDefault();
      clearErrorMessages();

      const errors = [];

      checkInput('firstname', 'Le format du prénom est non respecté', errors);
      checkInput('lastname', 'Le format du nom est non respecté', errors);
      checkEmail('email', 'Email incorrect', errors);
      checkMsg('message', 'Veuillez entrer 10 caractères ou plus pour le champ du message.', errors);
      if (errors.length === 0) {
        // Afficher toutes les informations dans la console
        console.log('Informations valides :');
        console.log('Prénom:', formElement.firstname.value.trim());
        console.log('Nom:', formElement.lastname.value.trim());
        console.log('Adresse électronique:', formElement.email.value.trim());
        console.log('Message:', formElement.message.value.trim());
        resetFormulaire();
        const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
  hideModalOverlay();
      } else {
        // Afficher les messages d'erreur
        errors.forEach(error => {
          displayError(error.inputElement.id + '-error', error.errorMessage);
        });
      }
    });

    function checkInput(inputId, errorMessage, errors) {
      const inputElement = document.getElementById(inputId);
      const value = inputElement.value.trim();
      if (!/^[A-Za-z]+$/.test(value) || value.length < 1 || value === '') {
        errors.push({ inputElement, errorMessage });
      }
    }
    function checkMsg(inputId, errorMessage, errors) {
      const inputElement = document.getElementById(inputId);
      const value = inputElement.value.trim();
      if (!/^[A-Za-z]+$/.test(value) || value.length < 10 || value === '') {
        errors.push({ inputElement, errorMessage });
      }
    }
    function checkEmail(inputId, errorMessage, errors) {
      const inputElement = document.getElementById(inputId);
      const value = inputElement.value.trim();
      if (!validateEmailFormat(value)) {
        errors.push({ inputElement, errorMessage });
      }
    }

    function validateEmailFormat(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    function clearErrorMessages() {
      const errorMessages = document.querySelectorAll('.small-error-message');
      errorMessages.forEach(function (errorMessage) {
        errorMessage.textContent = ''; // Efface le contenu de l'élément p
      });
    }

    function displayError(errorElementId, errorMessage) {
      const errorElement = document.getElementById(errorElementId);
      errorElement.textContent = errorMessage;
    }

    function resetFormulaire() {
      formElement.reset();
      clearErrorMessages();
    }