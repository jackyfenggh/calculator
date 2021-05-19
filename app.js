function add(a, b) {
  return a + b;  
}

function subtract(a, b) {
  return a - b; 
}

function multiply(a, b) {
  return a * b; 
}

function divide(a, b) {
  return a / b; 
}

// function operate(a, b, operator) {
//   if (operator === '+') {
//     return add(a, b);
//   }

//   if (operator === '-') {
//     return subtract(a, b);
//   }

//   if (operator === '*') {
//     return multiply(a, b);
//   }

//   if (operator === '/') {
//     return divide(a, b);
//   }
// }

var operationBaseNumberString = '';
var operationOperatingNumberString = '';
var operationType = null;
var operationResult = null;
var calculatorDisplayText = document.getElementById('calculator-display-text');
var calculatorState = 'takingBaseNumber';

function clickNumberButton(number) {
  if (Number.isInteger(operationResult)) {
    operationResult = null;
    operationBaseNumberString = '';
    calculatorDisplayText.innerText = '';
  }
  
  if (calculatorState === 'takingBaseNumber') {
    operationBaseNumberString += number;
    calculatorDisplayText.innerText = operationBaseNumberString;
  }
  
  if (calculatorState === 'takingOperatingNumber') {
    operationOperatingNumberString += number;
    calculatorDisplayText.innerText = operationOperatingNumberString
  }
}

function clickOperationButton(operation) {
  operationType = operation;
  calculatorState = 'takingOperatingNumber';
}

function clickEqualsButton() {
  var a = parseInt(operationBaseNumberString);
  var b = parseInt(operationOperatingNumberString);
  
  if (operationType === 'add') {
    if (Number.isInteger(operationResult)) {
      calculatorDisplayText.innerText = add(operationResult, b);
      operationResult = add(operationResult, b);
    } else {
      calculatorDisplayText.innerText = add(a, b);
      operationResult = add(a, b);
    }
  }

  if (operationType === 'subtract') {
    if (Number.isInteger(operationResult)) {
      calculatorDisplayText.innerText = subtract(operationResult, b);
      operationResult = subtract(operationResult, b);
    } else {
      calculatorDisplayText.innerText = subtract(a, b);
      operationResult = subtract(a, b);
    }
  }

  calculatorState = 'takingBaseNumber';

}

function setupEventListeners() {
  var calculatorButtons = document.getElementById('calculator-buttons');
  calculatorButtons.addEventListener('click', function(e) {
    if (e.target.parentElement.id === 'number-button-0') {
      clickNumberButton('0');
    }

    if (e.target.parentElement.id === 'number-button-1') {
      clickNumberButton('1');
    }

    if (e.target.parentElement.id === 'number-button-5') {
      clickNumberButton('5');
    }

    if (e.target.parentElement.id === 'add-button') {
      clickOperationButton('add');
    }

    if (e.target.parentElement.id === 'subtract-button') {
      clickOperationButton('subtract');
    }

    if (e.target.parentElement.id === 'equals-button') {
      clickEqualsButton();
    }
  });
}

setupEventListeners();