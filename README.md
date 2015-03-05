# robotSim
## Robot Simulator

The application is a simulation of a toy robot moving on a square tabletop, of dimensions 5 units x 5 units.
* There are no other obstructions on the table surface.
* The robot is free to roam around the surface of the table, but must be prevented from falling to destruction. Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still
be allowed.

The application can read in commands of the following form -

```
PLACE X,Y,F
MOVE
LEFT
RIGHT
REPORT
```

## Usage

* `PLACE` will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.
* The origin (0,0) can be considered to be the SOUTH WEST most corner.
* The first valid command to the robot is a `PLACE` command, after that, any sequence of commands may be issued, in any order, including another `PLACE` command. The application should discard all commands in the sequence until a valid `PLACE` command has been executed.
* `MOVE` will move the toy robot one unit forward in the direction it is currently facing.
* `LEFT` and `RIGHT` will rotate the robot 90 degrees in the specified direction without changing the position of the robot.
* `REPORT` will announce the X,Y and F of the robot. This can be in any form, but standard output is sufficient.

# Development Environment
### Setup
Before beginning work, a developer must set up the development environment on their machine including the necessary tools and frameworks to support the development process. The environment requirements are noted below:
* [Node.js](http://nodejs.org/download/) - the application platform - download and run the Windows Installer (if using a different OS, download the appropriate installer).  This will install the Node.js JavaScript platform and engine as well as the Node Package Manager (npm).
* [Git](http://git-scm.com/downloads) - distributed version control system (DVCS) - download and install the Git client for Windows (if using a different OS, download the appropriate installer).
* [GitHub](https://github.com/) - This solution uses GitHub to manage the source code.  GitHub is a hosted SCM solution and it requires an authenticated account.  You may use your own personal GitHub account.

### Application Dependencies
* [Node.js](http://nodejs.org/) - application platform built on Chrome's JavaScript runtime

### Development Dependencies
* [Mocha](http://visionmedia.github.io/mocha/) - test framework
* [Chai](http://chaijs.com/) - TDD/BDD assertion library

### Running Tests
If the development dependencies have not been installed the first step should be to run `npm install` to set up the environment. From the developer's environment the entire test suite can be run by executing `npm test` from the project root folder.  Running the tests in this manner will execute the script that is defined in the `package.json` file.

### Running the Simulator
The Simulator can be run in the following 2 ways:
  
  1. Launch the Simulator Console to enter commands - `node app`
  2. Pass Commands from a file to the Simulator console  - `node app -file SampleCommands.txt`


## License

Copyright © 2015 Sambaran Roy

