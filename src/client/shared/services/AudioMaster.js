import { Service, serviceManager, audioContext } from 'soundworks/client';

const SERVICE_ID = 'service:audio-master';

class AudioMaster extends Service {
  constructor(options) {
    super(SERVICE_ID, false);

    const defaults = {
      convolver: false,
      masterGain: 1,
    };

    this.configure(defaults, options);

    this.require('platform', { features: ['web-audio'] });
  }

  init() {
    const highpass = audioContext.createBiquadFilter();
    highpass.connect(audioContext.destination);
    highpass.type = 'highpass';
    highpass.frequency.value = 250;

    this.input = audioContext.createGain();
    this.input.connect(highpass);
    this.input.gain.value = this.options.masterGain;
  }

  start() {
    super.start();

    if (!this.hasStarted)
      this.init();

    this.ready();
  }

  set gain(value) {
    this.input.gain.value = value;
  }
}

serviceManager.register(SERVICE_ID, AudioMaster);

export default AudioMaster;
