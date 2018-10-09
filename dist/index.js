"use strict";

var _robot = require("./robot");

var _robot2 = _interopRequireDefault(_robot);

var _parser = require("./parser");

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inputs = ["PLACE 0,0,NORTH\nMOVE\nREPORT", "PLACE 0,0,NORTH\nLEFT\nREPORT", "PLACE 1,2,EAST\nMOVE\nMOVE\nLEFT\nMOVE\nREPORT"];

function runCommand(instructionList) {
  var robot = new _robot2.default();
  for (var i = 0, l = instructionList.length; i < l; i++) {
    var instruction = instructionList[i];

    if (instruction.args) {
      var args = instruction.args.split(",");
      robot[instruction.command](parseInt(args[0], 10), parseInt(args[1], 10), args[2]);
    } else {
      robot[instruction.command]();
    }
  }
  return robot;
}
function startRobot() {
  for (var i = 0, l = inputs.length; i < l; i++) {
    var commands = new _parser2.default().parseArgs(inputs[i]);
    if (Array.isArray(commands)) {
      runCommand(commands);
    }
  }
}
startRobot();