const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let firstValue = null;
let operator = null;
let awaitingNextValue = false;

const performAddition = () => {
  const secondValue = parseFloat(display.value);
  display.value = firstValue + secondValue;
  firstValue = null;
  operator = null;
  awaitingNextValue = false;
};

const performSubtraction = () => {
  const secondValue = parseFloat(display.value);
  display.value = firstValue - secondValue;
  firstValue = null;
  operator = null;
  awaitingNextValue = false;
};

const performMultiplication = () => {
  const secondValue = parseFloat(display.value);
  display.value = firstValue * secondValue;
  firstValue = null;
  operator = null;
  awaitingNextValue = false;
};

const performDivision = () => {
  const secondValue = parseFloat(display.value);
  display.value = firstValue / secondValue;
  firstValue = null;
  operator = null;
  awaitingNextValue = false;
};

const performCalculation = () => {
  if (operator === '+') {
    performAddition();
  } else if (operator === '-') {
    performSubtraction();
  } else if (operator === '*') {
    performMultiplication();
  } else if (operator === '÷') {
    performDivision();
  }
};

const handleValue = (value) => {
  if (display.value.length >= 10) {
    return;
  }

  if (awaitingNextValue) {
    clearDisplay();
    awaitingNextValue = false;
  }

  if (value === '.') {
    if (display.value.includes('.')) {
      return;
    }
  }

  display.value += value;
};
const handleOperator = (value) => {
  if (firstValue === null) {
    firstValue = parseFloat(display.value);
  }

  if (operator !== null && display.value === '') {
    display.value = '0';
    return;
  }

  operator = value;
  display.value = '';
  awaitingNextValue = true;
};

const clearDisplay = () => {
  display.value = '';
};

const removeLastDigit = () => {
  display.value = display.value.slice(0, -1);
};

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const value = e.target.innerText;
  
      if (value === 'C') {
        clearDisplay();
        firstValue = null;
        operator = null;
        awaitingNextValue = false;
      } else if (value === 'CE') {
        clearDisplay();
      } else if (value === '+' || value === '-' || value === '*' || value === '÷') {
        if (operator) {
          display.value = '0';
        }
        handleOperator(value);
      } else if (value === '=') {
        performCalculation();
        if (display.value.length > 10) {
          display.value = parseFloat(display.value).toPrecision(10);
        }
      } else if (value === 'X') {
        display.value = display.value.slice(0, -1);
      } else {
        handleValue(value);
      }
    });
  });
