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

function operate(a, b, operator) {
  if (operator === '+') {
    return add(a, b);
  }

  if (operator === '-') {
    return subtract(a, b);
  }

  if (operator === '*') {
    return multiply(a, b);
  }

  if (operator === '/') {
    return divide(a, b);
  }
}

var operationNumberOneString = '';
var operationNumberTwoString = '';
var operationType = null;
var operationResult = null;
var calculatorDisplayText = document.getElementById('calculator-display-text');

function clickNumberButton(number) {
  if (operationNumberOneString === operationNumberTwoString || Number.isInteger(operationResult)) {
    operationResult = null;
    operationNumberOneString = '';
    calculatorDisplayText.innerText = '';
  }
  
  operationNumberOneString += number;
  calculatorDisplayText.innerText += `${number}`;
}

function clickOperationButton(operation) {
  operationType = operation;
  operationNumberTwoString = operationNumberOneString;
}

function clickEqualsButton() {
  if (operationType === 'add') {
    var a = parseInt(operationNumberOneString);
    var b = parseInt(operationNumberTwoString);
    
    if (operationResult != null) {
      calculatorDisplayText.innerText = add(a, operationResult);
      operationResult = add(a, operationResult);
    } else {
      calculatorDisplayText.innerText = add(a, b);
      operationResult = add(a, b);
    }
  }
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

    if (e.target.parentElement.id === 'equals-button') {
      clickEqualsButton();
    }
  });
}

setupEventListeners();