var RobotSimulator = require('../lib/robotSimulator');
var Robot = require('../lib/robot');
var assert = require('chai').assert;

describe('Robot Simulator', function() {
    it('Robot Simulator Can Be Initialised Properly', function() {
        var simulator = new RobotSimulator(new Robot());
        assert.isObject(simulator);
        assert.instanceOf(simulator,RobotSimulator);
    });

    it('Empty Command Is Reported Invalid', function() {
        var simulator = new RobotSimulator(new Robot());
        var response = simulator.Command('');
        assert.equal(response, false);
    });

    it('Unrecognized Command Is Reported Invalid', function() {
        var simulator = new RobotSimulator(new Robot());
        var response = simulator.Command('JUMP');
        assert.equal(response, false);
    });

    it('Recognized Command But Is Reported Invalid', function() {
        var simulator = new RobotSimulator(new Robot());
        var response = simulator.Command('MOVE');
        assert.equal(response, false);
    });

    it('PLACE Command With No Arguments Reports Invalid', function() {
        var simulator = new RobotSimulator(new Robot());
        var response = simulator.Command('PLACE');
        assert.equal(response, false);
    });    

    it('PLACE Command With Invalid Arguments Reports Invalid', function() {
        var simulator = new RobotSimulator(new Robot());
        var response = simulator.Command('PLACE abcd');
        assert.equal(response, false);
        var response = simulator.Command('PLACE 1,a,NORTH');
        assert.equal(response, false);
        var response = simulator.Command('PLACE b,1,NORTH');
        assert.equal(response, false);
        var response = simulator.Command('PLACE 1,1,SOUTHEAST');
        assert.equal(response, false);        
    });

    it('Robot Placed And Turned Left Reports Correct Position', function() {
        var simulator = new RobotSimulator(new Robot());
        simulator.Command('PLACE 1,1,NORTH');
        simulator.Command('LEFT');
        assert.equal(simulator.Command('REPORT'), '1, 1, WEST');
    });

    it('Robot Placed And Turned Right Reports Correct Position', function() {
        var simulator = new RobotSimulator(new Robot());
        simulator.Command('PLACE 1,1,NORTH');
        simulator.Command('RIGHT');
        assert.equal(simulator.Command('REPORT'), '1, 1, EAST');
    }); 

    it('Robot Placed But Cannot be Moved Off Table', function() {
        var simulator = new RobotSimulator(new Robot());
        simulator.Command('PLACE 4,4,NORTH');
        var response = simulator.Command('MOVE');
        assert.equal(response, false);
        assert.equal(simulator.Command('REPORT'), '4, 4, NORTH');
    });

    it('Robot Placed And Moved Reports Correct Position', function() {
        var simulator = new RobotSimulator(new Robot());
        simulator.Command('PLACE 1,1,NORTH');
        simulator.Command('MOVE');
        assert.equal(simulator.Command('REPORT'), '1, 2, NORTH');
    });

    it('Robot Placed, Moved And Turned Reports Correct Position', function() {
        var simulator = new RobotSimulator(new Robot());
        simulator.Command('PLACE 1,1,EAST');
        simulator.Command('MOVE');
        simulator.Command('MOVE');
        simulator.Command('LEFT');
        simulator.Command('MOVE');
        assert.equal(simulator.Command('REPORT'), '3, 2, NORTH');
    });
});