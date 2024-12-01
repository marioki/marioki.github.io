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
