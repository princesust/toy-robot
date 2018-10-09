const directions = {
  NORTH: "NORTH",
  SOUTH: "SOUTH",
  EAST: "EAST",
  WEST: "WEST"
};

const leftRotationMap = {
  [directions.NORTH]: directions.WEST,
  [directions.SOUTH]: directions.EAST,
  [directions.EAST]: directions.NORTH,
  [directions.WEST]: directions.SOUTH
};

const rightRotationMap = {
  [directions.NORTH]: directions.EAST,
  [directions.SOUTH]: directions.WEST,
  [directions.EAST]: directions.SOUTH,
  [directions.WEST]: directions.NORTH
};

class Robot {
  constructor() {
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
  place(x, y, face) {
    if (
      !this._isValidPosition(x) ||
      !this._isValidPosition(y) ||
      !this._isValidDirection(face)
    ) {
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
  move() {
    if (!this.isPlaced) {
      return this;
    }
    switch (this.currentFace) {
      case `${directions.EAST}`:
        if (this._isValidPosition(this.x + 1)) {
          this.x = this.x + 1;
        }
        break;
      case `${directions.WEST}`:
        if (this._isValidPosition(this.x - 1)) {
          this.x = this.x - 1;
        }
        break;
      case `${directions.NORTH}`:
        if (this._isValidPosition(this.y + 1)) {
          this.y = this.y + 1;
        }
        break;
      case `${directions.SOUTH}`:
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
  left() {
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
  right() {
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

  report() {
    if (!this.isPlaced) {
      return this;
    }
    /**
     * @todo Testing is difficult when using console, so try to avoid it
     */
    console.log(`${this.x},${this.y},${this.currentFace}`);

    return this;
  }

  /**
   * Check if current face is valid
   * @private
   * @param {string} str - Direction string
   * @return {boolean} Is valid direction
   */
  _isValidDirection(str) {
    return /^(north|south|east|west)$/gi.test(str);
  }

  /**
   * Check if position is valid
   * @private
   * @param {number} value - X or Y coordinate
   * @return {boolean} Is valid position
   */
  _isValidPosition(value) {
    if (value <= 4 && value >= 0) {
      return true;
    }
    // console.log(`Invalid move`);
    return false;
  }
}

export default Robot;
