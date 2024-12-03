console.log("My Advent of Code 2024 Solutions");

function getTotalDistance(list1, list2) {
  var listOfDiferences = [];

  list1.sort();
  list2.sort();

  console.log(list1);
  console.log(list2);

  for (let step = 0; step < list1.length; step++) {
    listOfDiferences[step] = Math.abs(list1[step] - list2[step]);
  }
  var sum = 0;

  for (let i = 0; i < listOfDiferences.length; i++) {
    sum += listOfDiferences[i];
  }

  console.log(sum);
  console.log(`Total Distance: ${sum}`);
}

function getSimilarityScore(list1, list2) {
  var similarityScoreList = [];

  list1.sort();
  list2.sort();

  console.log(list1);
  console.log(list2);

  for (let step = 0; step < list1.length; step++) {
    var appearances = 0;

    list2.forEach((element) => {
      if (element === list1[step]) {
        appearances++;
      }
    });

    similarityScoreList[step] = list1[step] * appearances;
  }

  var sum = 0;

  for (let i = 0; i < similarityScoreList.length; i++) {
    sum += similarityScoreList[i];
  }

  console.log(`Similarity Score: ${sum}`);
  return sum;
}

function checkHowManyReportsAreSafe(allReports) {
  var safeReportCounter = 0;
  for (let row = 0; row < allReports.length; row++) {
    console.log(`Outer loop row: ${row}`);

    var trend = null;
    var isSafe = false;
    for (let column = 0; column < allReports[row].length - 1; column++) {
      isSafe = false;
      console.log(`Inner loop column: ${column}`);
      var previousNumber = allReports[row][column];
      var currentNumber = allReports[row][column + 1];

      var diference = previousNumber - currentNumber;
      console.log(diference);

      if (Math.abs(diference) > 3) {
        console.log("To big a difference");
        break;
      }
      if (diference === 0) {
        console.log("No difference difference");
        break;
      }
      if (trend === null) {
        if (diference < 0) {
          trend = "up";
        } else {
          trend = "down";
        }
      } else {
        if (diference < 0) {
          newtrend = "up";
        } else {
          newtrend = "down";
        }
        if (trend != newtrend) {
          console.log("Changed Trend");
          break;
        }
      }
      isSafe = true;
    }
    if (isSafe) {
      safeReportCounter++;
    }
  }
  console.log(`Safe reports: ${safeReportCounter}`);
  return safeReportCounter;
}

function checkHowManyReportsAreSafeWithDampener(allReports) {
  var safeReportCounter = 0;
  for (let row = 0; row < allReports.length; row++) {
    console.log(`Outer loop row: ${row}`);

    var trend = null;
    var isSafe = false;
    for (let column = 0; column < allReports[row].length - 1; column++) {
      isSafe = false;
      console.log(`Inner loop column: ${column}`);
      var previousNumber = allReports[row][column];
      var currentNumber = allReports[row][column + 1];

      var diference = previousNumber - currentNumber;
      console.log(diference);

      if (Math.abs(diference) > 3) {
        console.log("To big a difference");
        break;
      }
      if (diference === 0) {
        console.log("No difference difference");
        break;
      }
      if (trend === null) {
        if (diference < 0) {
          trend = "up";
        } else {
          trend = "down";
        }
      } else {
        if (diference < 0) {
          newtrend = "up";
        } else {
          newtrend = "down";
        }
        if (trend != newtrend) {
          console.log("Changed Trend");
          break;
        }
      }
      isSafe = true;
    }
    if (isSafe) {
      safeReportCounter++;
    } else {
      if (checkWithAllCombinations(allReports[row])) {
        safeReportCounter++;
      }
    }
  }

  console.log(`******************Safe reports: ${safeReportCounter}`);

  function checkWithAllCombinations(numbers) {
    var tries = numbers.length;
    var validCombinationCounter = 0;
    originalNumberList = numbers;
    for (tries; tries >= 1; tries--) {
      var newCombination = originalNumberList.toSpliced(tries - 1, 1);
      console.log(`New Combination ${newCombination}`);
      validCombinationCounter += checkHowManyReportsAreSafe([newCombination]);
    }
    if (validCombinationCounter > 0) {
      return true;
    } else {
      return false;
    }
  }
}
