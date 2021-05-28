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

var baseNumberString = '';
var operatingNumberString = '';
var operationType = null;
var operationResult = null;
var calculatorDisplayText = document.getElementById('calculator-display-text');
var calculatorState = 'takingBaseNumber';

function clickNumberButton(number) {
  if (calculatorState === 'takingBaseNumber') {
    baseNumberString += number;
    calculatorDisplayText.innerText = baseNumberString;
    operationResult = '';
  }
  
  if (calculatorState === 'takingOperatingNumber') {
    operatingNumberString += number;
    calculatorDisplayText.innerText = operatingNumberString;
  }
}

function clickOperationButton(operation) {
  operationType = operation;

  if (Number.isInteger(operationResult)) {
    baseNumberString = operationResult;
    operatingNumberString = '';
    calculatorState = 'takingOperatingNumber';
  }

  if (!Number.isInteger(operationResult)) {
    calculatorState = 'takingOperatingNumber';
    operatingNumberString = '';
  }
}

function clickDeleteButton() {
  calculatorDisplayText.innerText = calculatorDisplayText.innerText.replace(calculatorDisplayText.innerText[calculatorDisplayText.innerText.length - 1], '');

  if (calculatorState === 'takingBaseNumber') {
    baseNumberString = baseNumberString.replace(baseNumberString[baseNumberString.length - 1], '');
  }

  if (calculatorState === 'takingOperatingNumber') {
    operatingNumberString = operatingNumberString.replace(operatingNumberString[operatingNumberString.length - 1], '');
  }
}

function updateOperationResultAndDisplayText(operationType) {
  var a = parseInt(baseNumberString);
  var b = parseInt(operatingNumberString);
  
  if (Number.isInteger(operationResult)) {
    calculatorDisplayText.innerText = operationType(operationResult, b);
    operationResult = operationType(operationResult, b);
  } else {
    calculatorDisplayText.innerText = operationType(a, b);
    operationResult = operationType(a, b);
  }
}

function clickEqualsButton() {
  if (operatingNumberString === '') {
    operatingNumberString = baseNumberString;
  }

  updateOperationResultAndDisplayText(operationType);

  calculatorState = 'takingBaseNumber';
  baseNumberString = '';
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

    if (e.target.parentElement.id === 'delete-button') {
      clickDeleteButton();
    }
  });
}

setupEventListeners();