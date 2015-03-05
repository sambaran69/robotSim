var readline = require('readline');
var COMMANDS = ['PLACE','MOVE','LEFT','RIGHT','REPORT'];

var Simulator = module.exports = function RobotSimulator(robot, dryRun, options) {
  this.robot = robot;

  if (dryRun) {
		options = options || {};
		this.input = options.input || process.stdin;
	  this.output = options.output || process.stdout;  

	  this.rl = readline.createInterface({
	    input: this.input ,
	    output: this.output
	  });

		this.rl.setPrompt('robotSim> ');
		this.rl.prompt();  

		this.rl
			.on("line", function (line) {
		    try {
		      Command(line.trim());
		    } catch (e) {
		      return this.commandError(e);
		    }
		    rl.prompt();
		  })
		  .on('close', function() {
			  console.log('Exiting Simulator.');
			  process.exit(0);
			});  	
  }


};

Simulator.prototype.Command = function command(command, dryRun) {
	var executed = false;
	var commandArray = command.split(' ');
	var commandName = commandArray[0].toUpperCase();
	var isRobotOnTable = this.robot.isRobotOnTable();

	if (isRobotOnTable || (!isRobotOnTable && commandName === 'PLACE')) {
		executed = this.processCommand(commandName, commandArray);
	}
	else {
		if (dryRun)
			this.error(Error("Cannot execute command"), "The first valid command to the robot must be a PLACE command!");
	}
	return executed;
};

Simulator.prototype.processCommand = function(commandName, arguments) {
	switch (commandName) {
    case "PLACE":
    	var executed = false;
      var posCmd = arguments.slice(1).join("");
      var positions = posCmd.split(",");
      if (positions && positions.length > 2) {
	      var position = {
	      	x: parseInt(positions[0].trim(),10),
	      	y: parseInt(positions[1].trim(),10),
	      	direction: positions[2].trim()
	      };
	      executed = this.place(position);
      }
      return executed;
    case "MOVE":
      return this.move();
    case "LEFT":
      return this.left();
    case "RIGHT":
      return this.right();
    case "REPORT":
      var result = this.report();
      return result;
    default:
      unknownCommand(commandName);
      return false;
  }
};

Simulator.prototype.unknownCommand = function unknownCommand(cmd) {
  return this.error(Error("Unrecognised command"), "Unknown Command `" + cmd.toUpperCase() + "`");
};

Simulator.prototype.error = function error(err, message) {
  this.line();
  this.sendError(err, message);
  this.line();

  this.rl.prompt();
};

Simulator.prototype.place = function place(postion) {
	return this.robot.Place(postion.x, postion.y, postion.direction);
};

Simulator.prototype.move = function move() {
	return this.robot.Move();
};

Simulator.prototype.left = function left() {
  return this.robot.Left();
};

Simulator.prototype.right = function right() {
  return this.robot.Right();
};

Simulator.prototype.report = function report() {
  return this.robot.Report();
};
