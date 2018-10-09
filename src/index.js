import Robot from "./robot";
import Parser from "./parser";

const inputs = [
  "PLACE 0,0,NORTH\nMOVE\nREPORT",
  "PLACE 0,0,NORTH\nLEFT\nREPORT",
  "PLACE 1,2,EAST\nMOVE\nMOVE\nLEFT\nMOVE\nREPORT"
];

function runCommand(instructionList) {
  let robot = new Robot();
  for (var i = 0, l = instructionList.length; i < l; i++) {
    let instruction = instructionList[i];

    if (instruction.args) {
      let args = instruction.args.split(",");
      robot[instruction.command](
        parseInt(args[0], 10),
        parseInt(args[1], 10),
        args[2]
      );
    } else {
      robot[instruction.command]();
    }
  }
  return robot;
}
function startRobot() {
  for (let i = 0, l = inputs.length; i < l; i++) {
    let commands = new Parser().parseArgs(inputs[i]);
    if (Array.isArray(commands)) {
      runCommand(commands);
    }
  }
}
startRobot();
