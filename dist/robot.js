"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _leftRotationMap, _rightRotationMap;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var directions = {
  NORTH: "NORTH",
  SOUTH: "SOUTH",
  EAST: "EAST",
  WEST: "WEST"
};

var leftRotationMap = (_leftRotationMap = {}, _defineProperty(_leftRotationMap, directions.NORTH, directions.WEST), _defineProperty(_leftRotationMap, directions.SOUTH, directions.EAST), _defineProperty(_leftRotationMap, directions.EAST, directions.NORTH), _defineProperty(_leftRotationMap, directions.WEST, directions.SOUTH), _leftRotationMap);

var rightRotationMap = (_rightRotationMap = {}, _defineProperty(_rightRotationMap, directions.NORTH, directions.EAST), _defineProperty(_rightRotationMap, directions.SOUTH, directions.WEST), _defineProperty(_rightRotationMap, directions.EAST, directions.SOUTH), _defineProperty(_rightRotationMap, directions.WEST, directions.NORTH), _rightRotationMap);

var Robot = function () {
  function Robot() {
    _classCallCheck(this, Robot);

    this.x = null;
    this.y = null;
    this.isPlaced = false;
    this.currentFace = null;
  }
  /**
   * Place the robot at specific location and direction
   * @public
   * @param {number} x - The X position of the robot
   * @param {number} y - The Y position of the robot
   * @param {string} face - Direction of the robot
   * @return {object} Robot
   */


  _createClass(Robot, [{
    key: "place",
    value: function place(x, y, face) {
      if (!this._isValidPosition(x) || !this._isValidPosition(y) || !this._isValidDirection(face)) {
        return this;
      }

      this.x = x;
      this.y = y;
      this.currentFace = face.toUpperCase();
      this.isPlaced = true;
      return this;
    }
    /**
     * Move the robot in a particular direction
     * @return {object} Robot
     */

  }, {
    key: "move",
    value: function move() {
      if (!this.isPlaced) {
        return this;
      }
      switch (this.currentFace) {
        case "" + directions.EAST:
          if (this._isValidPosition(this.x + 1)) {
            this.x = this.x + 1;
          }
          break;
        case "" + directions.WEST:
          if (this._isValidPosition(this.x - 1)) {
            this.x = this.x - 1;
          }
          break;
        case "" + directions.NORTH:
          if (this._isValidPosition(this.y + 1)) {
            this.y = this.y + 1;
          }
          break;
        case "" + directions.SOUTH:
          if (this._isValidPosition(this.y - 1)) {
            this.y = this.y - 1;
          }
          break;
      }

      return this;
    }
    /**
     * Rotate the Robot in left direction
     * @return {object} Robot
     */

  }, {
    key: "left",
    value: function left() {
      if (!this.isPlaced) {
        return this;
      }
      this.currentFace = leftRotationMap[this.currentFace];
      return this;
    }
    /**
     * Rotate the Robot in right direction
     * @return {object} Robot
     */

  }, {
    key: "right",
    value: function right() {
      if (!this.isPlaced) {
        return this;
      }
      this.currentFace = rightRotationMap[this.currentFace];

      return this;
    }
    /**
     * Robot's current information
     * @return {object} Robot
     */

  }, {
    key: "report",
    value: function report() {
      if (!this.isPlaced) {
        return this;
      }
      /**
       * @todo Testing is difficult when using console, so try to avoid it
       */
      console.log(this.x + "," + this.y + "," + this.currentFace);

      return this;
    }

    /**
     * Check if current face is valid
     * @private
     * @param {string} str - Direction string
     * @return {boolean} Is valid direction
     */

  }, {
    key: "_isValidDirection",
    value: function _isValidDirection(str) {
      return (/^(north|south|east|west)$/gi.test(str)
      );
    }

    /**
     * Check if position is valid
     * @private
     * @param {number} value - X or Y coordinate
     * @return {boolean} Is valid position
     */

  }, {
    key: "_isValidPosition",
    value: function _isValidPosition(value) {
      if (value <= 4 && value >= 0) {
        return true;
      }
      // console.log(`Invalid move`);
      return false;
    }
  }]);

  return Robot;
}();

exports.default = Robot;