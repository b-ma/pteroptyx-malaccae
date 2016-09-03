import { audioContext } from 'soundworks/client';

export default class SineSynth {
  constructor(buffers) {
    this._frequency = 0;
    this._detune = 0;

    this.output = audioContext.createGain();
    this.output.gain.value = 0.6;

    this.lowpass = audioContext.createBiquadFilter();
    this.lowpass.connect(this.output);
    this.lowpass.type = 'lowpass';
    this.lowpass.frequency.value = 100;

    // this.env = audioContext.createGain();
    // this.env.connect(this.lowpass);
    // this.env.gain.value = 0;

    // this.sine1 = audioContext.createOscillator();
    // this.sine2 = audioContext.createOscillator();

    // this.sine1.connect(this.env);
    // this.sine2.connect(this.env);

    // this.isMuted = true;
  }

  set frequency(value) {
    this._frequency = value;

    // this.sine1.frequency.value = value;
    // this.sine2.frequency.value = value;
  }

  set detune(value) {
    this._detune = value;

    // this.sine2.detune.value = value;
  }

  set level(value) {
    this.output.gain.value = value;
  }

  set cutoffFrequency(value) {
    this.lowpass.frequency.value = value;
  }

  // should be controlled from outside
  // set pitch(value) {}

  trigger(time, period) {
    // if (this.isMuted) {
    //   const fadeIn = period * (Math.random() * 2 + 1);
    //   this.env.gain.setValueAtTime(0, time);
    //   this.env.gain.linearRampToValueAtTime(1, time + fadeIn);

    //   this.sine1.start(time);
    //   this.sine2.start(time);

    //   this.isMuted = false;
    // }

    const fadeInDuration = period;
    const duration = period * (Math.random() * 2 + 1);

    const env = audioContext.createGain();
    env.connect(this.lowpass);
    env.gain.value = 0;
    env.gain.setValueAtTime(0, time);
    env.gain.linearRampToValueAtTime(1, time + fadeInDuration);
    env.gain.linearRampToValueAtTime(0, time + duration);

    const sine = audioContext.createOscillator();
    sine.connect(env);

    sine.frequency.value = this._frequency;
    sine.detune.value = Math.random() * 20 - 10;
    // sine.detune.value = this._detune;

    sine.start(time);
    sine.stop(time + duration);
  }
}
