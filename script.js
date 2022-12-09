const display = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

let firstOperand = 0;
let secondOperand = 0;
let operator = "";
let currentResult = 0;
let displayValue = "0";
let isResetAll = true;
let secondOperator = "";

function addFigure(value) {
  display.textContent = displayValue === "0" ? value : displayValue + value;
  displayValue = display.textContent;
}

function addDecimal() {
  displayValue = display.textContent;
  if (!displayValue.contains(".")) {
    display.textContent = displayValue === "0" ? "0." : displayValue + ".";
    displayValue = display.textContent;
  }
}

function isResetAllAlgorithm(value, type) {
  // if we get number or '-'
  if ((type === "figure" && value !== 0) || value === "-") {
    isResetAll = false;
    addFigure(value);
    // if we get decimal
  } else if (value === ".") {
    isResetAll = false;
    addDecimal();
  }
}

function doMathOperation() {
  switch (operator) {
    case "+":
      currentResult = firstOperand + secondOperand;
      break;
    case "-":
      currentResult = firstOperand - secondOperand;
      break;
    case "*":
      currentResult = firstOperand * secondOperand;
      break;
    case "/":
      currentResult = firstOperand / secondOperand;
  }
  displayValue = currentResult;
  display.textContent = displayValue;
  firstOperand = currentResult;
  currentResult = 0;
  if (secondOperator) {
    operator = secondOperator;
    secondOperator = "";
    displayValue = "0";
  } else {
    operator = "";
  }
  secondOperand = 0;
}

function IsOperatorAlgorithm(value, type) {
  if (type === "figure") {
    addFigure(value);
  } else if (type === "decimal") {
    addDecimal();
  } else {
    if (value !== "=" && displayValue) {
      secondOperator = value;
    }
    secondOperand = +displayValue;
    doMathOperation();
  }
}

function IsFirstOperandAlgorithm(value, type) {
  if (type === "operator" && value !== "=") {
    operator = value;
    displayValue = "0";
  }
}

function IsDisplayValueAlgorithm(value, type) {
  if (type === "figure") {
    addFigure(value);
  } else if (type === "decimal") {
    addDecimal();
  } else {
    if (value !== "=") {
      firstOperand = +displayValue;
      operator = value;
      displayValue = "0";
    }
  }
}

function checkCalculatorStatus(value, type) {
  if (isResetAll) {
    isResetAllAlgorithm(value, type);
  } else if (operator) {
    IsOperatorAlgorithm(value, type);
  } else if (firstOperand) {
    IsFirstOperandAlgorithm(value, type);
  } else if (displayValue) {
    IsDisplayValueAlgorithm(value, type);
  }
}

function sendNumberValue() {
  inputBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let value = e.target.value;
      let type;
      switch (e.target.classList[0]) {
        case "operator":
          type = "operator";
          break;
        case "decimal":
          type = "decimal";
          break;
        default:
          type = "figure";
      }
      checkCalculatorStatus(value, type);
    });
  });
}

function resetAll() {
  currentResult = 0;
  displayValue = "0";
  firstOperand = 0;
  secondOperand = 0;
  operator = "";
  display.textContent = "0";
  isResetAll = true;
}

sendNumberValue();
clearBtn.addEventListener("click", resetAll);
