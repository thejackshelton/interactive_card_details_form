const body = document.querySelector("body");
const completedDiv = document.querySelector("#complete");
const form = document.querySelector("form");
const restartButton = document.querySelector("#restart");

const nameInput = document.querySelector("[data-name-input]");
const name = document.querySelector("[data-name]");

const cardinfoInput = document.querySelector("[data-cardinfo-input]");
const cardinfo = document.querySelector("[data-cardinfo]");
const cardinfoError = document.querySelector("#cardinfo-error");
const cardinfoErrorMessage = document.createElement("p");
cardinfoErrorMessage.innerText = "Wrong format, numbers only";

const expirationMonth = document.querySelector("[data-expiration-month]");
const expirationYear = document.querySelector("[data-expiration-year]");
const expiration = document.querySelector("[data-expiration]");
const expirationError = document.querySelector("#expiration-error");
const expirationErrorMessage = document.createElement("p");
expirationErrorMessage.innerText = "Can't be blank";

const cvcInput = document.querySelector("[data-cvc-input]");
const cvc = document.querySelector("[data-cvc]");
const cvcError = document.querySelector("#cvc-error");
const cvcErrorMessage = document.createElement("p");
cvcErrorMessage.innerText = "Can't be blank";

nameInput.addEventListener("keyup", (e) => {
  name.innerText = e.target.value.toUpperCase();

  if (e.target.value === "") {
    name.innerText = "JANE APPLESEED";
  }

  if (e.target.value.length > 30) {
    console.log("name is too long");
    e.target.value = e.target.value.slice(0, -1);
    name.innerText = name.innerText.slice(0, -1);
    cardinfoInput.focus();
  }
});

cardinfoInput.addEventListener("keyup", (e) => {
  if (e.target.value === "") {
    cardinfo.innerText = "0000 0000 0000 0000";
  } else {
    //Removes any white spaces
    let trimmedinfo = e.target.value.replace(/\s+/g, "");

    //Regex for adding a space between each 4 digits on the card
    let regexFilter = trimmedinfo.match(/.{1,4}/g);

    //Uses join when there is more than white spaces
    if (trimmedinfo !== "") {
      cardinfo.innerText = regexFilter.join(" ");
    }

    //Checks if the current value contains anything other than numbers
    if (!e.target.value.match(/^[\d ]*$/)) {
      console.log("sorry, but you haven't typed a number");
      cardinfoError.classList.add("text-heading_xs");
      cardinfoError.appendChild(cardinfoErrorMessage);
    } else {
      if (cardinfoError.contains(cardinfoErrorMessage)) {
        cardinfoError.removeChild(cardinfoErrorMessage);
      }
    }

    //Prevents any trimmed number length over 16 (w/removed white space)
    let trimmedText = cardinfo.innerText.replace(/\s+/g, "");
    if (trimmedText.length > 16) {
      console.log("Sorry, but that input is too long.");
      e.target.value = e.target.value.slice(0, -1);
      cardinfo.innerText = cardinfo.innerText.slice(0, -1);
      expirationMonth.focus();
    }
  }
});

expirationMonth.addEventListener("keyup", (e) => {
  keepYear = expiration.innerText.slice(-2);
  if (e.target.value === "") {
    expirationError.classList.add("text-heading_xs");
    expirationError.appendChild(expirationErrorMessage);
    console.log("can't be blank");
    expiration.innerText = "00/" + keepYear;
  } else {
    expiration.innerText = e.target.value + "/" + keepYear;
    if (expirationError.contains(expirationErrorMessage)) {
      expirationError.removeChild(expirationErrorMessage);
    }

    if (!e.target.value.match(/^[\d ]*$/)) {
      e.target.value = e.target.value.slice(0, -1);
      expiration.innerText =
        expiration.innerText.substring(0, 2).slice(0, -1) + "/" + keepYear;
    }
  }

  if (e.target.value.length >= 2) {
    expirationYear.focus();
  }

  if (e.target.value.length > 2) {
    e.target.value = e.target.value.slice(0, -1);
    expiration.innerText = expiration.innerText.slice(0, 1);
  }
});

expirationYear.addEventListener("keyup", (e) => {
  year = e.target.value;

  if (e.target.value === "") {
    expiration.innerText = expiration.innerText.substring(0, 2) + "/00";
    expirationError.classList.add("text-heading_xs");
    expirationError.appendChild(expirationErrorMessage);
  } else {
    expiration.innerText =
      expiration.innerText.substring(0, 2) + "/" + e.target.value;
    if (expirationError.contains(expirationErrorMessage)) {
      expirationError.removeChild(expirationErrorMessage);
    }

    if (!e.target.value.match(/^[\d ]*$/)) {
      e.target.value = e.target.value.slice(0, -1);
      expiration.innerText =
        expiration.innerText.substring(0, 2) +
        "/" +
        expiration.innerText.substring(0, e.target.value).slice(0, -1);
    }

    if (e.target.value.length >= 2) {
      cvcInput.focus();
    }

    if (e.target.value.length > 2) {
      e.target.value = e.target.value.slice(0, -1);
      expiration.innerText = expiration.innerText.slice(0, -1);
    }
  }
});

cvcInput.addEventListener("keyup", (e) => {
  if (e.target.value === "") {
    cvc.innerText = "000";
    cvcError.classList.add("text-heading_xs");
    cvcError.appendChild(cvcErrorMessage);
  } else {
    cvc.innerText = e.target.value;
    if (cvcError.contains(cvcErrorMessage)) {
      cvcError.removeChild(cvcErrorMessage);
    }

    if (!e.target.value.match(/^[\d ]*$/)) {
      e.target.value = e.target.value.slice(0, -1);
      cvc.innerText = cvc.innerText.slice(0, -1);
    }
  }

  if (e.target.value.length > 3) {
    e.target.value = e.target.value.slice(0, -1);
    cvc.innerText = cvc.innerText.slice(0, -1);
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  form.classList.remove("flex");
  form.classList.add("invisible", "w-0", "h-0", "opacity-0");
  completedDiv.classList.remove("invisible", "w-0", "h-0", "opacity-0");
  completedDiv.classList.add("opacity-100");
});

restartButton.addEventListener("click", () => {
  form.classList.add("flex");
  form.classList.remove("invisible", "w-0", "h-0", "opacity-0");
  form.classList.add("opacity-100");
  completedDiv.classList.add("invisible", "w-0", "h-0", "opacity-0");

  //Form Reset
  form.reset();
  name.innerText = "JANE APPLESEED";
  cardinfo.innerText = "0000 0000 0000 0000";
  expiration.innerText = "00/00";
  cvc.innerText = "000";
});
