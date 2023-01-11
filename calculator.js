
const calculator = {
  output: 0,
  x: 0,
  y: null,
  op: null,

  clear() {
    this.output = 0;
    this.x = 0;
    this.y = null;
    this.op = null;
  },

  setX(x) { this.x = x; }, 
  setY(y) { this.y = y; },
  setOp(op) { 
    this.op = op; 
    console.log('set op: ' + this.op);
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

for (const btn of btns)
  btn.onclick = () => handleClick(btn.textContent);

let clearOutput = false;

function handleClick(btnText) {
  console.log("BTN-TEXT: " + btnText);
  // Button was a number
  if (number[btnText]) {
    if (getOutput() === "0")
      setOutput(btnText);
    else if (clearOutput) {
      setOutput(btnText);
      clearOutput = false;
    }
    else
      appendOutput(btnText);
  } else  if (btnText === "clear") {
    console.log("CLEAR");
    setOutput(0);
    calculator.clear();
    opPressed = false;
    calculator.clear();
  } else if (btnText === "=") {
    const num = parseInt(getOutput());
    compute(num);
  } else {
    clearOutput = true;
    calculator.setX(parseInt(getOutput()));
    calculator.setOp(btnText);
  }
}

function compute(num) {
  calculator.setY(num);
  let z = calculator.operate();
  console.log("z: " + z);
  setOutput(z);
}

function getOutput() { return document.getElementById("output").textContent; }
function setOutput(x) { document.getElementById("output").textContent = x; }
function appendOutput(x) { document.getElementById("output").textContent += x; }

