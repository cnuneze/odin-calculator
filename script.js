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
const operationButtons = document.querySelectorAll('.btn-operation');
const totalButton = document.querySelector('.btn-total');

numberButtons.forEach(button => {
  button.addEventListener('click', event => {
    const display = document.querySelector('.operation-text');
    const valueButton = button.value;
    const displayClass = display.classList;

    if (displayClass.contains('clear')) {
      display.textContent = '';
      displayClass.remove('clear');
    }

    if (displayClass.contains('second-operand')) {
      display.textContent += ' ';
      displayClass.remove('decimal', 'second-operand');
    }

    if (valueButton === ".") {

      if (displayClass.contains('decimal')) return true;

      displayClass.add('decimal');
    }

    display.textContent += valueButton;
  })
});

operationButtons.forEach(button => {
  button.addEventListener('click', event => {
    const display = document.querySelector('.operation-text');

    if (
      display.classList.contains('clear') || 
      display.classList.contains('operation')
    ) return true;

    const valueButton = button.value;
  
    calculator.firstOperand = parseInt(document.querySelector('.operation-text').textContent);
    calculator.operation = valueButton;

    display.textContent += ` ${valueButton}`;
    display.classList.add('operation', 'second-operand');
  });
});

totalButton.addEventListener('click', (event) => {
  // TODO: validate status of operands before operate

  const display = document.querySelector('.operation-text');
  let operation = display.textContent.split(' ');
  calculator.secondOperand = operation[2];

  let result = calculator.operate();

  display.textContent += ` = ${result}`;
});