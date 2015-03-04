var RobotSimulator = require('../lib/robotSimulator');
var Robot = require('../lib/robot');
var assert = require('assert');

describe('Robot Simulator Tests', function() {
    it('Robot Simulator Can Be Initialised Properly', function(done) {
        var simulator = new RobotSimulator(new Robot());
        assert.equal(success, false);
    });

    it('Empty Command Is Reported Invalid', function(done) {
        var simulator = new RobotSimulator(new Robot());
        var response = simulator.Command('');
        assert.equal(response, false);
    });

    it('Unrecognized Command Is Reported Invalid', function(done) {
        var simulator = new RobotSimulator(new Robot());
        var response = simulator.Command('jump');
        assert.equal(response, false);
    });

    it('Recognized Command But Is Reported Invalid', function(done) {
        var simulator = new RobotSimulator(new Robot());
        var response = simulator.Command('move');
        assert.equal(response, false);
    });

    it('PLACE Command With No Arguments Reports Invalid', function(done) {
        var simulator = new RobotSimulator(new Robot());
        var response = simulator.Command('place');
        assert.equal(response, false);
    });    

    it('PLACE Command With Invalid Arguments Reports Invalid', function(done) {
        var simulator = new RobotSimulator(new Robot());
        var response = simulator.Command('place abcd');
        assert.equal(response, false);
        var response = simulator.Command('place 1,a,north');
        assert.equal(response, false);
        var response = simulator.Command('place b,1,north');
        assert.equal(response, false);
        var response = simulator.Command('place 1,1,southeast');
        assert.equal(response, false);        
    });

    it('Placed And Turned Left Reports Correct Position', function(done) {
        var simulator = new RobotSimulator(new Robot());
        simulator.Command('place 1,1,north');
        simulator.Command('left');
        assert.equal(simulator.Command('report'), '1,1,west');
    });

    it('Placed And Turned Right Reports Correct Position', function(done) {
        var simulator = new RobotSimulator(new Robot());
        simulator.Command('place 1,1,north');
        simulator.Command('right');
        assert.equal(simulator.Command('report'), '1,1,east');
    }); 

    it('Placed But Cannot be Moved Off Table', function(done) {
        var simulator = new RobotSimulator(new Robot());
        simulator.Command('place 5,5,north');
        var response = simulator.Command('move');
        assert.equal(response, false);
        assert.equal(simulator.Command('report'), '5,5,north');
    });

    it('Placed And Moved Reports Correct Position', function(done) {
        var simulator = new RobotSimulator(new Robot());
        simulator.Command('place 1,1,north');
        simulator.Command('move');
        assert.equal(simulator.Command('report'), '1,2,north');
    });

    it('Placed, Moved And Turned Reports Correct Position', function(done) {
        var simulator = new RobotSimulator(new Robot());
        simulator.Command('place 1,1,east');
        simulator.Command('move');
        simulator.Command('move');
        simulator.Command('left');
        simulator.Command('move');
        assert.equal(simulator.Command('report'), '3,3,north');
    });
});