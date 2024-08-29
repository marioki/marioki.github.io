console.log("Wordle Clone...");

const playArea = document.querySelector(".play-area");
const letterBoxesElements = document.querySelectorAll(".letter-box");
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
const matrix = generateLetterBoxMatix();
const answer = ["M", "A", "R", "I", "O"];
const dirtyBoxStyle = "dirty";
const closeMatchStyle = "close-match";
const perfectMatchStyle = "perfect-match";

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
    compareGuessToAnswer(matrix[rowIndex], answer);
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

function updateDisplay() {
  for (let i = 0; i < totalRows; i++) {
    for (let j = 0; j < totalColumns; j++) {
      my2DArray[i][j] = {
        letter: "",
        dirty: false,
        perfectMatch: null,
        existsInWord: null,
        borderColor: "green",
      };
      letterCounter++;
    }
  }
}

function generateLetterBoxMatix() {
  letterCounter = 0;
  const my2DArray = [];
  for (let i = 0; i < totalRows; i++) {
    my2DArray[i] = [];
    for (let j = 0; j < totalColumns; j++) {
      my2DArray[i][j] = letterBoxesElements[letterCounter];
      letterCounter++;
    }
  }
  console.log(my2DArray);
  return my2DArray;
}

function deleteLastLetter() {
  if (usedLetters > 0) {
    usedLetters--;
    matrix[rowIndex][usedLetters].innerText = "";
  }
}

function compareGuessToAnswer() {
  let resultByLetter = [];
  let validLettersCache = answer.slice();
  console.log("Values Before Comparison:");
  console.log(`ValidLettersCache: ${validLettersCache}`);
  console.log(`Answer: ${answer}`);

  for (let index = 0; index < totalColumns; index++) {
    console.log("Loop#" + index);
    console.log(`Guess Letter: ${matrix[rowIndex][index].innerText}`);
    console.log(`Answer Letter: ${answer[index]}`);
    if (matrix[rowIndex][index].innerText === answer[index]) {
      console.log(
        `Guess: ${matrix[rowIndex][index].innerText} is Equal to ${answer[index]}`
      );
      resultByLetter.push(perfectMatchStyle);
      let indexToDelete = validLettersCache.indexOf(answer[index]);
      console.log(
        `Deleting Letter: ${answer[index]} on index: ${indexToDelete}`
      );
      validLettersCache.splice(indexToDelete, 1);

      console.log(`Valid Letter Cache after: ${validLettersCache}`);
      console.log(`Answer: ${answer}`);
      console.log("Results" + resultByLetter);
    } else if (validLettersCache.includes(matrix[rowIndex][index].innerText)) {
      console.log(
        `Guess: ${matrix[rowIndex][index].innerText} is included in ${answer}`
      );
      resultByLetter.push(closeMatchStyle);

      let indexToDelete = validLettersCache.indexOf(answer[index]);
      console.log(
        `Deleting Letter: ${answer[index]} on index: ${indexToDelete}`
      );
      validLettersCache.splice(indexToDelete, 1);

      console.log(`Valid Letter Cache after: ${validLettersCache}`);
      console.log("Results" + resultByLetter);
    } else {
      console.log(
        `Guess: ${matrix[rowIndex][index].innerText} Not in word ${answer}`
      );
      resultByLetter.push(dirtyBoxStyle);
      console.log(`Valid Letter Cache after: ${validLettersCache}`);
      console.log("Results" + resultByLetter);
    }
  }

  for (let index = 0; index < totalColumns; index++) {
    matrix[rowIndex][index].setAttribute(
      "class",
      `${matrix[rowIndex][index].className} ${resultByLetter[index]}`
    );
  }
  console.log(`Letter Cache ${validLettersCache}`);
  console.log(`Result By Letter ${resultByLetter}`);
}

letterBoxObj = {
  letter: "",
  dirty: false,
  perfectMatch: null,
  isContained: null,
  borderColor: "green",
};

function validateGuessWord() {}
