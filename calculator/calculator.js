console.log(" myCalculator")

const buttonGrid = document.querySelector(".calculator-button-grid");
const validDigits = "0123456789";
const validOperations = "+-÷x";
const equalSign = "=";
const deletionCommands = "cd";
const resetCalculatorButton = "C";
const backSpaceButton = "D";

const inputField = document.querySelector("input");

let num1 = null;
let num2 = null;
let operationCache = null;
let upcomingOperation = null;

calculatorDisplay(0);
logWorkingMemory("Calculator Start up...");

buttonGrid.addEventListener("click", (event) => {
    if (validDigits.includes(event.target.innerText)) {
        //Number Button Pressed
        if (upcomingOperation != null) {
            calculatorDisplay(event.target.innerText);
            operationCache = upcomingOperation;
            upcomingOperation = null;
        } else if (inputField.value == 0) {
            calculatorDisplay(event.target.innerText);
        } else {
            calculatorDisplay(inputField.value + event.target.innerText)
        }
        logWorkingMemory(`${event.target.innerText} Button Pressed`);
    } else if (validOperations.includes(event.target.innerText)) {
        //Operation Button Pressed
        if (upcomingOperation != null) {
            upcomingOperation = event.target.innerText;
        } else {
            upcomingOperation = event.target.innerText;

            if (num1 == null) {
                num1 = inputField.value;
            } else {
                num2 = inputField.value;
                performOperation(operationCache, num1, num2);
            }
        }
        logWorkingMemory(`${event.target.innerText} Button Pressed`);



    } else if (event.target.innerText == equalSign) {
        if (operationCache != null) {
            num2 = inputField.value;
            performOperation(operationCache, num1, num2);
        } else {
            console.log("No operation to perform...");
        }
        logWorkingMemory(`${event.target.innerText} Button Pressed`);

    } else if (event.target.innerText == backSpaceButton) {
        if (inputField.value.length > 1) {
            inputField.value = inputField.value.slice(0, -1);
        } else {
            calculatorDisplay(0);
        }
        logWorkingMemory(`${event.target.innerText} Button Pressed`);
    } else if (event.target.innerText == resetCalculatorButton) {
        resetCalculator();
        logWorkingMemory(`${event.target.innerText} Button Pressed`);
    }
})


function performOperation(operation, num1, num2) {
    let result = 0;
    let number1 = parseInt(num1);
    let number2 = parseInt(num2);
    if (operation == "+") {
        result = number1 + number2;
    } else if (operation == "-") {
        result = number1 - number2;
    } else if (operation == "x") {
        result = number1 * number2;
    } else if (operation == "÷") {
        result = number1 / number2;
    }
    calculatorDisplay(result);
    clearOperationMemory();
    return result;
}

function clearOperationMemory() {
    if (upcomingOperation != null) {
        num1 = inputField.value;
        num2 = null;
        operationCache = null;
    } else {
        num1 = null;
        num2 = null;
        operationCache = null;
    }

}

function resetCalculator() {
    num1 = null;
    num2 = null;
    operationCache = null;
    calculatorDisplay(0);
}

function calculatorDisplay(numberToDisplay) {
    inputField.value = numberToDisplay;
}

function logWorkingMemory(event) {
    console.log(`\nEvent:${event}
Calculator Display:${inputField.value}
num1: ${num1}
num2: ${num2}
OperationCache:${operationCache}
UpcomingOperation:${upcomingOperation}`);
};
