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
  var result;

  if (b === '') {
    result = a * a;
  } else {
    result = a * b;  
  }

  operationResultDecimalPlaces = baseNumberDecimalPlaces + operatingNumberDecimalPlaces;
  return toFixed(result, operationResultDecimalPlaces)
}

function toFixed(val, decimalPlaces) {
  var exponentialForm = Number(val + 'e' + decimalPlaces);
  var rounded = Math.round(exponentialForm);
  var result = Number(rounded + 'e-' + decimalPlaces).toFixed(decimalPlaces);
  return result;
}

function divide(a, b) {
  if (b === '') {
    return a / a;
  } else {
    return a / b;  
  }
}

var baseNumberString = '';
var baseNumberDecimalPlaces = 0;
var operatingNumberString = '';
var operatingNumberDecimalPlaces = 0;
var operationType = null;
var operationResult = null;
var operationResultDecimalPlaces = 0;
var calculatorDisplayText = document.getElementById('calculator-display-text');
calculatorDisplayText.innerText = '0';
var calculatorState = 'takingBaseNumber';
var takingDecimal = false;

function clickNumberButton(number) {
  if (calculatorState === 'takingBaseNumber') {
    if (baseNumberString === '0') {
      baseNumberString = '';
    }
    baseNumberString += number;
    calculatorDisplayText.innerText = baseNumberString;
    operationResultDecimalPlaces = 0;
    operationResult = '';
  }
  
  if (calculatorState === 'takingOperatingNumber') {
    operatingNumberString += number;
    calculatorDisplayText.innerText = operatingNumberString;
  }
}

function clickDecimalButton() {
  if (takingDecimal === true) {
    return;
  }
  
  takingDecimal = true;

  if (calculatorState === 'takingBaseNumber') {
    baseNumberString += '.';
    calculatorDisplayText.innerText = baseNumberString;
  }

  if (calculatorState === 'takingOperatingNumber') {
    operatingNumberString += '.';
    calculatorDisplayText.innerText = operatingNumberString;
  }
}

function updateDecimalPlaces() {
  if (calculatorState === 'takingBaseNumber') {
    baseNumberDecimalPlaces++;
  }

  if (calculatorState === 'takingOperatingNumber') {
    operatingNumberDecimalPlaces++;
  }
}

function clickOperationButton(operation) {
  takingDecimal = false;
  operationType = operation;

  if (Number(operationResult)) {
    baseNumberString = operationResult;
    operatingNumberString = '';
    calculatorState = 'takingOperatingNumber';
  }

  if (!Number(operationResult)) {
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

function clickClearEntryButton() {
  if (calculatorState === 'takingBaseNumber') {
    baseNumberString = '0';
    operationResult = '';
    calculatorDisplayText.innerText = '0';
    takingDecimal = false;
  }

  if (calculatorState === 'takingOperatingNumber') {
    operatingNumberString = '';
    calculatorDisplayText.innerText = '0';
    takingDecimal = false;
  }
}

function clickClearButton() {
  baseNumberString = '';
  baseNumberDecimalPlaces = 0;
  operatingNumberString = '';
  operatingNumberDecimalPlaces = 0;
  operationResult = '';
  calculatorDisplayText.innerText = '0';
  calculatorState = 'takingBaseNumber';
  takingDecimal = false;
}

function updateOperationResultAndDisplayText(operationType) {
  var a, b;

  if (baseNumberDecimalPlaces > 0) {
    a = parseFloat(baseNumberString);
  } else {
    a = parseInt(baseNumberString);
  }

  if (operatingNumberDecimalPlaces > 0) {
    b = parseFloat(operatingNumberString);
  } else {
    b = parseInt(operatingNumberString);
  }

  if (operationResultDecimalPlaces > 0) {
    operationResult = parseFloat(operationResult);
  } else {
    operationResult = parseInt 
  }

  if (Number(operationResult)) {
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
  operatingNumberDecimalPlaces = 0;
  takingDecimal = false;
}

function setupEventListeners() {
  var calculatorButtons = document.getElementById('calculator-buttons');
  calculatorButtons.addEventListener('click', function(e) {
    var buttonNumbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    buttonNumbersArray.forEach(function(number) {
      if (e.target.parentElement.id === `number-button-${number}`) {
        clickNumberButton(`${number}`);
        if (takingDecimal) {
          updateDecimalPlaces();
        }
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
    if (e.target.parentElement.id === 'clear-entry-button') {
      clickClearEntryButton();
    }
    if (e.target.parentElement.id === 'clear-button') {
      clickClearButton();
    }
    if (e.target.parentElement.id === 'decimal-button') {
      clickDecimalButton();
    }
  });
}

setupEventListeners();