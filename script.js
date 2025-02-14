console.log("there")
// Calculator Logic
const calculator = {
  firstOperand: 0,
  secondOperand: 0,
  operation: null,
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

// Display Logic
const display = {
  resetInput: true,
  enableDecimal: true,
  screen: document.querySelector('.operation-text'),
  hasOperation: function () {
    return !(this.operation === null);
  },
  clear: function() {
    this.resetInput = true;
    this.hasOperation = false;
    this.enableDecimal = true;
    this.screen.textContent = "0";
  },
  write: function(char) {
    if (this.resetInput) {
      this.screen.textContent = "";
      this.resetInput = false;
    }
    this.screen.append(char);
  }
}

// Events
const numberButtons = document.querySelectorAll('.btn-number');
const operationButtons = document.querySelectorAll('.btn-operation');
const totalButton = document.querySelector('.btn-total');
const clearButton = document.querySelector('.btn-clear');

numberButtons.forEach(button => {
  button.addEventListener('click', event => {
    const valueButton = button.value;

    if (valueButton === ".") {

      if (!display.enableDecimal) return true;

      display.enableDecimal = false;
    }

    display.write(valueButton);
  })
});

operationButtons.forEach(button => {
  button.addEventListener('click', event => {

    if ( display.resetInput) return true;

    const valueButton = button.value;
  
    calculator.firstOperand = parseInt(document.querySelector('.operation-text').textContent);
    calculator.operation = valueButton;
    display.resetInput = true;
  });
});

totalButton.addEventListener('click', (event) => {
  // TODO: validate status of operands before operate
  if (!display.hasOperation() || display.resetInput) return true;
  
  calculator.secondOperand = parseInt(document.querySelector('.operation-text').textContent);

  let result = calculator.operate();

  display.screen.textContent = result;
});

clearButton.addEventListener('click', event => display.clear());