console.log("Wordle Clone...");

let playArea = document.querySelector(".play-area");
let letterBoxesElements = document.querySelectorAll(".letter-box");
let loadingIndicator = document.querySelector(".loading-indicator");

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

initializeGame();

function keyboardListener(event) {
  handleKeyboardInput(event);
}

function showLoadingIndicator() {
  loadingIndicator.style.display = "flex";
}
function hideLoadingIndicator() {
  loadingIndicator.style.display = "none";
}

async function initializeGame() {
  answer = await getTodaysWord();
  answerFrequencyMap = createLetterFrequencyMap(answer);
  matrix = generateLetterBoxMatix();
  attachEventListeners();
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

async function handleControlInputs(code) {
  console.log(`Command: ${code}`);
  if (code === "Enter" && usedLetters === 5) {
    removeEventListeners();
    showLoadingIndicator();
    const wordIsValid = await validateWordExists(matrix[rowIndex]);
    if (wordIsValid) {
      const comparisonResults = compareGuessToAnswer(matrix[rowIndex], answer);
      paintLetterBoxes(rowIndex, comparisonResults);

      if (comparisonResults.toString() === winningArray) {
        console.log("You WON!");
        endGame(true);
      } else if (rowIndex < totalRows - 1) {
        moveCursorToNextRow();
        attachEventListeners();
      } else {
        endGame();
      }
    } else {
      markRowAsInvalid();
      attachEventListeners();
    }
    hideLoadingIndicator();
  } else if (code === "Backspace") {
    deleteLastLetter();
  }
}

function moveCursorToNextRow() {
  console.log(`moveCursorToNextRow() executed.`);
  if (rowIndex < totalRows - 1) {
    rowIndex++;
    usedLetters = 0;
    answerFrequencyMap = createLetterFrequencyMap(answer);
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

  return comparisonResults;
}

function paintLetterBoxes(rowIndex, boxStyles) {
  console.log(`Painting Letter Boxes...`);
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
  const keys = Array.from(map.keys());
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

function endGame(userWon) {
  // Use a minimal delay to allow the DOM to update
  setTimeout(() => {
    if (userWon) {
      alert("Congrats🎉! You won!");
    } else {
      alert(`Whoops😅, the word was: ${answer}`);
    }
  }, 100);
  removeEventListeners();
}

function removeEventListeners() {
  console.log(`removing listeners`);
  document.removeEventListener("keydown", keyboardListener, false);
}

function attachEventListeners() {
  console.log(`attaching Event Listeners`);
  document.addEventListener("keydown", keyboardListener, false);
}
