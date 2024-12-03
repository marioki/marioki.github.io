function floorCalculator(instructions) {
  var instructionsSize = instructions.length;
  var currentFloor = 0;
  let firstTimeOnBasement = true;

  for (let step = 1; step < instructionsSize + 1; step++) {
    var currentInstruction = instructions.charAt(step - 1);

    if (currentInstruction === "(") {
      currentFloor++;
    } else {
      currentFloor--;
    }

    if (currentFloor === -1 && firstTimeOnBasement) {
      console.log(
        `Santa entered the basement for the first time at the ${step} instruction`
      );
      firstTimeOnBasement = false;
    }
  }

  console.log(`Santa must go to the ${currentFloor} floor`);
  return currentFloor;
}

function wrappingPaperCalculator(listOfBoxDimensions) {
  var totalWrappingPaperNeeded = 0;
  for (let step = 0; step < listOfBoxDimensions.length; step++) {
    var boxDimensions = extractDimensions(listOfBoxDimensions[step]);
    var boxArea = calculateBoxArea(boxDimensions);
    var extraPaper = calculateExtraPaper(boxDimensions);
    totalWrappingPaperNeeded += boxArea + extraPaper;
  }

  function extractDimensions(dimensionString) {
    var dimensionsSplitStrings = dimensionString.split("x");
    var dimensionsNumbers = dimensionsSplitStrings.reduce(
      (accumulator, currentValue) => accumulator.concat(+currentValue),
      []
    );
    console.log(` dimensions are: ${dimensionsNumbers}`);
    return dimensionsNumbers;
  }

  function calculateBoxArea(boxDimensions) {
    var boxArea =
      2 * boxDimensions[0] * boxDimensions[1] +
      2 * boxDimensions[1] * boxDimensions[2] +
      2 * boxDimensions[2] * boxDimensions[0];
    console.log(` area is: ${boxArea}`);
    return boxArea;
  }

  function calculateExtraPaper(boxDimensions) {
    var sortedDimensions = boxDimensions.sort((a, b) => a - b);
    console.log(`sorted dimensions ${sortedDimensions}`);
    var extraPaper = sortedDimensions[0] * sortedDimensions[1];
    console.log(` extra paper is: ${extraPaper}`);
    return extraPaper;
  }

  console.log(`Total Wrapping paper needed is: ${totalWrappingPaperNeeded}`);
  return totalWrappingPaperNeeded;
}
