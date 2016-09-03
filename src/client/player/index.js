// import client side soundworks and player experience
import * as soundworks from 'soundworks/client';
import PlayerExperience from './PlayerExperience.js';
import viewTemplates from '../shared/viewTemplates';
import viewContent from '../shared/viewContent';
import AudioMaster from '../shared/services/AudioMaster';

// list of files to load (passed to the experience)
const files = [
  'sounds/impulses/vox intern normal_441 on axis.wav',
  'sounds/impulses/vox intern normal_ed911 on axis.wav',
  'sounds/impulses/vox intern normal_m930 on axis1.wav',
  'sounds/impulses/vox intern normal_m930 on axis2.wav',
  'sounds/impulses/vox intern normal_m930 rm.wav',
  'sounds/impulses/vox intern normal_m930 von hinten.wav',
  'sounds/impulses/vox intern normal_sm57 on axis.wav',
  'sounds/impulses/vox intern normal_u87.wav',

  'sounds/sound-others.mp3'
];

// launch application when document is fully loaded
window.addEventListener('load', () => {
  // initialize the 'player' client configuration received
  // from the server through the `index.html`
  // @see {~/src/server/index.js}
  // @see {~/html/default.ejs}
  const config = window.soundworksConfig;
  soundworks.client.init(config.clientType, config);
  soundworks.client.setViewContentDefinitions(viewContent);
  soundworks.client.setViewTemplateDefinitions(viewTemplates);

  // create client side (player) experience
  const experience = new PlayerExperience(config.assetsDomain, files);

  // start the client
  soundworks.client.start();
});
