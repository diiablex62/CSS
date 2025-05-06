const form = document.querySelector(".contact-form");
const emailField = document.getElementById("email");
const emailDomains = [
  "@hotmail.fr",
  "@hotmail.com",
  "@outlook.fr",
  "@outlook.com",
  "@gmail.com",
  "@yahoo.fr",
  "@yahoo.com",
  "@aol.com",
  "@icloud.com",
  "@live.com",
  "@msn.com",
  "@wanadoo.fr",
  "@orange.fr",
  "@free.fr",
  "@sfr.fr",
  "@laposte.net",
  "@protonmail.com",
  "@gmx.com",
];

const suggestionsDiv = document.createElement("div");
suggestionsDiv.style.position = "absolute";
suggestionsDiv.style.backgroundColor = "white";
suggestionsDiv.style.border = "1px solid #ccc";
suggestionsDiv.style.display = "none";
suggestionsDiv.style.zIndex = "10";
emailField.parentNode.insertBefore(suggestionsDiv, emailField.nextSibling); 


const showEmailSuggestions = (input) => {
  const suggestions = [];
  let textBeforeAt = "";
  suggestionsDiv.innerHTML = "";
  if (input.includes("@")) {
    textBeforeAt = input.split("@")[0];
    if (input.indexOf("@") !== input.lastIndexOf("@")) {
      suggestionsDiv.style.display = "none";
      return;
    }

    emailDomains.forEach((domain) => {
      suggestions.push(textBeforeAt + domain);
    });

    if (suggestions.length > 0) {
      suggestions.forEach((suggestion) => {
        const suggestionItem = document.createElement("div");
        suggestionItem.textContent = suggestion;
        suggestionItem.style.padding = "5px";
        suggestionItem.style.cursor = "pointer";

        suggestionItem.addEventListener("click", () => {
          emailField.value = suggestion;
          suggestionsDiv.style.display = "none";
        });

        suggestionItem.addEventListener("mouseover", () => {
          suggestionItem.style.backgroundColor = "#f0f0f0";
        });
        suggestionItem.addEventListener("mouseout", () => {
          suggestionItem.style.backgroundColor = "white";
        });

        suggestionsDiv.appendChild(suggestionItem);
      });

      suggestionsDiv.style.display = "block";
    } else {
      suggestionsDiv.style.display = "none";
    }
  } else {
    suggestionsDiv.style.display = "none";
  }
};

emailField.addEventListener("input", (event) => {
  const currentInput = event.target.value;
  showEmailSuggestions(currentInput);
});

document.addEventListener("click", (event) => {
  if (
    !emailField.contains(event.target) &&
    !suggestionsDiv.contains(event.target)
  ) {
    suggestionsDiv.style.display = "none";
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const firstNameField = document.getElementById("firstName");
  const lastNameField = document.getElementById("lastName");
  const messageField = document.getElementById("message");
  const firstName = firstNameField.value.trim();
  const lastName = lastNameField.value.trim();
  const email = emailField.value.trim();
  const message = messageField.value.trim();
  const isValidName = (name) => {
    return name.length >= 2;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidMessage = (message) => {
    return message.length >= 10;
  };

  const clearValidation = () => {
    const errorMessages = form.querySelectorAll(".error-message");
    errorMessages.forEach((message) => message.remove());
    firstNameField.classList.remove("invalid", "valid");
    lastNameField.classList.remove("invalid", "valid");
    emailField.classList.remove("invalid", "valid");
    messageField.classList.remove("invalid", "valid");
  };
  clearValidation();

  const displayError = (field, message) => {
    const errorSpan = document.createElement("span");
    errorSpan.classList.add("error-message");
    errorSpan.style.color = "red";
    errorSpan.textContent = message;
    field.parentNode.insertBefore(errorSpan, field.nextSibling);
    field.classList.add("invalid");
  };

  const displaySuccess = (field) => {
    field.classList.add("valid");
  };

  let isValid = true;

  if (!isValidName(firstName)) {
    displayError(firstNameField, "Prénom invalide (minimum 2 caractères).");
    isValid = false;
  } else {
    displaySuccess(firstNameField);
  }
  if (!isValidName(lastName)) {
    displayError(lastNameField, "Nom invalide (minimum 2 caractères).");
    isValid = false;
  } else {
    displaySuccess(lastNameField);
  }

  if (!isValidEmail(email)) {
    displayError(emailField, "Email invalide.");
    isValid = false;
  } else {
    displaySuccess(emailField);
  }

  if (!isValidMessage(message)) {
    displayError(messageField, "Message invalide (minimum 10 caractères).");
    isValid = false;
  } else {
    displaySuccess(messageField);
  }

  if (isValid) {
    alert("Message envoyé avec succès !");
    form.submit();
  }
});
// focus formulaire
const devisButton = document.querySelector(".ask_devis");
const firstNameInput = document.getElementById("firstName");

devisButton.addEventListener("click", (event) => {
  event.preventDefault();
  document.getElementById("devis").scrollIntoView({ behavior: "smooth" });

  setTimeout(() => {
    firstNameInput.focus();
  }, 500);
});
