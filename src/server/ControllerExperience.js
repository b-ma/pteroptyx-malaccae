import * as soundworks from 'soundworks/server';

export default class ControllerExperience extends soundworks.BasicSharedController {
  constructor(clientType, com) {
    super(clientType);

    this.com = com;

    this.auth = this.require('auth');
    this.players = [];
  }

  start() {
    super.start();

    this.com.addListener('players', (players) => this.players = players);



    // this.sharedParams.addParamListener('group1CenterPeriod', (value) => {
    //   this.players.forEach((player) => {
    //     if ((player.index + 1) % 2 === 0)
    //       this.send(player, 'centerFreq', value)
    //   });
    // });

    // this.sharedParams.addParamListener('group2CenterPeriod', (value) => {
    //   this.players.forEach((player) => {
    //     if (player.index % 2 === 0)
    //       this.send(player, 'centerFreq', value)
    //   });
    // });


  }
}
