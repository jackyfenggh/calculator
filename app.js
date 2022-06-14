var calculatorPrimaryText = document.getElementById('primary-text');
var calculatorSecondaryText = document.getElementById('secondary-text');
var baseNumberString = '0';
var operatingNumberString = '';
var operationType = null;
var calculatorState = 'takingBaseNumber';
var takingDecimal = false;

/* Helper functions */

function roundResult(val, precision) {
  var exponentialForm = Number(val + 'e' + precision);
  var rounded = Math.round(exponentialForm);
  var result = Number(rounded + 'e-' + precision);
  return result;
}

function getExponentialForm(val, exponent) {
  return Number(val + 'e' + exponent);
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

function valIsTooLong(val) {
  if (Number(val)) {
    val = val.toString();
  }

  if (val.length > 17) {
    return true;
  }
}

function removeExcessChars(val) {
  if (val.length > 17) {
    val = val.slice(0, 17);
    if (val.charAt(val.length - 1) === '.') {
      val = val.slice(0, val.length - 1);
    }

    return val;
  }

  return val;
}

/* Cartoon number functions */

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
    calculatorSecondaryText.innerText = '';
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

  calculatorSecondaryText.innerText = baseNumberString + ' ' + operationType;
}

function clickDeleteButton() {
  if (calculatorState === 'takingBaseNumber') {
    baseNumberString = baseNumberString.replace(baseNumberString[baseNumberString.length - 1], '');
    calculatorPrimaryText.innerText = baseNumberString;
  }

  if (calculatorState === 'takingOperatingNumber') {
    operatingNumberString = operatingNumberString.replace(operatingNumberString[operatingNumberString.length - 1], '');
    calculatorPrimaryText.innerText = operatingNumberString;
  }

  if (calculatorState === 'displayingResult') {
    clickClearButton();
  }
}

function clickClearEntryButton() {
  if (calculatorState === 'displayingResult') {
    calculatorState = 'takingBaseNumber';
    calculatorSecondaryText.innerText = '';
  }

  if (calculatorState === 'takingBaseNumber') {
    baseNumberString = '0';
  }

  if (calculatorState === 'takingOperatingNumber') {
    operatingNumberString = '0';
  }

  calculatorPrimaryText.innerText = '0';
  takingDecimal = false;
}

function clickClearButton() {
  baseNumberString = '';
  operatingNumberString = '';
  operationType = null;
  calculatorPrimaryText.innerText = '0';
  calculatorSecondaryText.innerText = '';
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
    return;
  }

  if (operatingNumberString === '') {
    operatingNumberString = baseNumberString;
  }

  var baseNumber = Number(baseNumberString);
  var operatingNumber = Number(operatingNumberString);
  operationResult = operate(baseNumber, operatingNumber, operationType);

  if (valIsTooLong(operationResult)) {
    alert('This calculator isn\'t advanced enough to calculate and display numbers bigger than 17 digits');
    return;
  }

  calculatorPrimaryText.innerText = operationResult;
  calculatorSecondaryText.innerText = baseNumberString + ' ' + operationType + ' ' + operatingNumberString + ' =';

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

  var operationButtons = {
    add: '+',
    subtract: '-',
    multiply: '*',
    divide: '/'
  };

  var otherButtons = {
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

  calculatorButtons.addEventListener('click', function(e) {
    var targetId = e.target.id.split('-')[1];;

    if (targetId in operationButtons) {
      clickOperationButton(operationButtons[targetId]);
    } else {
      otherButtons[targetId](targetId);
    }

    document.activeElement.blur();
  });

  document.addEventListener('keydown', function(e) {
    var keystroke = e.which;

    const KEYSTROKES = {
      normalKeystrokes: {
        48: 0,
        96: 0,
        49: 1,
        97: 1,
        50: 2,
        98: 2,
        51: 3,
        99: 3,
        52: 4,
        100: 4,
        53: 5,
        101: 5,
        54: 6,
        102: 6,
        55: 7,
        103: 7,
        56: 8,
        104: 8,
        57: 9,
        105: 9,
        13: 'equals',
        187: 'equals',
        8: 'delete',
        190: 'decimal'
      },
      operationKeystrokes: {
        107: '+',
        109: '-',
        189: '-',
        106: '*',
        111: '/',
        191: '/'
      },
      shiftKeystrokes: {
        187: '+',
        56: '*'
      }
    };

    var shiftKey = e.shiftKey;
    var { normalKeystrokes, operationKeystrokes, shiftKeystrokes } = KEYSTROKES;
    var key;

    if (shiftKey === true && keystroke in shiftKeystrokes) {
      key = shiftKeystrokes[keystroke];
      return clickOperationButton(key);
    } 
    
    if (keystroke in normalKeystrokes) {
      key = normalKeystrokes[keystroke];
      return otherButtons[key](key);
    }
  
    if (keystroke in operationKeystrokes) {
      key = operationKeystrokes[keystroke];
      return clickOperationButton(key);
    }

    document.activeElement.blur();
  });
}

setupEventListeners();