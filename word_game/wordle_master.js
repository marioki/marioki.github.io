console.log("Wordle Clone...");

const playArea = document.querySelector(".play-area");
const letterElements = document.querySelectorAll(".letter");
const upperCaseAlphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

let usedLetters = 0;
let rowIndex = 0;
const totalRows = 6;
const totalColumns = 5;
const matrix = generateMatrix();

document.addEventListener("keydown", (keyPressed) =>
  handleKeyboardInput(keyPressed)
);

function handleKeyboardInput(keyPressed) {
  console.log(keyPressed);
  buttonValue = keyPressed["key"].toUpperCase();
  if (upperCaseAlphabet.includes(buttonValue)) {
    handleLetterInputs(buttonValue);
  } else {
    code = keyPressed["code"];
    handleControlInputs(code);
  }
  updateDisplay();
}

function handleLetterInputs(letter) {
  console.log(`Letter: ${letter}`);
  if (usedLetters < 5) {
    matrix[rowIndex][usedLetters].innerText = letter;
    usedLetters++;
  }
}

function handleControlInputs(code) {
  console.log(`Command: ${code}`);
  if (code === "Enter" && usedLetters === 5) {
    //Check if word is valid
    //Look for matches
    moveCursorToNextRow();
  } else if (code === "Backspace") {
    deleteLastLetter();
  }
}

function moveCursorToNextRow() {
  if (rowIndex < totalRows - 1) {
    rowIndex++;
    usedLetters = 0;
  } else {
    console.log("No more rows!");
  }
}

function updateDisplay() {}

function generateMatrix() {
  letterCounter = 0;
  const my2DArray = [];
  for (let i = 0; i < totalRows; i++) {
    my2DArray[i] = [];
    for (let j = 0; j < totalColumns; j++) {
      my2DArray[i][j] = letterElements[letterCounter];
      letterCounter++;
    }
  }
  return my2DArray;
}

function deleteLastLetter() {
  if (usedLetters > 0) {
    usedLetters--;
    matrix[rowIndex][usedLetters].innerText = "";
  }
}
