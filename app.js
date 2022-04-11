/* Helper functions */

function roundResult(val, precision) {
  var exponentialForm = Number(val + 'e' + precision);
  var rounded = Math.round(exponentialForm);
  var result = Number(rounded + 'e-' + precision);
  return result;
}

function getExponentialForm(num, exponent) {
  return Number(num + 'e' + exponent);
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

var calculatorPrimaryText = document.getElementById('primary-text');
var calculatorSecondaryText = document.getElementById('secondary-text');
var baseNumberString = '';
var operatingNumberString = '';
var operationType = null;
var calculatorState = 'takingBaseNumber';
var takingDecimal = false;

/* Cartoon number functions */

function setupCartoonNumbers() {
  for (var i = 0; i <= 9; i++) {
    var randomTopValue = Math.random() * 100;
    var randomLeftValue = Math.random() * 100;

    while (randomLeftValue > 33 && randomLeftValue < 65
      || randomLeftValue > 90
      || randomLeftValue < 10) {
      randomLeftValue = Math.random() * 100;
    }

    while (randomTopValue > 90) {
      randomTopValue = Math.random() * 100;
    }

    var randomSign = Math.random() > 0.50 ? '+' : '-';
    var randomRotateValue = Math.random() * (randomSign + 45);
    var cartoonNumber = document.getElementById(`img-${i}`);
    cartoonNumber.style.top = randomTopValue + '%';
    cartoonNumber.style.left = randomLeftValue + '%';
    cartoonNumber.style.transform = `rotate(${randomRotateValue}deg)`;
  }
}

function animateCartoon(number) {
  var cartoonNumber = document.getElementById(`img-${number}`);
  var randomDegrees = Math.random() * 720 + 180;
  var randomDirection = Math.random() > 0.5 ? '+' : '-';
  cartoonNumber.style.transform = `rotate(${randomDirection}${randomDegrees}deg)`;
}

/* Calculator functions */

function clickNumberButton(number) {
  if (calculatorState === 'takingBaseNumber') {
    if (baseNumberString === '0') {
      baseNumberString = '';
    }
    baseNumberString += number;
    calculatorPrimaryText.innerText = baseNumberString;
  }

  if (calculatorState === 'displayingResult') {
    calculatorState = 'takingBaseNumber';
    baseNumberString = '';
    baseNumberString += number;
    calculatorPrimaryText.innerText = baseNumberString;
    takingDecimal = false;
  }
  
  if (calculatorState === 'takingOperatingNumber') {
    operatingNumberString += number;
    calculatorPrimaryText.innerText = operatingNumberString;
  }

  animateCartoon(number);
}

function clickDecimalButton() {
  if (takingDecimal === true) {
    return;
  }
  
  takingDecimal = true;

  if (calculatorState === 'takingBaseNumber') {
    baseNumberString += '.';
    calculatorPrimaryText.innerText = baseNumberString;
  } else if (calculatorState === 'displayingResult') {
    baseNumberString = '0.';
    calculatorPrimaryText.innerText = baseNumberString;
    calculatorState = 'takingBaseNumber';
  } else {
    operatingNumberString += '.';
    calculatorPrimaryText.innerText = operatingNumberString;
  }
}

function clickOperationButton(operation) {
  takingDecimal = false;
  operationType = operation;
  calculatorState = 'takingOperatingNumber';
  operatingNumberString = '';
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
  }

  if (calculatorState === 'takingOperatingNumber') {
    operatingNumberString = '';
  }

  calculatorPrimaryText.innerText = '0';
  takingDecimal = false;
}

function clickClearButton() {
  baseNumberString = '';
  operatingNumberString = '';
  calculatorPrimaryText.innerText = '0';
  calculatorState = 'takingBaseNumber';
  takingDecimal = false;
}

function clickEqualsButton() {
  if (!operationType) {
    return;
  }

  if (operationType === '/' && operatingNumberString === '0') {
    clickClearButton();
    calculatorPrimaryText.innerText = 'Cannot divide by 0';
    return
  }

  if (operatingNumberString === '') {
    operatingNumberString = baseNumberString;
  }

  var baseNumber = Number(baseNumberString);
  var operatingNumber = Number(operatingNumberString);
  operationResult = operate(baseNumber, operatingNumber, operationType);
  calculatorPrimaryText.innerText = operationResult;

  calculatorState = 'displayingResult';
  baseNumberString = operationResult;
  takingDecimal = false;
}

function operate(baseNumber, operatingNumber, operation) {
  var baseNumberDecimalPlaces = countDecimalPlaces(baseNumber);
  var operatingNumberDecimalPlaces = countDecimalPlaces(operatingNumber);
  var exponent = baseNumberDecimalPlaces + operatingNumberDecimalPlaces;

  var operations = {
    '+': roundResult(baseNumber + operatingNumber, exponent),
    '-': roundResult(baseNumber - operatingNumber, exponent),
    '*': roundResult(baseNumber * operatingNumber, exponent),
    '/': getExponentialForm(baseNumber, exponent) / getExponentialForm(operatingNumber, exponent)
  };
    
  var result = operations[operation];
  return result;
}

/* Event listeners */

function setupEventListeners() {
  var calculatorButtons = document.getElementById('calculator-btns-container');

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
      add: '+',
      subtract: '-',
      multiply: '*',
      divide: '/'
    };

    if (targetId in operationButtons) {
      return clickOperationButton(operationButtons[targetId]);
    } else {
      return buttons[targetId](targetId);
    }
  });
}

setupEventListeners();
setupCartoonNumbers();