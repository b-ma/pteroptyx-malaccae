import { audio, audioContext } from 'soundworks/client';

const sampleRate = audioContext.sampleRate;
const scheduler = audio.getScheduler();

function getDecayFactor(period, duration) {
  const gainStart = 1;
  const gainEnd = 0.0001;

  const factor = Math.pow(gainStart / gainEnd, - period / duration);
  return factor;
}

class NoiseBurst extends audio.TimeEngine {
  constructor(frequency, duration, buffer) {
    super();

    this.duration = duration;
    this.buffer = buffer;

    this.period = 1 / frequency;
    this.decayFactor = getDecayFactor(this.period, this.duration);

    this.output = audioContext.createGain();
    this.output.gain.value = 1;

    this.hasStarted = false;
  }

  advanceTime(time) {
    if (this.hasStarted)
      this.output.gain.value *= this.decayFactor;

    this.hasStarted = true;

    const source = audioContext.createBufferSource();
    source.connect(this.output);
    source.buffer = this.buffer;
    source.start(time);

    if (this.output.gain.value > 0.001)
      return time + this.period;
    else
      return null;
  }
}

export default class FireflySynth {
  constructor(buffers) {
    // shared-params
    this._frequency = 0; // @todo - map to user input
    this._duration = 0;
    this._maxGain = 0;
    this._currentLevel = 0;

    this.output = audioContext.createGain();

    this._level = audioContext.createGain();
    this._level.connect(this.output);
    this._level.gain.value = this._maxGain;

    this._lowpass = audioContext.createBiquadFilter();
    this._lowpass.connect(this._level);
    this._lowpass.frequency.value = 400;

    this._buffer = audioContext.createBuffer(1, 4, sampleRate);
    const data = this._buffer.getChannelData(0);
    data[0] = 1;
    // data[1] = -0.5; // @note - good for mobile but not desktop
    // data[2] = 0.25;
    // data[3] = -0.125;
  }

  set frequency(value) {
    this._frequency = value
  }

  set duration(value) {
    this._duration = value;
  }

  set maxGain(value) {
    this._maxGain = value;
    this._level.gain.value = this._maxGain * this._currentLevel;
  }

  // map [1, 0] to [maxGain, 0]
  // @todo - map to user input
  set level(value) {
    this._currentLevel = value;
    this._level.gain.value = this._maxGain * this._currentLevel;
  }

  // @todo - map to user input
  set cutoffFreq(value) {
    this._lowpass.frequency.value = value;
  }

  trigger(time) {
    const { _frequency, _duration, _buffer } = this;
    this.noiseBurst = new NoiseBurst(_frequency, _duration, _buffer);
    this.noiseBurst.output.connect(this._lowpass);
    scheduler.add(this.noiseBurst, time);
  }
}
