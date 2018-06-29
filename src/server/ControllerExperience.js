import * as soundworks from 'soundworks/server';

class ControllerExperience extends soundworks.ControllerExperience {
  constructor(clientType, com) {
    super(clientType);

    this.com = com;

    this.auth = this.require('auth');
    this.players = [];
  }

  start() {
    super.start();

    this.com.addListener('players', (players) => this.players = players);
  }
}

export default ControllerExperience;
