console.log("Wordle Clone...");

let playArea = document.querySelector(".play-area");
let letterBoxesElements = document.querySelectorAll(".letter-box");

let usedLetters = 0;
let rowIndex = 0;
const totalRows = 6;
const totalColumns = 5;

const dirtyBoxStyle = "dirty";
const closeMatchStyle = "close-match";
const perfectMatchStyle = "perfect-match";
const invalidGuess = "invalid-guess";
const winningArray =
  "perfect-match,perfect-match,perfect-match,perfect-match,perfect-match";

const wordOfTheDayUrl = "https://words.dev-apis.com/word-of-the-day?random=1";
const validateWordUrl = "https://words.dev-apis.com/validate-word";

let answer;
let answerFrequencyMap;
let matrix;

function keyboardListener(event) {
  handleKeyboardInput(event);
}

initializeGame();

async function initializeGame() {
  answer = await getTodaysWord();
  answerFrequencyMap = createLetterFrequencyMap(answer);
  matrix = generateLetterBoxMatix();
  document.addEventListener("keydown", keyboardListener, false);
}

async function getTodaysWord() {
  const response = await fetch(wordOfTheDayUrl);
  const json = await response.json();
  letters = json.word.split("");
  return letters;
}

function handleKeyboardInput(keyPressed) {
  console.log(keyPressed);
  buttonValue = keyPressed["key"];
  if (isLetter(buttonValue)) {
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

function endGame() {
  console.log(`removing listeners`);
  document.removeEventListener("keydown", keyboardListener, false);
  //Show Winner or loser dialog
}

async function handleControlInputs(code) {
  console.log(`Command: ${code}`);
  if (code === "Enter" && usedLetters === 5) {
    const wordIsValid = await validateWordExists(matrix[rowIndex]);
    if (wordIsValid) {
      compareGuessToAnswer(matrix[rowIndex], answer);
      moveCursorToNextRow();
    } else {
      markRowAsInvalid();
    }
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
    endGame();
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

function extractWordFromArray(letterArray) {
  let word = "";
  letterArray.forEach((letter) => {
    word += letter.innerText;
  });
  return word;
}

async function validateWordExists(guessletters) {
  const guesWord = extractWordFromArray(guessletters);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  console.log(`Validating guess word: ${guesWord}`);

  const response = await fetch(validateWordUrl, {
    method: "POST",
    body: JSON.stringify({ word: guesWord }),
    headers: myHeaders,
  });
  jsonObject = await response.json();
  console.log(jsonObject.validWord);
  return jsonObject.validWord;
}

function compareGuessToAnswer() {
  let comparisonResults = [];
  const guess = matrix[rowIndex];

  console.log("Values Before Comparison:");
  console.log(`Answer: ${answer}`);
  logMapValues(answerFrequencyMap);

  comparisonResults = spotPerfectMatches(guess, answer, comparisonResults);
  comparisonResults = spotCloseMatches(guess, answer, comparisonResults);

  paintLetterBoxes(rowIndex, comparisonResults);
}

function paintLetterBoxes(rowIndex, boxStyles) {
  for (let index = 0; index < totalColumns; index++) {
    matrix[rowIndex][index].setAttribute(
      "class",
      `${matrix[rowIndex][index].className} ${boxStyles[index]}`
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

  console.log(
    `Comparison Resul Array in string: ${comparisonResults.toString()}`
  );
  console.log(`Winnig Array in string: ${winningArray}`);
  if (comparisonResults.toString() === winningArray) {
    console.log("You WON!");
    endGame();
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

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function markRowAsInvalid() {
  paintLetterBoxes(rowIndex, [
    invalidGuess,
    invalidGuess,
    invalidGuess,
    invalidGuess,
    invalidGuess,
  ]);
}
