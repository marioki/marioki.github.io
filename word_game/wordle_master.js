console.log("Wordle Clone...")

const playArea = document.querySelector(".play-area");
const matrixDisplay = document.querySelectorAll(".letter-row");
const letterElements = document.querySelectorAll(".letter-display");
let letterElementsMatrix;
const upperCaseAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const totalRows = 6;
const totalColumns = 5;
let cursorRowPosition = 0;
let cursorColumnPosition = 0;


const matrix = [[], [], [], [], [], [],];

console.log(matrix);
console.log(matrix);
console.log(matrixDisplay);
console.log(letterElements);

generateLetterElementMatrix();

document.addEventListener("keydown", (keyPressed) => handleKeyboardInput(keyPressed));


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
    if (matrix[cursorRowPosition].length < totalColumns) {
        matrix[cursorRowPosition].push(letter);

    } else {
        console.log("No More Space, press enter");
    }
    console.log(matrix);

}

function handleControlInputs(code) {
    console.log(`Command: ${code}`);
    if (code === "Enter") {
        cursorRowPosition++;
    }
}

function generateLetterElementMatrix() {
    let rowIndex = 0;
    let columnIndex = 0;
    let elementCounter = 0;
    for (rowIndex; rowIndex < totalRows; rowIndex++) {

        for (columnIndex; columnIndex < totalColumns; columnIndex++) {
            letterElementsMatrix[rowIndex][columnIndex].push = letterElements[elementCounter];
            elementCounter++;
        }

    }
    console.log(letterElementsMatrix);
}

function updateDisplay() {
    for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < matrix[cursorRowPosition].length; columnIndex++) {

        }
    }

}