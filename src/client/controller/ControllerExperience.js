import * as soundworks from 'soundworks/client';


export default class ControllerExperience extends soundworks.BasicSharedController {
  constructor() {
    super();

    // this.auth = this.require('auth');

    // burst synth
    this.setGuiOptions('synth:burst:frequency', { type: 'slider' });
    this.setGuiOptions('synth:burst:duration', { type: 'slider' });
    this.setGuiOptions('synth:burst:maxGain', { type: 'slider' });
    this.setGuiOptions('synth:burst:level', { type: 'slider' });
    this.setGuiOptions('synth:burst:cutoffFreq', { type: 'slider' });

    // sine synth
    this.setGuiOptions('synth:sine:level', { type: 'slider' });
  }
}
