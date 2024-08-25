console.log(" myCalculator")

const buttonGrid = document.querySelector(".calculator-button-grid");
const validDigits = "0123456789";
const validOperations = "+-÷x";
const equalSign = "=";
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
    const buttonPressed = event.target.innerText;
    if (validDigits.includes(buttonPressed)) {
        //Number Button Pressed
        if (upcomingOperation != null) {
            calculatorDisplay(buttonPressed);
            operationCache = upcomingOperation;
            upcomingOperation = null;
        } else if (inputField.value == 0) {
            calculatorDisplay(buttonPressed);
        } else {
            calculatorDisplay(inputField.value + buttonPressed)
        }
        logWorkingMemory(`${buttonPressed} Button Pressed`);
    } else if (validOperations.includes(buttonPressed)) {
        //Operation Button Pressed
        if (upcomingOperation != null) {
            upcomingOperation = buttonPressed;
        } else {
            upcomingOperation = buttonPressed;

            if (num1 == null) {
                num1 = inputField.value;
            } else {
                num2 = inputField.value;
                performOperation(operationCache, num1, num2);
            }
        }
        logWorkingMemory(`${buttonPressed} Button Pressed`);



    } else if (buttonPressed == equalSign) {
        if (operationCache != null) {
            num2 = inputField.value;
            performOperation(operationCache, num1, num2);
        } else {
            console.log("No operation to perform...");
        }
        logWorkingMemory(`${buttonPressed} Button Pressed`);

    } else if (buttonPressed == backSpaceButton) {
        if (inputField.value.length > 1) {
            inputField.value = inputField.value.slice(0, -1);
        } else {
            calculatorDisplay(0);
        }
        logWorkingMemory(`${buttonPressed} Button Pressed`);
    } else if (buttonPressed == resetCalculatorButton) {
        resetCalculator();
        logWorkingMemory(`${buttonPressed} Button Pressed`);
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