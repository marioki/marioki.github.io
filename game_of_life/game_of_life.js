console.log("Game of life");

initializeGame();

function initializeGame() {
    const gridHeigth = 10;
    const gridWidth = 10;
    let generationCounter = 0;
    let timeIntervalID;
    let timeInterval = 100;

    cells = document.querySelectorAll(".cell");
    const cellMatrix = generateElementMatrix(cells, gridHeigth, gridWidth);

    buildSimulationControls();

    function startTime() {
        timeIntervalID = setInterval(mutate, timeInterval);
    }

    function pauseTime() {
        clearInterval(timeIntervalID);
    }

    function buildSimulationControls() {
        startButton = document.querySelector(".start-button");
        pauseButton = document.querySelector(".pause-button");
        startButton.onclick = startTime;
        pauseButton.onclick = pauseTime;
        generationDisplay = document.querySelector(".generation-display");
    }

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

    /**
       * 1. If a cell does not have at least 2 neighbors, it dies.
       * 2. If a cell has 2 to 3 neighbors, it lives for that generation.
       * 4. If a cell has more than 3 neighbors, it dies.
       * 5. If a dead cell has exactly 3 living neighbors, that cell is born.
       * 
       * Steps:
       * 1. Iterate through each cell.
       *    a. Check neighboring cells.
       *    b. Count how many neighboring cells exist. The position is not important.
       *    c. Turn the cell on or off based on the number of neighbors.
       * 
       * Considerations:
       * I cannot make changes immediately while iterating because I would end up making changes with corrupted data.
       * I could save the coordinates of the cell only when a change/toggle is needed.
       * And when I finish reading the entire grid, I iterate through the list of coordinates to execute the toggle.
       */
    function mutate() {
        let mutateList = [];

        for (let y = 0; y < gridHeigth; y++) {
            for (let x = 0; x < gridWidth; x++) {
                const livingNeighbors = countLivingNeighbors(x, y);
                addCellToToggleList(livingNeighbors, x, y);
            }
        }
        updateGenerationDisplay();

        console.log(mutateList);

        mutateList.forEach(element => {
            toggleCell(element[0], element[1]);
        });


        function addCellToToggleList(totalLivingNeighbors, x, y) {
            console.log(`Checking if cell should be toggled...`);
            console.log(`Cell(${x},${y} has ${totalLivingNeighbors} living neighbors.)`);

            let subjectCellIsAlive = cellMatrix[y][x].classList.contains("alive");
            let nextCellStateIsAlive;

            console.log(`Subject Cell is alive? ${subjectCellIsAlive}`);

            if (totalLivingNeighbors > 3 || totalLivingNeighbors < 2) {
                nextCellStateIsAlive = false;
            } else if (totalLivingNeighbors === 3) {
                nextCellStateIsAlive = true;
            } else if (totalLivingNeighbors < 4 && totalLivingNeighbors > 1 && subjectCellIsAlive) {
                nextCellStateIsAlive = true;
            } else {
                return;
            }

            if (subjectCellIsAlive != nextCellStateIsAlive) {
                mutateList.push([x, y]);
            }

        }
    }

    function toggleCell(x, y) {
        if (cellMatrix[y][x].classList.contains("alive")) {
            cellMatrix[y][x].classList = ["cell"];
        } else {
            cellMatrix[y][x].classList.add("alive");
        }
    }


    function updateGenerationDisplay() {
        generationCounter++;
        generationDisplay.innerText = `Generation Number: ${generationCounter}`;
    }

    /**
    * Counts the number of living neighbors of the cell at position x,y.
    */
    function countLivingNeighbors(x, y) {
        let totalLivingNeighbors = 0;

        let topRowTotal = checkTopRow();
        let sameRow = checkSameRow();
        let bottomRow = checkBottomRow();

        function checkTopRow() {
            let topRowCount = 0;
            let topRow = y - 1;
            if (topRow < 0) {
                return topRowCount;
            }
            for (let column = x - 1; column <= x + 1; column++) {
                if (column < 0 || column > gridWidth - 1) {
                    continue;
                }
                if (cellMatrix[topRow][column].classList.contains("alive")) {
                    totalLivingNeighbors++;
                    topRowCount++
                }
            }
            return topRowCount;
        }

        function checkSameRow() {
            let sameRowCount = 0;

            for (let column = x - 1; column <= x + 1; column++) {
                if (column < 0 || column > gridWidth - 1) {
                    continue;
                }
                if (column === x) {
                    continue;
                }
                if (cellMatrix[y][column].classList.contains("alive")) {
                    totalLivingNeighbors++;
                    sameRowCount++
                }
            }
            return sameRowCount;
        }

        function checkBottomRow() {
            let bottomRowCount = 0;
            let bottomRow = y + 1;

            if (bottomRow > 9) {
                return bottomRowCount;
            }
            for (let column = x - 1; column <= x + 1; column++) {
                if (column < 0 || column > gridWidth - 1) {
                    continue;
                }
                if (cellMatrix[bottomRow][column].classList.contains("alive")) {
                    totalLivingNeighbors++;
                    bottomRowCount++
                }
            }
            return bottomRowCount;
        }
        return totalLivingNeighbors;
    }

}

