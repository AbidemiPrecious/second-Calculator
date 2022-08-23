Resultzz = document.getElementById("results");
const calculator = {
  displayValue: "0",
  firstOperand: null,
  SecondOperand: false,
  operator: null,
};
function del(){
 calculator.displayValue = calculator.displayValue.slice(0, calculator.displayValue.length - 1);
}

function inputDigit(digit) {
  const { displayValue, SecondOperand } = calculator;
  if (SecondOperand === true) {
    calculator.displayValue = digit;
    calculator.SecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
}
function inputDecimal(dot) {
  if (calculator.SecondOperand === true) {
    calculator.displayValue = "0.";
    calculator.SecondOperand = false;
    return;
  }

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}
function inputSine() {
  const {displayValue} = calculator;
  sinValue = parseFloat(displayValue)
  calculator.displayValue = Math.sin(sinValue).toFixed(5);
  return
}
function inputCosine() {
    const { displayValue } = calculator;
    cosValue = parseFloat(displayValue);
    calculator.displayValue = Math.cos(cosValue).toFixed(5);
    return;
    // Math.cos(cosValue);
}
function inputTangent() {
    const { displayValue } = calculator;
    tanValue = parseFloat(displayValue);
    calculator.displayValue = Math.tan(tanValue).toFixed(5);
    return;
}
function power(){
  const { displayValue } = calculator;
  powValue = parseFloat(displayValue);
  calculator.displayValue = Math.pow(displayValue, 2);
}
function power1(){
  const { displayValue } = calculator;
  powValue = parseFloat(displayValue);
  calculator.displayValue = Math.pow(displayValue, -1).toFixed(10);
}
function percent(){
  const { displayValue } = calculator;
  percentValue = parseFloat(displayValue);
  calculator.displayValue = displayValue / 100;
}
function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.SecondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.SecondOperand = true;
  calculator.operator = nextOperator;
}
function calculate(firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "*") {
    return firstOperand * secondOperand;
  } else if (operator === "/") {
    return firstOperand / secondOperand;
  }
  return secondOperand;
}


function displayUpdate(){
    const display = document.querySelector(".top-container");
    display.value =calculator.displayValue;
}
displayUpdate();

const keys = document.querySelector(".keys-container");
keys.addEventListener("click", (event) => {
  const { target } = event;
  const { value } = target;
  if (!target.matches("button")) {
    return;
  }
  switch (value) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
      handleOperator(value);
      break;
    case ".":
      inputDecimal(value);
      break;
    case "sin":
      inputSine();
      break;
    case "cos":
      inputCosine(value);
      break;
    case "tan":
      inputTangent(value);
      break;
    case "pow2":
      power();
      break;
    case "pow1":
      power1();
      break;
    case "percent":
      percent();
      break;
    case "del":
      del(value);
      break;
    default:
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }

  displayUpdate();
});


 