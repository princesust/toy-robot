"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parser = function () {
  function Parser() {
    _classCallCheck(this, Parser);
  }

  _createClass(Parser, [{
    key: "parseArgs",
    value: function parseArgs(args) {
      var _this = this;

      if (!args.length) {
        return false;
      }
      var argsArray = args.split("\n").map(function (item) {
        return item.trim().toLowerCase();
      }).reduce(function (acc, raw) {
        acc.push(_this.parseInstruction(raw));
        return acc;
      }, []);
      return argsArray;
    }
  }, {
    key: "parseInstruction",
    value: function parseInstruction(instruction) {
      var multiWord = instruction.split(" ");
      if (multiWord.length > 1 && multiWord[0].toLowerCase() === "place") {
        return {
          command: "place",
          args: multiWord[1]
        };
      } else if (instruction.toLowerCase() === "move") {
        return { command: "move" };
      } else if (instruction.toLowerCase() === "report") {
        return { command: "report" };
      } else if (instruction.toLowerCase() === "left") {
        return { command: "left" };
      } else if (instruction.toLowerCase() === "right") {
        return { command: "right" };
      }
    }
  }]);

  return Parser;
}();

exports.default = Parser;