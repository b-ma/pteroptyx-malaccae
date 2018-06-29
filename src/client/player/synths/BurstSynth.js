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

    if (this.output.gain.value > 0.0001)
      return time + this.period;
    else
      return null;
  }
}

class FireflySynth {
  constructor(buffers) {
    // shared-params
    this.frequency = 0;

    this.output = audioContext.createGain();

    this.volume = audioContext.createGain();
    this.volume.connect(this.output);
    this.volume.gain.value = 0;

    this.lowpass = audioContext.createBiquadFilter();
    this.lowpass.connect(this.volume);
    this.lowpass.frequency.value = 400;

    this.buffer = audioContext.createBuffer(1, 4, sampleRate);
    const data = this.buffer.getChannelData(0);
    data[0] = 1;
    // data[1] = -0.5; // @note - good for mobile but not desktop
    // data[2] = 0.25;
    // data[3] = -0.125;
  }

  connect(destination) {
    this.output.connect(destination);
  }

  // map [1, 0] to [maxGain, 0]
  // @todo - map to user input
  set gain(value) {
    this.volume.gain.value = value;
  }

  // @todo - map to user input
  set cutoffFreq(value) {
    this.lowpass.frequency.value = value;
  }

  trigger(time, period) {
    const { frequency, buffer } = this;

    this.noiseBurst = new NoiseBurst(frequency, period, buffer);
    this.noiseBurst.output.connect(this.lowpass);
    scheduler.add(this.noiseBurst, time);
  }
}

export default FireflySynth;
