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

  if (operationResultDecimalPlaces > 0 
      && result.charAt(result.length - 1) === '0') {
        result = removeTrailingDecimalZeroes(result);
  }

  return result;
}

function divide(a, b, decimalPlacesA, decimalPlacesB) {
  var result;
  if (decimalPlacesA !== 0 || decimalPlacesB !== 0) {
    var multiplier = decimalPlacesA > decimalPlacesB ? decimalPlacesA : decimalPlacesB;
  }

  if (b === '') {
    result = (a + 'e' + multiplier) / (a + 'e' + multiplier);
  } else {
    result = (a + 'e' + multiplier) / (b + 'e' + multiplier);
  }

  result = Number(result).toString();

  // if (b === '') {
  //   result = a / a;
  // } else {
  //   result = a / b;  
  // }

  // operationResultDecimalPlaces = countDecimalPlaces(result);
  // result = toFixed(result, operationResultDecimalPlaces);

  // if (operationResultDecimalPlaces > 0 
  //     && result.charAt(result.length - 1) === '0') {
  //       result = removeTrailingDecimalZeroes(result);
  // }


  if (operationResultDecimalPlaces > 0 
      && result.charAt(result.length - 1) === '0') {
        result = removeTrailingDecimalZeroes(result);
  }

  return result;
}

/* Helper functions */

function removeTrailingDecimalZeroes(val) {
  while (val.charAt(val.length - 1) === '0') {
    val = val.slice(0, val.length - 1);
  }
  if (val.charAt(val.length - 1) === '.') {
    val = val.slice(0, val.length - 1)
  }
  takingDecimal = false;
  return val;
}

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
    operationResultString = '';
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

// function updateDecimalPlaces() {
//   if (calculatorState === 'takingBaseNumber') {
//     baseNumberDecimalPlaces++;
//   }

//   if (calculatorState === 'takingOperatingNumber') {
//     operatingNumberDecimalPlaces++;
//   }
// }

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
    operationResultString = '';
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
  operationResultString = '';
  calculatorDisplayText.innerText = '0';
  calculatorState = 'takingBaseNumber';
  takingDecimal = false;
}

function updateOperationResultAndDisplayText(operationType) {
  var baseNumber, operationNumber, operationResult;
  baseNumberDecimalPlaces = countDecimalPlaces(baseNumberString);
  operatingNumberDecimalPlaces = countDecimalPlaces(operatingNumberString);
  operationResultDecimalPlaces = countDecimalPlaces(operationResultString);

  // if (baseNumberDecimalPlaces > 0) {
  if (baseNumberDecimalPlaces > 0) {
    baseNumber = parseFloat(baseNumberString);
  } else {
    baseNumber = parseInt(baseNumberString);
  }

  // if (operatingNumberDecimalPlaces > 0) {
  if (operatingNumberDecimalPlaces > 0) {
    operationNumber = parseFloat(operatingNumberString);
  } else {
    operationNumber = parseInt(operatingNumberString);
  }

  // if (operationResultDecimalPlaces > 0) {
  if (operationResultDecimalPlaces > 0) {
    operationResult = parseFloat(operationResultString);
  } else {
    operationResult = parseInt(operationResultString);
  }

  if (Number(operationResultString)) {
    calculatorDisplayText.innerText = operationType(operationResult, operationNumber, operationResultDecimalPlaces, operatingNumberDecimalPlaces);
    operationResultString = calculatorDisplayText.innerText;
  } else {
    calculatorDisplayText.innerText = operationType(baseNumber, operationNumber, baseNumberDecimalPlaces, operatingNumberDecimalPlaces);
    operationResultString = calculatorDisplayText.innerText;
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
          //updateDecimalPlaces();
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