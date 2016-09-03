import 'source-map-support/register'; // enable sourcemaps in node
import * as soundworks from 'soundworks/server';
import PlayerExperience from './PlayerExperience';
import ControllerExperience from './ControllerExperience';
import events from 'events';

import defaultConfig from './config/default';

let config = null;

switch (process.env.ENV) {
  default:
    config = defaultConfig;
    break;
}

// configure express environment ('production' enables cache systems)
process.env.NODE_ENV = config.env;
// initialize application with configuration options
soundworks.server.init(config);

// define the configuration object to be passed to the `.ejs` template
soundworks.server.setClientConfigDefinition((clientType, config, httpRequest) => {
  return {
    clientType: clientType,
    env: config.env,
    appName: config.appName,
    websockets: config.websockets,
    version: config.version,
    defaultType: config.defaultClient,
    assetsDomain: config.assetsDomain,
  };
});

const sharedParams = soundworks.server.require('shared-params');
sharedParams.addTrigger('reload', 'Reload', 'player');

// burst synth parameters
sharedParams.addNumber('synth:burst:frequency', 'Burst - frequency', 10, 25, 0.1, 15, 'player');
// @note - define a relative duration, relative to the current firefly frequency ?
sharedParams.addNumber('synth:burst:duration', 'Burst - duration', 0.1, 1, 0.01, 0.7, 'player');
sharedParams.addNumber('synth:burst:maxGain', 'Burst - maxGain', 1, 400, 1, 200, 'player');
sharedParams.addNumber('synth:burst:level', 'Burst - level', 0, 1, 0.01, 1, 'player');
sharedParams.addNumber('synth:burst:cutoffFreq', 'Burst - cutoffFreq', 100, 2000, 1, 500, 'player');

sharedParams.addNumber('synth:sine:level', 'Sine - level', 0, 1, 0.01, 0.2, 'player');

// sharedParams.addNumber('group1CenterPeriod', 'Group 1 - Center Period', 0.5, 3, 0.01, 1);
// sharedParams.addNumber('group2CenterPeriod', 'Group 2 - Center Period', 0.5, 3, 0.01, 1);

const com = new events.EventEmitter();

// create the experience
// activities must be mapped to client types:
// - the `'player'` clients (who take part in the scenario by connecting to the
//   server through the root url) need to communicate with the `checkin` (see
// `src/server/playerExperience.js`) and the server side `playerExperience`.
// - we could also map activities to additional client types (thus defining a
//   route (url) of the following form: `/${clientType}`)
const experience = new PlayerExperience('player', com);
const controller = new ControllerExperience('controller', com);

// start application
soundworks.server.start();
