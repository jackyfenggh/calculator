/* Operation functions */

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

function multiply(a, b, decimalPlacesA, decimalPlacesB) {
  var result;

  if (b === '') {
    result = a * a;
  } else {
    result = a * b;
  }

  operationResultDecimalPlaces = decimalPlacesA + decimalPlacesB;
  result = toFixed(result, operationResultDecimalPlaces);

  return result;
}

function divide(a, b, decimalPlacesA, decimalPlacesB) {
  var result;
  var multiplier;
  if (decimalPlacesA !== 0 || decimalPlacesB !== 0) {
    multiplier = decimalPlacesA > decimalPlacesB ? decimalPlacesA : decimalPlacesB;
  } else {
    multiplier = 0;
  }

  if (b === '') {
    result = (a + 'e' + multiplier) / (a + 'e' + multiplier);
  } else {
    result = (a + 'e' + multiplier) / (b + 'e' + multiplier);
  }

  result = Number(result).toString();
  return result;
}

/* Helper functions */

function toFixed(val, decimalPlaces) {
  var exponentialForm = Number(val + 'e' + decimalPlaces);
  var rounded = Math.round(exponentialForm);
  var result = Number(rounded + 'e-' + decimalPlaces).toFixed(decimalPlaces);
  return result;
}

function countDecimalPlaces(val) {
  val = Number(val).toString().split('.');
  if (val.length > 1) {
    var decimalPlaces = val[1].length;
    return decimalPlaces; 
  } else {
    return 0;
  }
}

var baseNumberString = '';
var baseNumberDecimalPlaces = 0;
var operatingNumberString = '';
var operatingNumberDecimalPlaces = 0;
var operationType = null;
var operationResultString = '';
var operationResultDecimalPlaces = 0;
var calculatorPrimaryText = document.querySelector('#primary-text p');
calculatorPrimaryText.innerText = '0';
var calculatorState = 'takingBaseNumber';
var takingDecimal = false;

function clickNumberButton(number) {
  if (calculatorState === 'takingBaseNumber') {
    if (baseNumberString === '0') {
      baseNumberString = '';
    }
    baseNumberString += number;
    calculatorPrimaryText.innerText = baseNumberString;
    operationResultDecimalPlaces = 0;
    operationResultString = '';
  }
  
  if (calculatorState === 'takingOperatingNumber') {
    operatingNumberString += number;
    calculatorPrimaryText.innerText = operatingNumberString;
  }
}

function clickDecimalButton() {
  if (takingDecimal === true) {
    return;
  }
  
  takingDecimal = true;

  if (calculatorState === 'takingBaseNumber') {
    baseNumberString += '.';
    calculatorPrimaryText.innerText = baseNumberString;
  }

  if (calculatorState === 'takingOperatingNumber') {
    operatingNumberString += '.';
    calculatorPrimaryText.innerText = operatingNumberString;
  }
}

function clickOperationButton(operation) {
  takingDecimal = false;
  operationType = operation;

  if (Number(operationResultString)) {
    baseNumberString = operationResultString;
    operatingNumberString = '';
    calculatorState = 'takingOperatingNumber';
  }

  if (!Number(operationResultString)) {
    calculatorState = 'takingOperatingNumber';
    operatingNumberString = '';
  }
}

function clickDeleteButton() {
  calculatorPrimaryText.innerText = calculatorPrimaryText.innerText.replace(calculatorPrimaryText.innerText[calculatorPrimaryText.innerText.length - 1], '');

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
    operationResultString = '';
    calculatorPrimaryText.innerText = '0';
    takingDecimal = false;
  }

  if (calculatorState === 'takingOperatingNumber') {
    operatingNumberString = '';
    calculatorPrimaryText.innerText = '0';
    takingDecimal = false;
  }
}

function clickClearButton() {
  baseNumberString = '';
  baseNumberDecimalPlaces = 0;
  operatingNumberString = '';
  operatingNumberDecimalPlaces = 0;
  operationResultString = '';
  calculatorPrimaryText.innerText = '0';
  calculatorState = 'takingBaseNumber';
  takingDecimal = false;
}

function updateOperationResultAndDisplayText(operationType) {
  var baseNumber, operationNumber, operationResult;
  baseNumberDecimalPlaces = countDecimalPlaces(baseNumberString);
  operatingNumberDecimalPlaces = countDecimalPlaces(operatingNumberString);
  operationResultDecimalPlaces = countDecimalPlaces(operationResultString);

  if (baseNumberDecimalPlaces > 0) {
    baseNumber = parseFloat(baseNumberString);
  } else {
    baseNumber = parseInt(baseNumberString);
  }

  if (operatingNumberDecimalPlaces > 0) {
    operationNumber = parseFloat(operatingNumberString);
  } else {
    operationNumber = parseInt(operatingNumberString);
  }

  if (operationResultDecimalPlaces > 0) {
    operationResult = parseFloat(operationResultString);
  } else {
    operationResult = parseInt(operationResultString);
  }

  if (Number(operationResultString)) {
    calculatorPrimaryText.innerText = operationType(operationResult, operationNumber, operationResultDecimalPlaces, operatingNumberDecimalPlaces);
    operationResultString = calculatorPrimaryText.innerText;
  } else {
    calculatorPrimaryText.innerText = operationType(baseNumber, operationNumber, baseNumberDecimalPlaces, operatingNumberDecimalPlaces);
    operationResultString = calculatorPrimaryText.innerText;
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
  var calculatorButtons = document.getElementById('calculator-buttons-container');

  calculatorButtons.addEventListener('click', function(e) {
    var targetId = e.target.id.split('-')[1];;
    var buttons = {
      0: clickNumberButton,
      1: clickNumberButton,
      2: clickNumberButton,
      3: clickNumberButton,
      4: clickNumberButton,
      5: clickNumberButton,
      6: clickNumberButton,
      7: clickNumberButton,
      8: clickNumberButton,
      9: clickNumberButton,
      equals: clickEqualsButton,
      delete: clickDeleteButton,
      clearEntry: clickClearEntryButton,
      clear: clickClearButton,
      decimal: clickDecimalButton
    };

    var operationButtons = {
      add: add,
      subtract: subtract,
      multiply: multiply,
      divide: divide
    };

    if (targetId in operationButtons) {
      return clickOperationButton(operationButtons[targetId]);
    } else {
      return buttons[targetId](targetId);
    }
  });
}

setupEventListeners();