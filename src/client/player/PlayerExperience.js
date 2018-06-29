import * as soundworks from 'soundworks/client';
import BurstSynth from './synths/BurstSynth';
import SineSynth from './synths/SineSynth';
import Theremin from './synths/Theremin';
import Firefly from './Firefly';
import Score from './Score';

const audioContext = soundworks.audioContext;
const scheduler = soundworks.audio.getScheduler();

class PlayerExperience extends soundworks.Experience {
  constructor(assetsDomain, audioFiles) {
    super();

    this.sharedParams = this.require('shared-params');
    this.processFireflyFlash = this.processFireflyFlash.bind(this);
  }


  start() {
    super.start();

    // global control
    this.sharedParams.addParamListener('reload', () => window.location.reload(true));

    this.firefly = new Firefly(0.8, 1.2, this.processFireflyFlash);

    // init synths
    this.burstSynth = new BurstSynth();
    this.sineSynth = new SineSynth();
    // this.sineSynth = new Theremin();

    this.burstSynth.connect(audioContext.destination);
    this.sineSynth.connect(audioContext.destination);

    // init score
    const { burstSynth, sineSynth } = this;
    this.score = new Score({ burstSynth, sineSynth });

    this.sharedParams.addParamListener('synth:burst:gain', (val) =>  {
      this.burstSynth.gain = val;
    });

    this.sharedParams.addParamListener('synth:burst:cutoffFreq', (val) =>  {
      this.burstSynth.cutoffFreq = val;
    });

    this.sharedParams.addParamListener('synth:sine:level', (val) =>  {
      this.sineSynth.level = val;
    });


    scheduler.add(this.firefly);

    this.receive('process:flash', () => {
      this.firefly.resetTime(audioContext.currentTime);
    });
  }

  processFireflyFlash(time, period) {
    const now = audioContext.currentTime;
    this.score.process(time, period);

    const dt = time - now;

    setTimeout(() => {
      this.send('flash', time);
    }, Math.round(dt * 1000));
  }
}

export default PlayerExperience;
