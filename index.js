// 🎄 Merry Xmas Fam 🎄 \\

const fs = require("fs");

// Solve Day parts functions

function dayOne() {
  let count = 0;
  fs.readFile("./input1.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    } else {
      let output = data.split("\r\n");
      let last = 99999999999999999999999999999;
      output.forEach((element) => {
        if (parseInt(element) > last) {
          count++;
        }
        last = parseInt(element);
      });
      console.log(count);
      return;
    }
  });
}

function dayOneii() {
  let count = 0;
  let output = [];
  let sumsArr = [];
  fs.readFile("./input1.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    } else {
      output = data.split("\r\n");
      for (let i = 0; i + 2 < output.length; i++) {
        sumsArr.push(
          parseInt(output[i]) +
            parseInt(output[i + 1]) +
            parseInt(output[i + 2])
        );
      }
      let last = 99999999999999999999999999999;
      sumsArr.forEach((element) => {
        console.log(element);
        if (parseInt(element) > last) {
          count++;
        }
        last = parseInt(element);
        console.log(last);
      });
      console.log(count);
    }
  });
}

function dayTwo() {
  let depth = 0;
  let position = 0;
  let output = readFile("./input2.txt");
  // output is now an array of commands
  output.forEach((el) => {
    console.log(el);
    let splitEl = el.split(" ");
    if (splitEl[0] === "forward") {
      position += parseInt(splitEl[1]);
    } else if (splitEl[0] === "up") {
      depth -= parseInt(splitEl[1]);
    } else if (splitEl[0] === "down") {
      depth += parseInt(splitEl[1]);
    } else {
      console.log("Instructions unclear: ", splitEl[0], splitEl[1]);
    }
  });

  console.log(`
  Depth: ${depth}
  Position: ${position}
  Multiplied: ${position * depth}`);
}

function dayTwoii() {
  let depth = 0;
  let position = 0;
  let aim = 0;
  let output = readFile("./input2.txt");
  // output is now an array of commands
  output.forEach((el) => {
    console.log(el);
    let splitEl = el.split(" ");
    if (splitEl[0] === "forward") {
      position += parseInt(splitEl[1]);
      depth += aim * parseInt(splitEl[1]);
    } else if (splitEl[0] === "up") {
      aim -= parseInt(splitEl[1]);
    } else if (splitEl[0] === "down") {
      aim += parseInt(splitEl[1]);
    } else {
      console.log("Instructions unclear: ", splitEl[0], splitEl[1]);
    }
  });

  console.log(`
  Depth: ${depth}
  Position: ${position}
  Multiplied: ${position * depth}`);
}

function dayThree() {
  let gamma = "",
    epsilon = "";
  let file = readFile("./input3.txt");

  for (let i = 0; i < file[0].length; i++) {
    let count1 = 0;
    let count0 = 0;
    file.forEach((el) => {
      parseInt(el[i]) === 0 ? count0++ : count1++;
    });
    console.log(count1, ",", count0);
    if (count1 > count0) {
      gamma += "1";
      epsilon += "0";
    } else {
      gamma += "0";
      epsilon += "1";
    }
  }

  // convert gamma and epsilon using binary conversion function
  let gConvert = convertBinary(gamma);
  let eConvert = convertBinary(epsilon);
  console.log(`Gamma: ${gamma} | ${gConvert}`);
  console.log(`Epsilon: ${epsilon} | ${eConvert}`);
  console.log(`Multiplication: ${gConvert * eConvert}`);
}

