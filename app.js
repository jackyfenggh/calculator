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
calculatorDisplayText.innerText = '0';
var calculatorState = 'takingBaseNumber';

function clickNumberButton(number) {
  if (calculatorState === 'takingBaseNumber') {
    if (baseNumberString === '0') {
      baseNumberString = '';
    }
    baseNumberString += number;
    calculatorDisplayText.innerText = baseNumberString;
    operationResult = '';
  }
  
  if (calculatorState === 'takingOperatingNumber') {
    operatingNumberString += number;
    calculatorDisplayText.innerText = operatingNumberString;
  }
}

function clickDecimalButton() {
  if (calculatorState === 'takingBaseNumber') {
    baseNumberString += '.';
    calculatorDisplayText.innerText = baseNumberString;
  }

  if (calculatorState === 'takingOperatingNumber') {
    operatingNumberString += '.';
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

function clickClearEntryButton() {
  if (calculatorState === 'takingBaseNumber') {
    baseNumberString = '0';
    operationResult = '';
    calculatorDisplayText.innerText = '0';
  }

  if (calculatorState === 'takingOperatingNumber') {
    operatingNumberString = '';
    calculatorDisplayText.innerText = '0';
  }
}

function clickClearButton() {
  baseNumberString = '';
  operatingNumberString = '';
  operationResult = '';
  calculatorDisplayText.innerText = '0';
}

function updateOperationResultAndDisplayText(operationType) {
  var a = parseFloat(baseNumberString);
  var b = parseFloat(operatingNumberString);
  
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