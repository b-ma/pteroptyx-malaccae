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

class Score {
  constructor(synths) {
    this.burstSynth = synths.burstSynth;
    this.sineSynth = synths.sineSynth;

    this.state = 'default';

    this.baseFrequency = 150;
    this.harmonics = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.notes = this.harmonics.map((index) => this.baseFrequency * index);

    // init synths
    this.burstSynth.frequency = this.notes[0] / 32; // / 64;
    this.sineSynth.frequency = this.notes[0];
  }

  process(time, period) {
    // const now = audioContext.currentTime;
    if (Math.random() < 0.1) {
      const frequency = this.notes[Math.floor(Math.random() * this.notes.length)];
      this.burstSynth.frequency = frequency / 32; // / 64;
      this.sineSynth.frequency = frequency;
    }

    this.burstSynth.trigger(time, period * 5);
    this.sineSynth.trigger(time, period);
  }
}

export default Score
