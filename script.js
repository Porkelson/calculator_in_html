let calculation = "";
let history = "";

// Event listeners for key events
document.addEventListener("keydown", handleKeyPress);
document.addEventListener("keyup", handleKeyUp);

function handleKeyPress(event) {
  const key = event.key;
  const button = getButtonByKey(key);

  if (button) {
    highlightButton(button);
  }

  handleKeyAction(key);
}

function handleKeyUp(event) {
  const key = event.key;
  const button = getButtonByKey(key);

  if (button) {
    removeHighlight(button);
  }
}

function handleKeyAction(key) {
  switch (key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "+":
    case "-":
    case "*":
    case "/":
    case ".":
    case "=":
    case ",":
      appendToCalculation(key);
      break;
    case "Enter":
      calculateResult();
      break;
    case "Backspace":
      removeLastSymbol();
      break;
    case "Escape":
    case "c":
      clearCalculation();
      break;
    default:
      break; // Handle other keys if needed
  }
}

function getButtonByKey(key) {
  return document.querySelector(`button[data-key="${key}"]`);
}

function printCalc() {
  console.log(calculation);
}

function updateScreen() {
  const calc_c = document.getElementById("c");
  calc_c.innerHTML = calculation;
}

function appendToCalculation(value) {
  if (value === "/" && calculation.endsWith("/")) return;
  if (value === "*" && calculation.endsWith("*")) return;
  if (value === "." && calculation.endsWith(".")) return;
  if (value === "0" && calculation === "0") return;
  if (value === "," && calculation.endsWith(",")) return;

  if (value === ",") {
    calculation += ".";
  } else {
    calculation += value;
  }
  updateScreen();
}

function removeLastSymbol() {
  calculation = calculation.slice(0, -1);
  updateScreen();
}

function clearCalculation() {
  calculation = "";
  updateScreen();
}

function calculateResult() {
  try {
    const result = eval(calculation);
    if (isNaN(result) || !isFinite(result)) {
      throw new Error("Invalid calculation");
    }
    calculation = result.toString();
    updateScreen();
  } catch (error) {
    console.error(error);
    alert("Error: " + error.message);
    clearCalculation();
  }
}

function highlightButton(button) {
  button.classList.add("highlight");
}

function removeHighlight(button) {
  button.classList.remove("highlight");
}

function blurButton(button) {
  button.blur();
}
