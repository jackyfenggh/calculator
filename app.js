function add(a, b) {
  if (b === '') {
    return a + a;
  } else {
    return a + b;  
  }
}

function subtract(a, b) {
  if (b === '') {
    return a - a;
  } else {
    return a - b;  
  }
}

function multiply(a, b) {
  if (b === '') {
    return a * a;
  } else {
    return a * b;  
  }
}

function divide(a, b) {
  if (b === '') {
    return a / a;
  } else {
    return a / b;  
  }
}

var operationBaseNumberString = '';
var operationOperatingNumberString = '';
var operationType = null;
var operationResult = null;
var calculatorDisplayText = document.getElementById('calculator-display-text');
var calculatorState = 'takingBaseNumber';

function clickNumberButton(number) {
  if (calculatorState === 'takingBaseNumber') {
    operationBaseNumberString += number;
    calculatorDisplayText.innerText = operationBaseNumberString;
  }
  
  if (calculatorState === 'takingOperatingNumber') {
    operationOperatingNumberString += number;
    calculatorDisplayText.innerText = operationOperatingNumberString;
  }
}

function clickOperationButton(operation) {
  operationType = operation;

  if (Number.isInteger(operationResult)) {
    operationBaseNumberString = operationResult;
    operationOperatingNumberString = '';
    calculatorState = 'takingOperatingNumber';
  }

  if (!Number.isInteger(operationResult)) {
    calculatorState = 'takingOperatingNumber';
  }
}

function updateOperationResultAndDisplayText(operationType) {
  var a = parseInt(operationBaseNumberString);
  var b = parseInt(operationOperatingNumberString);
  
  if (Number.isInteger(operationResult)) {
    calculatorDisplayText.innerText = operationType(operationResult, b);
    operationResult = operationType(operationResult, b);
  } else {
    calculatorDisplayText.innerText = operationType(a, b);
    operationResult = operationType(a, b);
  }
}

function clickEqualsButton() {
  if (operationType === add) {
    updateOperationResultAndDisplayText(operationType);
  }
  if (operationType === subtract) {
    updateOperationResultAndDisplayText(operationType);
  }
  if (operationType === multiply) {
    updateOperationResultAndDisplayText(operationType);
  }
  if (operationType === divide) {
    updateOperationResultAndDisplayText(operationType);
  }
  calculatorState = 'takingBaseNumber';
}

function setupEventListeners() {
  var calculatorButtons = document.getElementById('calculator-buttons');
  calculatorButtons.addEventListener('click', function(e) {
    var buttonNumbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    buttonNumbersArray.forEach(function(number) {
      if (e.target.parentElement.id === `number-button-${number}`) {
        clickNumberButton(`${number}`);
      }
    });
    if (e.target.parentElement.id === 'add-button') {
      clickOperationButton(add);
    }
    if (e.target.parentElement.id === 'subtract-button') {
      clickOperationButton(subtract);
    }
    if (e.target.parentElement.id === 'multiply-button') {
      clickOperationButton(multiply);
    }
    if (e.target.parentElement.id === 'divide-button') {
      clickOperationButton(divide);
    }
    if (e.target.parentElement.id === 'equals-button') {
      clickEqualsButton();
    }
  });
}

setupEventListeners();