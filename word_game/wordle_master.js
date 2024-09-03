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
const answer = ["C", "A", "L", "M", "A"];
const dirtyBoxStyle = "dirty";
const closeMatchStyle = "close-match";
const perfectMatchStyle = "perfect-match";
let answerFrequencyMap = createLetterFrequencyMap(answer);

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
    answerFrequencyMap = createLetterFrequencyMap(answer);
  } else {
    console.log("No more rows!");
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
  let comparisonResults = [];
  const guess = matrix[rowIndex];

  const answerMap = createLetterFrequencyMap(answer);

  console.log("Values Before Comparison:");
  console.log(`Answer: ${answer}`);
  logMapValues(answerMap);

  comparisonResults = spotPerfectMatches(guess, answer, comparisonResults);
  comparisonResults = spotCloseMatches(guess, answer, comparisonResults);

  for (let index = 0; index < totalColumns; index++) {
    matrix[rowIndex][index].setAttribute(
      "class",
      `${matrix[rowIndex][index].className} ${comparisonResults[index]}`
    );
  }
}

function spotPerfectMatches(guess, answer, comparisonResults) {
  for (let index = 0; index < totalColumns; index++) {
    const guessedLetter = guess[index];
    const answerLetter = answer[index];
    if (guessedLetter.innerText === answerLetter) {
      console.log(
        `Guess: ${guessedLetter.innerText} is Equal to ${answerLetter}`
      );
      comparisonResults.push(perfectMatchStyle);
      let amount = answerFrequencyMap.get(guessedLetter.innerText);
      answerFrequencyMap.set(guessedLetter.innerText, amount - 1);
      logMapValues(answerFrequencyMap);
    } else {
      comparisonResults.push(dirtyBoxStyle);
    }
  }
  return comparisonResults;
}

function spotCloseMatches(guess, answer, comparisonResults) {
  for (let index = 0; index < totalColumns; index++) {
    const guessedLetter = guess[index];
    const answerLetter = answer[index];
    if (answerFrequencyMap.get(guessedLetter.innerText) < 1) {
      console.log(`Letter ${guessedLetter.innerText} Frequency depleted.`);
    } else if (
      guessedLetter.innerText !== answerLetter &&
      answer.includes(guessedLetter.innerText)
    ) {
      console.log(
        `Guess: ${guessedLetter.innerText} is Not Equalt But Contained in  ${answer}`
      );
      comparisonResults[index] = closeMatchStyle;
      let amount = answerFrequencyMap.get(guessedLetter.innerText);
      answerFrequencyMap.set(guessedLetter.innerText, amount - 1);
      logMapValues(answerFrequencyMap);
    }
  }
  return comparisonResults;
}

function createLetterFrequencyMap(lettersList) {
  const frequencyMap = new Map();
  lettersList.forEach((letter) => {
    if (frequencyMap.has(letter)) {
      let amount = frequencyMap.get(letter);
      frequencyMap.set(letter, (amount += 1));
    } else {
      frequencyMap.set(letter, 1);
    }
  });

  return frequencyMap;
}

function logMapValues(map) {
  const keys = map.keys();
  console.log("answerMap Key:Values");
  keys.forEach((key) => {
    console.log(`"${key}": ${map.get(key)}`);
  });
}
