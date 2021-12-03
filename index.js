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

// Utility Functions

// @readFile returns input file as array splitting the file by lines
function readFile(inputFile) {
  let file = fs.readFileSync(inputFile, "utf8");
  return file.split("\r\n");
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

dayThreeii();
