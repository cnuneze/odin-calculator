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

// Events
const numberButtons = document.querySelectorAll('.btn-number');
const operationButtons = document.querySelectorAll('.btn-operation')

numberButtons.forEach(button => {
  button.addEventListener('click', event => {
    const display = document.querySelector('.operation-text');
    const valueButton = button.value;
    if (display.classList.contains('clear')) {
      display.textContent = '';
      display.classList.remove('clear');
    }

    if (valueButton === ".") {

      if (display.classList.contains('decimal')) return true;

      display.classList.add('decimal');
    }

    display.textContent += valueButton;
  })
});

operationButtons.forEach(button => {
  button.addEventListener('click', event => {
    const display = document.querySelector('.operation-text');

    if (
      display.classList.contains('clear') || 
      display.classList.contains('second-operand')
    ) return true;

    const valueButton = button.value;

    display.textContent += ` ${valueButton}`;
    display.classList.add('second-operand');
  });
});