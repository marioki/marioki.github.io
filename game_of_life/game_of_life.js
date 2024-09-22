console.log("Game of life");

initializeGame();

function initializeGame() {
    const gridHeigth = 10;
    const gridWidth = 10;
    cells = document.querySelectorAll(".cell");
    const cellMatrix = generateElementMatrix(cells, gridHeigth, gridWidth);
    
}

function generateElementMatrix(elementList, heigth, width) {
    counter = 0;
    const my2DArray = [];
    for (let i = 0; i < heigth; i++) {
        my2DArray[i] = [];
        for (let j = 0; j < width; j++) {
            my2DArray[i][j] = elementList[counter];
            counter++;
        }
    }
    return my2DArray;
}