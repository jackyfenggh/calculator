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

function multiply(a, b) {
  var result;

  if (b === '') {
    result = a * a;
  } else {
    result = a * b;
  }

  operationResultDecimalPlaces = countDecimalPlaces(a) + countDecimalPlaces(b);
  result = roundResult(result, operationResultDecimalPlaces);

  return result;
}

function divide(a, b) {
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

function roundResult(val, decimalPlaces) {
  var exponentialForm = Number(val + 'e' + decimalPlaces);
  var rounded = Math.round(exponentialForm);
  var result = Number(rounded + 'e-' + decimalPlaces);
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
var operatingNumberString = '';
var operationType = null;
var operationResultString = '';
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
  operatingNumberString = '';
  operationResultString = '';
  calculatorPrimaryText.innerText = '0';
  calculatorState = 'takingBaseNumber';
  takingDecimal = false;
}

function clickEqualsButton() {
  if (operatingNumberString === '') {
    operatingNumberString = baseNumberString;
  }

  operands = convOperandStringsToNumbers();
  operationResult = operate(operands, operationType);
  updateOperationResultAndDisplayText(operationResult);

  calculatorState = 'takingBaseNumber';
  baseNumberString = '';
  takingDecimal = false;
}

function operate(operands, operationType) {
  if (operands["operationResultString"]) {
    return operationType(operands["operationResultString"], operands["operatingNumberString"]);
  } else {
    return operationType(operands["baseNumberString"], operands["operatingNumberString"]);
  }
}

function convOperandStringsToNumbers() {
  return {
    baseNumberString: Number(baseNumberString),
    operatingNumberString: Number(operatingNumberString),
    operationResultString: Number(operationResultString)
  };
}

function updateOperationResultAndDisplayText(result) {
  calculatorPrimaryText.innerText = result;
  operationResultString = result;
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