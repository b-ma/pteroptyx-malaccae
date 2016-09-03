import { audio } from 'soundworks/client';
const audioContext = audio.audioContext;

// the actual nbr of steps is nbrSteps + 1 because of the phase offset
function createStairTransfertFunction(nbrSteps, ySkew = 1) {
  const _2PI = Math.PI * 2;
  const freq = nbrSteps * _2PI;
  const phaseOffset = -1 / (nbrSteps * 2);
  const sin = Math.sin;

  return (x) => ((freq * x) + ySkew * sin(freq * (x + phaseOffset))) / freq;
}

/**
 * @todo allow 'manual' or 'auto' control - use states for that ?
 */
export default class Score {
  constructor(synths, renderers) {
    this.burstSynth = synths.burstSynth;
    this.sineSynth = synths.sineSynth;

    this.burstRenderer = renderers.burstRenderer;

    this.state = 'default';

    // notes = [300, 450, 600, 750, 900, 1050, 1200, 1350, 1500];
    // this.baseFrequency = 293.7 / 2;
    this.baseFrequency = 150;
    this.harmonics = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.notes = this.harmonics.map((index) => this.baseFrequency * index);

    // init sine synth
    this.sineSynth.frequency = this.notes[0];

    // init transfert functions
    // this.numberHarmonics = 9;
    // this.pitchMotionTF = createStairTransfertFunction(this.numberHarmonics, 1);
  }

  _getRandomNote() {
    return this.notes[Math.floor(Math.random() * this.notes.length)];
  }

  // @todo - control burst cutoff
  //       - control a visual element too ?
  inputPitchMotion(value) {
    // @note - bad idea to control a discrete event with a continous parameter
    // (cf. collective loops)
    // const stairedValue = this.pitchMotionTF(value);
    // const detune = value * 20 - 10;
    // this.sineSynth.detune = detune;
  }


  inputFireflyFlash(nextTime, period) {
    const now = audioContext.currentTime;

    this.burstSynth.trigger(now);

    // @todo - map to user input
    if (Math.random() < 0.1)
      this.sineSynth.frequency = this._getRandomNote();

    // @todo - rename trigger
    this.sineSynth.trigger(now, period);

    // renderer
    this.burstRenderer.trigger(now);
  }
}
