console.log("Game of life");

initializeGame();

function initializeGame() {
    const gridHeigth = 10;
    const gridWidth = 10;
    cells = document.querySelectorAll(".cell");
    const cellMatrix = generateElementMatrix(cells, gridHeigth, gridWidth);



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
}

