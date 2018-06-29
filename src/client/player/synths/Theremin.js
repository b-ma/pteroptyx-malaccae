import { audioContext } from 'soundworks/client';

class Theremin {
  constructor() {
    this.output = audioContext.createGain();
  }

  connect(destination) {
    this.output.connect(destination);
  }

  set level(value) {
    this.output.gain.value = value;
  }

  set frequency(value) {
    this._frequency = value;
  }

  trigger(time, period) {
    const fadeInDuration = period;
    const duration = period * (Math.random() * 2 + 1);

    const resonance = audioContext.createBiquadFilter();
    resonance.connect(this.output);
    resonance.type = 'bandpass';
    resonance.Q.value = 200;
    resonance.frequency.value = this._frequency * 2;

    const lowpass = audioContext.createBiquadFilter();
    lowpass.connect(resonance);
    lowpass.type = 'lowpass';
    lowpass.frequency.value = this._frequency;

    const env = audioContext.createGain();
    env.connect(lowpass);
    env.gain.value = 0;
    env.gain.setValueAtTime(0, time);
    env.gain.linearRampToValueAtTime(1, time + fadeInDuration);
    env.gain.linearRampToValueAtTime(0, time + duration);

    const osc = audioContext.createOscillator();
    osc.connect(env);
    osc.type = 'sawtooth';

    const modFreq = audioContext.createGain();
    modFreq.connect(osc.frequency);
    modFreq.gain.value = Math.random() * 10 + 5;

    const mod = audioContext.createOscillator();
    mod.connect(modFreq);
    mod.frequency.value = Math.random() * 6;

    osc.start(time);
    mod.start(time);

    osc.stop(time + duration);
    mod.stop(time + duration);
  }
}

export default Theremin;
