console.log("there")
// Calculator Logic
const calculator = {
  firstOperand: null,
  secondOperand: null,
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
    try {

      if (this.secondOperand == 0) {
        throw "Nani!";
      }

      return this.firstOperand / this.secondOperand;
    } catch (message) {
      return message;
    }
  },
}

// Display Logic
const display = {
  maxValue: 9999999999,
  maxLength: 10,
  resetInput: true,
  secondOperandMode: false,
  enableDecimal: true,
  screen: document.querySelector('.operation-text'),
  hasOperation: function () {
    return !(calculator.operation === null);
  },
  reset: function() {
    this.secondOperandMode = false,
    this.resetInput = true;
    this.enableDecimal = true;
  },
  clear: function() {
    this.reset();
    calculator.operation = null;
    calculator.firstOperand = null;
    calculator.secondOperand = null;
    this.screen.textContent = "0";
  },
  write: function(text, reset = false) {
    if (this.resetInput) {
      this.screen.textContent = "";
      this.resetInput = reset;
    }
    this.screen.append(text);
  },
  showResult: function() {
    // TODO: validate status of operands before operate
    if (!display.hasOperation() || display.resetInput) return true;
  
    calculator.secondOperand = parseInt(display.screen.textContent);

    let result = calculator.operate();
    let outputResult = getOutputResult(result, this.maxLength);
    
    this.resetInput = true;
    this.write(outputResult, true);

    calculator.firstOperand = parseInt(display.screen.textContent);
    this.reset();

    function getOutputResult(result, maxLength) {
      
      if (result > this.maxValue) return this.maxValue;

      let isDecimal = ((`${result}`).split('.')[1] !== undefined);
      if (!isDecimal) return result;
      
      let resultLength = ((`${result}`).length - 1);
      if (resultLength < maxLength) return result; 

      let resultFormatted = (`${result}`).substring(0, maxLength);
      return resultFormatted;
    }
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

    if (display.resetInput && calculator.firstOperand != null) {
      display.secondOperandMode = true;
    }

    if (valueButton === ".") {

      if (!display.enableDecimal) return true;

      display.enableDecimal = false;
    }

    display.write(valueButton);
  })
});

operationButtons.forEach(button => {
  button.addEventListener('click', event => {

    if (!display.resetInput) {
      if (display.secondOperandMode ) {
        display.secondOperandMode = false;
        display.showResult();
      } else {
        calculator.firstOperand = parseInt(display.screen.textContent);
        display.reset();
      }  
    }

    const valueButton = button.value;
    calculator.operation = valueButton;
    
  });
});

totalButton.addEventListener('click', event => {
  display.showResult();
});

clearButton.addEventListener('click', event => display.clear());