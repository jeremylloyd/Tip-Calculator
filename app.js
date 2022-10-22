const customInput = document.querySelector(".form__input--custom");
const tipButtons = document.querySelectorAll(".form__button");
const tipAmount = document.querySelector("#tipAmount");
const totalAmount = document.querySelector("#totalAmount");
const billAmount = document.querySelector("#billAmount");
const peopleCount = document.querySelector("#peopleCount");
const buttonReset = document.querySelector(".card__button");
const themePicker = document.querySelector(".theme__picker");
let tipPercentage = 0.15;

let usdFormatter = Intl.NumberFormat("en", {
  style: "currency",
  currency: "USD",
  currencyDisplay: "narrowSymbol",
});

peopleCount.errorLabel = document.querySelector("#peopleCountError");
billAmount.errorLabel = document.querySelector("#billAmountError");

tipButtons.forEach((button) => {
  button.addEventListener("click", () => selectTipButton(button));
  button.addEventListener("click", setTipPercentage);
  button.addEventListener("click", updateCard);
  button.style.transition =
    "background-color ease-out 100ms, color ease-out 100ms";
});
customInput.addEventListener("input", setTipPercentage);
customInput.addEventListener("input", updateCard);
billAmount.addEventListener("input", updateCard);
billAmount.addEventListener("input", validateBillAmount);
peopleCount.addEventListener("input", updateCard);
peopleCount.addEventListener("input", validatePeopleCount);
buttonReset.addEventListener("click", reset);
themePicker.addEventListener("input", () =>
  document.querySelector(":root").style.setProperty("--hue", themePicker.value)
);

function selectTipButton(element) {
  tipButtons.forEach((button) =>
    button.classList.remove("form__button--active")
  );
  element.classList.add("form__button--active");
  customInput.value = "";
}

function unselectTipButtons() {
  tipButtons.forEach((button) =>
    button.classList.remove("form__button--active")
  );
}

function updateCard() {
  if (inputsAreValid()) {
    calculateTips();
  }
}

function calculateTips() {
  bill = Number(billAmount.value);
  people = Number(peopleCount.value);
  tipTotal = bill * tipPercentage;

  tipAmount.innerHTML = usdFormatter.format(tipTotal / people);
  totalAmount.innerHTML = usdFormatter.format((bill + tipTotal) / people);
}

function setTipPercentage() {
  if (this === customInput) {
    unselectTipButtons();
    value = parseFloat(this.value) / 100;
    tipPercentage = value >= 0 ? value : 0;
  } else {
    tipPercentage = parseFloat(this.innerHTML) / 100;
  }
  console.log(`tipPercentage set to ${tipPercentage}`);
}

function inputsAreValid() {
  return (
    customInput.validity.valid &&
    billAmount.validity.valid &&
    peopleCount.validity.valid &&
    billAmount.value !== "" &&
    peopleCount.value !== ""
  );
}

function validateBillAmount() {
  let label;
  if (this.validity.rangeUnderflow) {
    label = "Must exceed 0";
  } else if (this.value === "") {
    label = "Enter a number";
  } else if (this.validity.stepMismatch) {
    label = "Enter dollars & cents";
  } else {
    label = "";
  }
  this.errorLabel.innerHTML = label;
}

function validatePeopleCount() {
  let label;
  if (this.validity.rangeUnderflow) {
    label = "Must exceed 0";
  } else if (!this.validity.valid) {
    label = "Enter an integer";
  } else {
    label = "";
  }
  this.errorLabel.innerHTML = label;
}

function reset() {
  let inputs = [customInput, billAmount, peopleCount];
  let labels = [peopleCount.errorLabel, billAmount.errorLabel];
  inputs.forEach((elem) => (elem.value = ""));
  labels.forEach((elem) => (elem.innerHTML = ""));
  selectTipButton(tipButtons[2]);
  document
    .querySelectorAll(".card__metric")
    .forEach((elem) => (elem.innerHTML = "$0.00"));
}
