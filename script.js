console.log("there")
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