function dayThreeii() {
  let OxyArray = [],
    CoArray = [];
  let count1 = 0,
    count0 = 0;
  let file = readFile("./input3.txt");
  // First pass sort into arrays
  file.forEach((el) => {
    parseInt(el[0]) === 0 ? count0++ : count1++;
  });
  if (count1 > count0) {
    file.forEach((el) => {
      parseInt(el[0]) === 1 ? OxyArray.push(el) : CoArray.push(el);
    });
  } else {
    file.forEach((el) => {
      parseInt(el[0]) === 1 ? CoArray.push(el) : OxyArray.push(el);
    });
  }

  // Now for each of the simplified Arrays continue the reduction until 1 element remains
  let OxyResult = "";
  let CoResult = "";
  for (let i = 1; i < OxyArray[0].length; i++) {
    console.log(OxyArray);

    if (OxyArray.length === 2) {
      if (OxyArray[0] > OxyArray[1]) {
        OxyResult = OxyArray[0];
      } else {
        OxyResult = OxyArray[1];
      }
      break;
    } else if (OxyArray.length === 1) {
      OxyResult = OxyArray[0];
      break;
    }
    count1 = 0;
    count0 = 0;
    OxyArray.forEach((el) => {
      parseInt(el[i]) === 0 ? count0++ : count1++;
    });
    let tempArray = [...OxyArray];
    OxyArray = [];

    console.log(count1, count0);
    if (count1 >= count0) {
      tempArray.forEach((el) => {
        if (el[i] === "1") {
          OxyArray.push(el);
        }
      });
    } else {
      tempArray.forEach((el) => {
        if (el[i] === "0") {
          OxyArray.push(el);
        }
      });
    }
  }

  for (let i = 1; i < CoArray[0].length; i++) {
    if (CoArray.length === 2) {
      if (CoArray[0] < CoArray[1]) {
        CoResult = CoArray[0];
      } else {
        CoResult = CoArray[1];
      }
      break;
    } else if (CoArray.length === 1) {
      CoResult = CoArray[0];
      break;
    }
    count1 = 0;
    count0 = 0;
    CoArray.forEach((el) => {
      parseInt(el[i]) === 0 ? count0++ : count1++;
    });
    let tempArray = [...CoArray];
    CoArray = [];
    if (count1 < count0) {
      tempArray.forEach((el) => {
        if (el[i] === "1") {
          CoArray.push(el);
        }
      });
    } else {
      tempArray.forEach((el) => {
        if (el[i] === "0") {
          CoArray.push(el);
        }
      });
    }
  }

  console.log("Oxygen Result: ", OxyArray, OxyResult, convertBinary(OxyResult));
  console.log("Co2 Result: ", CoArray, CoResult, convertBinary(CoResult));
  console.log(
    "Multiplication: ",
    convertBinary(CoResult) * convertBinary(OxyResult)
  );
}

function dayFour() {
  let file = readFile("./input4.txt");

  // Array.prototype.shift() removes and returns the first element of an array
  let numbersToBeCalled = file.shift().split(",");
  // pop the extra empty line
  file.shift();

  let boards = [];
  let boardNo = 0;
  file.forEach((line) => {
    if (line === "") {
      boardNo += 1;
      return;
    }

    if (!boards[boardNo]) {
      boards.push([]);
    }
    boards[boardNo].push(line);
  });

  boards.forEach((board, index) => {
    boards[index] = convertBingoBoard(board);
  });

  // Now that the boards have been configured, loop through the called numbers until one of the arrays within a board is length == 0
  let lastNumCalled = null;
  let winningBoard = null;
  numbersToBeCalled.forEach((numCalled) => {
    boards.forEach((bingoBoard) => {
      bingoBoard.forEach((subArray) => {
        if (!lastNumCalled) {
          popOut(subArray, numCalled);
          if (subArray.length === 0 && !lastNumCalled) {
            lastNumCalled = numCalled;
            winningBoard = bingoBoard;
            return;
          }
        }
      });
    });
    if (!lastNumCalled) {
      return;
    }
  });

  console.log(lastNumCalled);
  console.log("Winning Board: ", winningBoard);
  console.log(
    "Answer: ",
    winningBoard[0].reduce((prev, num) => {
      return parseInt(prev) + parseInt(num);
    }) * lastNumCalled
  );
}

function dayFourii() {
  let file = readFile("./input4.txt");

  // Array.prototype.shift() removes and returns the first element of an array
  let numbersToBeCalled = file.shift().split(",");
  // pop the extra empty line
  file.shift();

  let boards = [];
  let boardNo = 0;
  file.forEach((line) => {
    if (line === "") {
      boardNo += 1;
      return;
    }

    if (!boards[boardNo]) {
      boards.push([]);
    }
    boards[boardNo].push(line);
  });

  boards.forEach((board, index) => {
    boards[index] = convertBingoBoard(board);
  });

  let lastNumCalled = null;
  let winningBoard = null;
  let tempArray = [];
  numbersToBeCalled.forEach((numCalled) => {
    tempArray = [];
    boards.forEach((bingoBoard, boardIndex) => {
      bingoBoard.forEach((subArray) => {
        if (!lastNumCalled) {
          popOut(subArray, numCalled);
          if (subArray.length === 0) {
            // console.log(
            //   "THIS IS A WINNER: ",
            //   boards[boardIndex],
            //   "\nLast num: ",
            //   numCalled,
            //   "\nBoards Remaining:",
            //   boards,
            //   "REMOVING",
            //   boardIndex
            // );
            tempArray.push(boardIndex);
            // Really more of a losing board, but I copied the day4 function as a starting point lol
          }
        }
      });
    });
    tempArray = tempArray.reverse();
    tempArray.forEach((el) => {
      winningBoard = boards.splice(el, 1);
    });
    if (boards.length === 0 && !lastNumCalled) {
      lastNumCalled = numCalled;
    }
  });

  console.log("Last Num Called: ", lastNumCalled);
  console.log("Losing Board: ", winningBoard[0]);
  console.log(
    "Answer: ",
    winningBoard[0][0].reduce((prev, num) => {
      return parseInt(prev) + parseInt(num);
    }) * lastNumCalled
  );
}

