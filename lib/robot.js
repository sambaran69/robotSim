var util = require('util');

var DIRECTIONS = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
var TABLE_SIZE = 5;

var Robot = module.exports = function Robot(options) {
  options = options || {};

  this.name = options.name;
  this.x = null;
  this.y = null;
  this.direction = '';

  this.isRobotOnTable = function() {
    return (isValidCoordinate(this.x) && isValidCoordinate(this.y) && isValidDirection(this.direction)) ? true : false;
  } 
};

Robot.prototype.Report = function report() {
  if (this.isRobotOnTable())
    return util.format('%d, %d, %s', this.x, this.y, this.direction);
  else
    return 'Robot needs to be placed on the table';
};

Robot.prototype.Place = function place(x, y, direction) {
  var executed = false;
  if (x && typeof x === 'string') {
    x = parseInt(x, 10);
  }
  if (y && typeof y === 'string') {
    y = parseInt(y, 10);
  }
  if (isValidCoordinate(x) && isValidCoordinate(y) && isValidDirection(direction)) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    executed = true;    
  }
  return executed;
};

Robot.prototype.Move = function move() {
  var executed = false;  
  var newPosition = {
    x: this.x,
    y: this.y,
  };
  if (this.isRobotOnTable()) {
    switch (this.direction) {
      case 'NORTH':
        newPosition.y++;
        break;
      case 'SOUTH':
        newPosition.y--;
        break;
      case 'EAST':
        newPosition.x++;
        break;
      case 'WEST':
        newPosition.x--;
        break;
    }

    if (isValidCoordinate(newPosition.x) && isValidCoordinate(newPosition.y)) {
      this.Place(newPosition.x, newPosition.y, this.direction);
      executed = true;
    }    
  }

  return executed;  
};

Robot.prototype.Left = function left() {
  var executed = false;

  if (this.isRobotOnTable()) {
    var direction;
    switch (this.direction) {
      case 'NORTH':
        direction = 'WEST';
        break;
      case 'SOUTH':
        direction = 'EAST';
        break;
      case 'EAST':
        direction = 'NORTH';
        break;
      case 'WEST':
        direction = 'SOUTH';
        break;
      default:
        break;
    }
    this.direction = direction;    
    executed = true;
  }
  return executed; 
};

Robot.prototype.Right = function right() {
  var executed = false;

  if (this.isRobotOnTable()) {
    var direction;
    switch (this.direction) {
      case 'NORTH':
        direction = 'EAST';
        break;
      case 'SOUTH':
        direction = 'WEST';
        break;
      case 'EAST':
        direction = 'SOUTH';
        break;
      case 'WEST':
        direction = 'NORTH';
        break;
      default:
        break;
    }
    this.direction = direction;
    executed = true;
  }
  return executed;  
};

function isValidCoordinate(axis) {
  if (isNaN(axis)) {
    return false;
  } else if (axis < 0 || axis >= TABLE_SIZE) {
    return false;
  } else {
    return true;
  }
}

function isValidDirection(direction) {
  return (direction && DIRECTIONS.indexOf(direction) > -1) ? true : false;
}