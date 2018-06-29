import * as soundworks from 'soundworks/client';

class ControllerExperience extends soundworks.ControllerExperience {
  constructor() {
    super();

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

export default ControllerExperience;