function dayFive() {
  // @ Use '-debug' to access the debugging file
  let file = readFile("./input5.txt");

  // Create a 1000 x 1000 grid (eyeballing based on none of the input values being > 1000)
  let grid = new Array(1000);

  // Need to loop over when creating the filler Arrays or the Arrays in each slot will be referring to the same array instance!
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(1000).fill(0);
  }

  file.forEach((el, index) => (file[index] = el.split(" -> ")));
  file.forEach((el) => {
    el.forEach((ele, index) => {
      el[index] = ele.split(",");
    });
  });
  let y, x, temp;

  file.forEach((navigationPair) => {
    // Only straight lines
    if (navigationPair[0][0] === navigationPair[1][0]) {
      // X values match
      x = parseInt(navigationPair[0][0]);
      temp = [parseInt(navigationPair[0][1]), parseInt(navigationPair[1][1])];
      temp.sort((a, b) => {
        return a - b;
      });
      if (temp[0] > temp[1]) {
        console.info("PROBLEM: ", temp);
      }
      y = parseInt(temp[0]);

      while (y <= parseInt(temp[1])) {
        grid[y][x] = grid[y][x] + 1;
        y++;
      }
    } else if (navigationPair[0][1] === navigationPair[1][1]) {
      // Y values match
      y = parseInt(navigationPair[0][1]);
      temp = [parseInt(navigationPair[0][0]), parseInt(navigationPair[1][0])];
      temp.sort((a, b) => {
        return a - b;
      });
      x = parseInt(temp[0]);

      while (x <= parseInt(temp[1])) {
        grid[y][x] = grid[y][x] + 1;
        x++;
      }
    }
  });

  let count = 0;

  let flatArray = grid.flat();

  let regexCommas = /,/g;

  let regexZeros = /0/g;

  outputFile(grid.join("\n").replace(regexCommas, "").replace(regexZeros, "."));

  console.log(flatArray.filter((el) => el >= 2).length);
}

function dayFiveii() {
  // @ Use '-debug' to access the debugging file
  let file = readFile("./input5.txt");

  // Create a 1000 x 1000 grid (eyeballing based on none of the input values being > 1000)
  let grid = new Array(1000);

  // Need to loop over when creating the filler Arrays or the Arrays in each slot will be referring to the same array instance!
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(1000).fill(0);
  }

  file.forEach((el, index) => (file[index] = el.split(" -> ")));
  file.forEach((el) => {
    el.forEach((ele, index) => {
      el[index] = ele.split(",");
    });
  });
  let y, x, temp;

  file.forEach((navigationPair) => {
    // Only straight lines
    if (navigationPair[0][0] === navigationPair[1][0]) {
      // X values match
      x = parseInt(navigationPair[0][0]);
      temp = [parseInt(navigationPair[0][1]), parseInt(navigationPair[1][1])];
      temp.sort((a, b) => {
        return a - b;
      });
      if (temp[0] > temp[1]) {
        console.info("PROBLEM: ", temp);
      }
      y = parseInt(temp[0]);

      while (y <= parseInt(temp[1])) {
        grid[y][x] = grid[y][x] + 1;
        y++;
      }
    } else if (navigationPair[0][1] === navigationPair[1][1]) {
      // Y values match
      y = parseInt(navigationPair[0][1]);
      temp = [parseInt(navigationPair[0][0]), parseInt(navigationPair[1][0])];
      temp.sort((a, b) => {
        return a - b;
      });
      x = parseInt(temp[0]);

      while (x <= parseInt(temp[1])) {
        grid[y][x] = grid[y][x] + 1;
        x++;
      }
    } else if (
      (navigationPair[0][0] - navigationPair[1][0]) /
        (navigationPair[0][1] - navigationPair[1][1]) ==
      1
    ) {
      // 45 degree angle down and right
      temp = [parseInt(navigationPair[0][1]), parseInt(navigationPair[1][1])];
      temp.sort((a, b) => {
        return a - b;
      });
      y = parseInt(temp[0]);

      temp = [parseInt(navigationPair[0][0]), parseInt(navigationPair[1][0])];
      temp.sort((a, b) => {
        return a - b;
      });
      x = parseInt(temp[0]);

      while (x <= parseInt(temp[1])) {
        grid[y][x] = grid[y][x] + 1;
        x++;
        y++;
      }
    } else {
      // 45 degree angle up and right
      temp = [parseInt(navigationPair[0][1]), parseInt(navigationPair[1][1])];
      temp.sort((a, b) => {
        return b - a;
      });
      y = parseInt(temp[0]);

      temp = [parseInt(navigationPair[0][0]), parseInt(navigationPair[1][0])];
      temp.sort((a, b) => {
        return a - b;
      });
      x = parseInt(temp[0]);

      while (x <= parseInt(temp[1])) {
        grid[y][x] = grid[y][x] + 1;
        x++;
        y--;
      }
    }
  });

  let count = 0;

  let flatArray = grid.flat();

  let regexCommas = /,/g;

  let regexZeros = /0/g;

  outputFile(grid.join("\n").replace(regexCommas, "").replace(regexZeros, "."));

  console.log(flatArray.filter((el) => el >= 2).length);
}

