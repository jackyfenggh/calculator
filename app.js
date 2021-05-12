function add(numberOne, numberTwo) {
  return numberOne + numberTwo;  
}

function subtract(numberOne, numberTwo) {
  return numberOne - numberTwo; 
}

function multiply(numberOne, numberTwo) {
  return numberOne * numberTwo; 
}

function divide(numberOne, numberTwo) {
  return numberOne / numberTwo; 
}

function operate(numberOne, numberTwo, operator) {
  if (operator === '+') {
    return add(numberOne, numberTwo);
  }

  if (operator === '-') {
    return subtract(numberOne, numberTwo);
  }

  if (operator === '*') {
    return multiply(numberOne, numberTwo);
  }

  if (operator === '/') {
    return divide(numberOne, numberTwo);
  }
}

function renderCalculator() {
  var calculatorButtonsDiv = document.getElementById('calculator-buttons');

  var clearEntryButton = document.createElement('div');
  clearEntryButton.innerText = 'CE';
  clearEntryButton.classList.add('calculator-button');

  var clearButton = document.createElement('div');
  clearButton.innerText = 'C';
  clearButton.classList.add('calculator-button');

  var deleteButton = document.createElement('div');
  deleteButton.innerText = 'X';
  deleteButton.classList.add('calculator-button');

  calculatorButtonsDiv.appendChild(clearEntryButton);
  calculatorButtonsDiv.appendChild(clearButton);
  calculatorButtonsDiv.appendChild(deleteButton);

  var numbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];


}

renderCalculator();