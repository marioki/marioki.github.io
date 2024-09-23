console.log("Game of life");

initializeGame();

function initializeGame() {
    const gridHeigth = 10;
    const gridWidth = 10;
    let generation = 0;
    cells = document.querySelectorAll(".cell");
    startButton = document.querySelector(".start-button");
    stopButton = document.querySelector(".stop-button");
    const cellMatrix = generateElementMatrix(cells, gridHeigth, gridWidth);
    
    let interval = 1000;
    startButton.onclick = startTime;

    function generateElementMatrix(elementList, heigth, width) {
        counter = 0;
        const my2DArray = [];
        for (let i = 0; i < heigth; i++) {
            my2DArray[i] = [];
            for (let j = 0; j < width; j++) {
                my2DArray[i][j] = elementList[counter];
                addButtonListener(my2DArray[i][j], j, i);
                counter++;
            }
        }
        return my2DArray;
    }

    function addButtonListener(cell, x, y) {
        cell.onclick = function () {
            console.log(` Button Clicked: ${x},${y} `);
            toggleCell(x, y);
        }
    }

    function toggleCell(x, y) {
        if (cellMatrix[y][x].classList.contains("alive")) {
            cellMatrix[y][x].classList = ["cell"];
        } else {
            cellMatrix[y][x].classList.add("alive");
        }
    }

    function startTime() {
        setInterval(mutate, interval);
    }

    function mutate() {
        console.log(`Generation ${generation}`);
        for (let y = 0; y < gridHeigth; y++) {
            for (x = 0; x < gridWidth; x++) {
                toggleCell(x, y);
            }
        }
        generation++;
    }


}

