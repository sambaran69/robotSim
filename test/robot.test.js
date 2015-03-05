var Robot = require('../lib/robot');
var assert = require("chai").assert;

var Facing = {
    North: 'NORTH',
    South: 'SOUTH',
    East: 'EAST',
    West: 'WEST'
};

describe('Robot', function() {
    it('Initialised But Not Placed Robot Cannot Be Moved', function() {
        var robot = new Robot();
        var success = robot.Move();
        assert.equal(success, false);
    });

    it('Initialised But Not Placed Robot Cannot Be Turned', function() {
        var robot = new Robot();
        var success = robot.Left();
        assert.equal(success, false);
    });

    it('Initialised But Not Placed Robot Cannot Report Its Position', function() {
        var robot = new Robot();
        var position = robot.Report();
        assert.equal(position,'Robot needs to be placed on the table');
    });

    it('Robot Cannot Be Placed Off Table', function() {
        var robot = new Robot();
        var success = robot.Place(-1, 0, Facing.North);
        assert.equal(success, false);
    });

    it('Robot When Placed Can Report Its Position', function() {
        var robot = new Robot();
        var success = robot.Place(3, 2, Facing.East);
        var position = robot.Report();
        assert.equal(success, true);
        assert.equal(position, '3, 2, EAST');
    });

    it('Robot Placed And Turns Left Reports Correct Position', function() {
        var robot = new Robot();
        robot.Place(1, 1, Facing.North);
        robot.Left();
        assert.equal(robot.Report(),'1, 1, WEST');
    });

    it('Robot Placed And Turns Right Reports Correct Position', function() {
        var robot = new Robot();
        robot.Place(1, 1, Facing.North);
        robot.Right();
        assert.equal(robot.Report(),'1, 1, EAST');
    });

    it('Robot Placed But Cannot be Moved Off Table', function() {
        var robot = new Robot();
        robot.Place(4, 4, Facing.North);
        var success = robot.Move();
        assert.equal(success, false);
        assert.equal(robot.Report(), '4, 4, NORTH');
    });

    it('Robot Placed And Moved Reports Correct Position', function() {
        var robot = new Robot();
        robot.Place(1, 1, Facing.North);
        robot.Move();
        assert.equal(robot.Report(), '1, 2, NORTH');
    });

    it('Robot Placed, Moved And Turned Reports Correct Position', function() {
        var robot = new Robot();
        robot.Place(1, 2, Facing.East);
        robot.Move();
        robot.Move();
        robot.Left();
        robot.Move();
        assert.equal(robot.Report(), '3, 3, NORTH');
    });
});