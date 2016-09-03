const max = Math.max;
const min = Math.min;
const sin = Math.sin;
const _2PI = 2 * Math.PI;
const _PI = Math.PI;

const lookahead = 0.05;

class MovingAverage {
  constructor(order) {
    this.order = order;
    this.stack = new Array(order);
    this.index = 0;

    for (let i = 0; i < order; i++)
      this.stack[i] = 0;
  }

  process(value) {
    const stack = this.stack;
    const length = this.order;
    let sum = 0;

    stack[this.index] = value;

    for (let i = 0; i < length; i++)
      sum += stack[i];

    this.index = (this.index + 1) % length;
    return sum / length;
  }
}

export default class Firefly {
  constructor(lowerPeriod, upperPeriod, getTimeFunction, flashFunction) {
    this.lowerPeriod = lowerPeriod;
    this.upperPeriod = upperPeriod;
    this.getCurrentTime = getTimeFunction;
    this.flashFunction = flashFunction;

    // @todo - move into method
    this.lowerFrequency = 1 / upperPeriod;
    this.upperFrequency = 1 / lowerPeriod;
    this.period = (upperPeriod + lowerPeriod) / 2;
    this.naturalFrequency = 1 / this.period;

    this.frequency = this.naturalFrequency;

    this.flash = this.flash.bind(this);
    this.processFlash = this.processFlash.bind(this);

    this._timeoutId = null;
  }

  processFlash() {
    if (!this._timeoutId) return; // didn't started

    clearTimeout(this._timeoutId);

    const currentTime = this.getCurrentTime();
    const dt = currentTime - this.flashTime;
    const phase = (1000 + (dt / this.period)) % 1;

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
    this.flashProcessed = true;

    // update next time output according to new frequency
    const flashDelay = this.period * (1 - phase);
    this.flashTime = currentTime + flashDelay;
    this._timeoutId = setTimeout(this.flash, flashDelay * 1000 - lookahead);
  }

  flash() {
    if (!this.flashTime)
      this.flashTime = this.getCurrentTime();

    if (!this.flashProcessed)
      this.flashTime += this.period;

    this.flashProcessed = false;
    this.flashFunction(this.flashTime, this.period);

    this._timeoutId = setTimeout(this.flash, this.period * 1000 - lookahead);
  }
}
