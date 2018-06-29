import { audioContext } from 'soundworks/client';

class SineSynth {
  constructor(buffers) {
    this._frequency = 0;
    // this._detune = 0;

    this.output = audioContext.createGain();
    this.output.gain.value = 0.6;

    // this.lowpass = audioContext.createBiquadFilter();
    // this.lowpass.connect(this.output);
    // this.lowpass.type = 'lowpass';
    // this.lowpass.frequency.value = 100;
  }

  connect(destination) {
    this.output.connect(destination);
  }

  set frequency(value) {
    this._frequency = value;
  }

  set level(value) {
    this.output.gain.value = value;
  }

  trigger(time, period) {
    const fadeInDuration = period;
    const duration = period * (Math.random() * 2 + 1);

    const env = audioContext.createGain();
    env.connect(this.output);
    env.gain.value = 0;
    env.gain.setValueAtTime(0, time);
    env.gain.linearRampToValueAtTime(1, time + fadeInDuration);
    env.gain.linearRampToValueAtTime(0, time + duration);

    const sine = audioContext.createOscillator();
    sine.connect(env);

    sine.frequency.value = this._frequency;
    sine.detune.value = Math.random() * 20 - 10;

    sine.start(time);
    sine.stop(time + duration);
  }
}

export default SineSynth;
