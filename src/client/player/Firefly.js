import { audio } from 'soundworks/client';

const max = Math.max;
const min = Math.min;
const sin = Math.sin;
const _2PI = 2 * Math.PI;
const _PI = Math.PI;

class Firefly extends audio.TimeEngine {
  constructor(lowerPeriod, upperPeriod, flashFunction) {
    super();

    this.lowerPeriod = lowerPeriod;
    this.upperPeriod = upperPeriod;
    this.flashFunction = flashFunction;

    // @todo - move into method
    this.lowerFrequency = 1 / upperPeriod;
    this.upperFrequency = 1 / lowerPeriod;
    this.period = (upperPeriod + lowerPeriod) / 2;
    this.naturalFrequency = 1 / this.period;

    this.frequency = this.naturalFrequency;
  }

  resetTime(time) {
    const timeSinceLastFlash = time - this.flashTime;
    const phase = (timeSinceLastFlash / this.period) % 1;

    // - update frequency
    // ω' = ω + ε(Ω - ω) + gplus(φ)(Ωl - ω) + gminus(φ)(Ωu - ω)
    // - where:
    // ε is a constant (assume 0.01 cf. page 4)
    // Ω is the natural frequency
    // gplus(φ)  = max(sin(2πφ) / 2π, 0)
    // gminus(φ) = - min(sin(2πφ) / 2π, 1)
    const epsilon = 0.4;
    let df = epsilon * (this.naturalFrequency - this.frequency);

    if (phase < 0.5)
      df -= (sin(_2PI * phase) / _2PI) * (this.frequency - this.lowerFrequency);
    else
      df += (sin(_2PI * phase) / _2PI) * (this.frequency - this.upperFrequency);

    if (Number.isNaN(df)) {
      console.log('nan', phase, this.naturalFrequency, df);
      return;
    }
    // update period according to new frequency
    this.frequency += df;
    this.period = 1 / this.frequency;

    // update next time output according to new frequency
    const dt = this.period * (1 - phase);
    return time + dt;
  }

  advanceTime(time) {
    this.flashTime = time;
    this.flashFunction(time,  this.period);

    return time + this.period;
  }
}

export default Firefly;
