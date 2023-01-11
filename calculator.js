
const calculator = {
  output: 0,
  x: 0,
  y: null,
  op: '+',

  clear() {
    this.output = 0;
    this.x = 0;
    this.y = null;
    this.op = '+';
  },

  setX(x) { this.x = x; }, 
  setY(y) { this.y = y; },
  setOp(op) { 
    this.op = op; 
    console.log("set op: " + this.op);
  },


  operate() {
    console.log("x y = : " + this.x + " " + this.y);
    console.log("op: " + this.op);
    switch(this.op) {
      case '+':
        this.output = this.add();
        break;
      case '-':
        this.output = this.subtract();
        break;
      case '*':
        this.output = this.multiply();
        break;
      case '/':
        this.output = this.divide();
        break;
    }

    console.log("OUTPUT: " + this.output);
    return this.output;
  },

  add() { return this.x + this.y; },
  subtract() { return this.x - this.y; },
  multiply() { return this.x * this.y; },
  divide() { return this.x / this.y; },
}


/*****************************************************************************/

const number = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ];

const btns = document.getElementsByTagName("button");

console.log("operator: " + calculator.op);

for (const btn of btns)
  btn.onclick = () => handleClick(btn);

let clearOutput = false;
let newInput = false;
let equalPressed = false;

function handleClick(btn) {
  clearButtonColors();
  let btnText = btn.textContent;
  console.log("BTN-TEXT: " + btnText);
  // Button was a number
  if (number[btnText]) {
    newInput = true;
    if (getOutput() === 0)
      setOutput(btnText);
    else if (clearOutput) {
      setOutput(btnText);
      clearOutput = false;
    }
    else
      appendOutput(btnText);
  } else  if (btnText === "clear") {
    setOutput(0);
    clearOutput = false;
    newInput = false;
    calculator.clear();
  } else {
    clearOutput = true;
    compute(btn);
  }
}

function compute(btn) {
  const operator = btn.textContent;
  const num = getOutput();

  if (operator !== '=') {
    btn.style.backgroundColor = "#ACAFBD";
  }

  /*
   Possibilities:
    newInput | equalPressed | '='
       0     |     0        |  0   =
       0     |     0        |  1   = Just do previous operation on the output
       0     |     1        |  0   = Update x, set new op, exit compute()
       0     |     1        |  1   =
       1     |     0        |  0   =
       1     |     0        |  1   =
       1     |     1        |  0   =
       1     |     1        |  1   = 
   */

  if (newInput && equalPressed) {
    calculator.setX(num);
    calculator.setOp(operator);
    return;
  }
  else if (newInput && !equalPressed) {
    calculator.setY(num);
    newInput = false;
  } else if (!newInput && equalPressed && (operator !== '=')) {
    calculator.setX(getOutput);
    calculator.setOp(operator);
    return;
  }

  let z = calculator.operate();
  console.log("z: " + z);
  setOutput(z);

  if (operator !== '=')
    calculator.setOp(operator);
  else
    equalPressed = true;

  calculator.setX(z);
}

function getOutput() { return parseInt(document.getElementById("output").textContent); }
function setOutput(x) { document.getElementById("output").textContent = x; }
function appendOutput(x) { document.getElementById("output").textContent += x; }

function clearButtonColors() {
  for (const btn of btns)
    btn.style.backgroundColor = "#444D70";
}


