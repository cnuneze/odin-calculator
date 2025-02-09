console.log("there")
// Calculator Logic
const calculator = {
  firstOperand: 0,
  secondOperand: 0,
  operation: '',
  operate: function() {
    switch (this.operation) {
      case '+':
        return this.addition();

      case '-':
        return this.subtraction();

      case '*':
        return this.multiplication();

      case '/':
        return this.division();

      default:
        return 0;

    }
  },
  addition: function() {
    return this.firstOperand + this.secondOperand;
  },
  subtraction: function() {
    return this.firstOperand - this.secondOperand;
  },
  multiplication: function() {
    return this.firstOperand * this.secondOperand;
  },
  division: function() {
    return this.firstOperand / this.secondOperand;
  },
}

const display = {
  isClear: true,
  waitingOperand: false,
  hasOperation: false,
  enableDecimal: true,
  screen: document.querySelector('.operation-text'),
  clear: function(){
    this.isClear = true;
    this.waitingOperand;
    this.hasOperation = false;
    this.enableDecimal = true;
    this.screen.textContent = "";
  },
}
// Events
const numberButtons = document.querySelectorAll('.btn-number');
const operationButtons = document.querySelectorAll('.btn-operation');
const totalButton = document.querySelector('.btn-total');
const clearButton = document.querySelector('.btn-clear');

numberButtons.forEach(button => {
  button.addEventListener('click', event => {
    const valueButton = button.value;

    if (display.isClear) {
      display.screen.textContent = '';
      display.isClear = false;
    }

    if (display.waitingOperand) {
      display.screen.textContent += ' ';
      display.waitingOperand = false;
      display.enableDecimal = true;
    }

    if (valueButton === ".") {

      if (!display.enableDecimal) return true;

      display.enableDecimal = false;
    }

    display.screen.textContent += valueButton;
  })
});

operationButtons.forEach(button => {
  button.addEventListener('click', event => {

    if ( display.isClear || display.waitingOperand) return true;

    const valueButton = button.value;
  
    calculator.firstOperand = parseInt(document.querySelector('.operation-text').textContent);
    calculator.operation = valueButton;

    display.screen.textContent += ` ${valueButton}`;
    display.waitingOperand = true;
    display.hasOperation = true;
  });
});

totalButton.addEventListener('click', (event) => {
  // TODO: validate status of operands before operate
  if (!display.hasOperation && display.waitingOperand) return true;

  let operation = display.screen.textContent.split(' ');
  
  calculator.secondOperand = parseInt(operation[2]);

  let result = calculator.operate();

  display.screen.textContent += ` = ${result}`;
});

clearButton.addEventListener('click', event => display.clear());