function daySix() {
  // Create 2 arrays
  // one is all lantern fish
  // loop through the first array
  // iff value == 0, add a new fish to the second array
  // after reaching the end, spread opperator the two arrays together
  // repeat for # of days
  const DAYS = 80;

  let file = readFile("./input6.txt");

  let fishes = file[0].split(",");
  let babyFeesh = [];

  for (var i = 0; i < DAYS; i++) {
    fishes.forEach((feesh, index) => {
      if (parseInt(feesh) === 0) {
        babyFeesh.push(8);
        fishes[index] = 6;
      } else {
        fishes[index] = parseInt(feesh) - 1;
      }
    });

    fishes = [...fishes, ...babyFeesh];
    babyFeesh = [];
  }

  console.log("There are ", fishes.length, " feeshes");
}

function daySixii() {
  // Sooooo there's hella fish here
  // Like, enough to crash my RAM apparently
  // So for each fish, I'll see how many fish we end up with
  // #MATH!

  const DAYS = 256;

  let file = readFile("./input6.txt");

  let fishes = file[0].split(",");

  let catalog = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  };

  fishes.forEach((feesh) => {
    catalog[feesh] = catalog[feesh] + 1;
  });

  let temp0 = 0;

  for (var i = 0; i < DAYS; i++) {
    temp0 = catalog[0];
    catalog[0] = catalog[1];
    catalog[1] = catalog[2];
    catalog[2] = catalog[3];
    catalog[3] = catalog[4];
    catalog[4] = catalog[5];
    catalog[5] = catalog[6];
    catalog[6] = catalog[7] + temp0;
    catalog[7] = catalog[8];
    catalog[8] = temp0;
  }

  console.log(
    "There are ",
    catalog[0] +
      catalog[1] +
      catalog[2] +
      catalog[3] +
      catalog[4] +
      catalog[5] +
      catalog[6] +
      catalog[7] +
      catalog[8],
    " feeshes"
  );
}

// Utility Functions

// @readFile returns input file as array splitting the file by lines
function readFile(inputFile) {
  let file = fs.readFileSync(inputFile, "utf8");
  return file.split("\r\n");
}

function outputFile(outputContents) {
  let file = fs.writeFile("./output.txt", outputContents, (err) =>
    console.error(err)
  );
}

// @convertBinary takes a binary number input and returns the base 10 value
function convertBinary(inputBinary) {
  let total = 0;
  let pos = 0;
  let arrayInput = inputBinary.split("");
  while (arrayInput.length > 0) {
    let tempValue = parseInt(arrayInput.pop());
    if (tempValue) {
      total += Math.pow(2, pos);
    }
    pos++;
  }
  return total;
}

//@convertBingoBoard takes an array of length 5 with 5 numbers in each string of the array and converts it to an easier to check for BINGO array
function convertBingoBoard(boardArray) {
  // 5 rows, 5 columns, and 2 diagonals to check for bingo - first element is the array of all numbers
  let newBoard = [[], [], [], [], [], [], [], [], [], [], [], [], []];
  boardArray.forEach((row, i) => {
    row = row.split(" ");
    // Sorting before pushing into array rearranges the board 4head 🤦🏻‍♂️
    // row.sort();
    // while (row.length > 5) {
    //   row.shift();
    // }

    row.forEach((el) => {
      if (el === "") {
        popOut(row, el);
      }
    });

    row.forEach((number, j) => {
      newBoard[0].push(number);
      newBoard[1 + i].push(number);
      newBoard[6 + j].push(number);
      if (i == j) {
        newBoard[11].push(number);
      }
      if (i + j == 4) {
        newBoard[12].push(number);
      }
    });
  });
  return newBoard;
}

// @popOut will take an array and the value to find and pop
function popOut(arrayIn, popValue) {
  let index = arrayIn.indexOf(popValue);
  if (index !== -1) {
    arrayIn.splice(index, 1);
  }
  // Note that you don't need to return the array because splice mutates the original string
}

daySixii();
