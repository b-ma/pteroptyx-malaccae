import * as soundworks from 'soundworks/client';
import Firefly from './Firefly';

// synths
import BurstSynth from './synths/BurstSynth';
import SineSynth from './synths/SineSynth';

// renderers
import BurstRenderer from './renderers/BurstRenderer';

// score
import Score from './Score';

// utils
import inputFormatter from './inputFormatter';

const audioContext = soundworks.audioContext;

const viewTemplate = `
  <canvas class="background"></canvas>
  <div class="foreground">
    <div class="section-top flex-middle"></div>
    <div class="section-center flex-center">

    </div>
    <div class="section-bottom flex-middle"></div>
  </div>
`;

// this experience plays a sound when it starts, and plays another sound when
// other clients join the experience
export default class PlayerExperience extends soundworks.Experience {
  constructor(assetsDomain, audioFiles) {
    super();

    this.platform = this.require('platform', { features: ['web-audio'] });
    this.checkin = this.require('checkin', { showDialog: false });
    this.sharedParams = this.require('shared-params');
    this.motionInput = this.require('motion-input', { descriptors: ['orientation'] });

    // @todo - improve
    this.master = this.require('audio-master');

    this.loader = this.require('loader', {
      assetsDomain: assetsDomain,
      files: audioFiles,
    });

    this.processOrientation = this.processOrientation.bind(this);
    this.processFireflyFlash = this.processFireflyFlash.bind(this);
  }

  init() {
    this.viewTemplate = viewTemplate;
    this.viewContent = { title: `Let's go!` };
    this.viewCtor = soundworks.CanvasView;
    this.viewOptions = { preservePixelRatio: true };
    this.view = this.createView();
  }

  start() {
    super.start();

    if (!this.hasStarted)
      this.init();

    this.show();

    // global control
    this.sharedParams.addParamListener('reload', () => window.location.reload(true));

    // init firefly
    this.firefly = new Firefly(0.8, 1.2, function() {
      return audioContext.currentTime
    }, this.processFireflyFlash);


    // init synths
    this.burstSynth = new BurstSynth();
    this.sineSynth = new SineSynth();

    this.burstSynth.output.connect(this.master.input);
    this.sineSynth.output.connect(this.master.input);

    // burst renderer
    this.burstRenderer = new BurstRenderer();
    this.view.addRenderer(this.burstRenderer);
    this.view.setPreRender(function(ctx, dt) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    });

    this._initBurstControls();
    this._initSineControls();

    // init score
    const { burstSynth, sineSynth } = this;
    const { burstRenderer } = this;
    this.score = new Score({ burstSynth, sineSynth }, { burstRenderer });

    // set inputs
    if (this.motionInput.isAvailable('orientation')) {
      this.motionInput.addListener('orientation', this.processOrientation);
    } else {
      // fallback on random (or do nothing)
    }

    // F*** async
    setTimeout(() => {
      this.receive('process:flash', () => this.firefly.processFlash());
      this.firefly.flash();
    }, 0);
  }

  _initBurstControls() {
    // synths controls
    this.sharedParams.addParamListener('synth:burst:frequency', (val) =>  {
      this.burstSynth.frequency = val;
      this.burstRenderer.frequency = val;
    });

    this.sharedParams.addParamListener('synth:burst:duration', (val) =>  {
      this.burstSynth.duration = val;
      this.burstRenderer.duration = val;
    });

    this.sharedParams.addParamListener('synth:burst:maxGain', (val) =>  {
      this.burstSynth.maxGain = val;
    });

    this.sharedParams.addParamListener('synth:burst:level', (val) =>  {
      this.burstSynth.level = val;
    });

    this.sharedParams.addParamListener('synth:burst:cutoffFreq', (val) =>  {
      this.burstSynth.cutoffFreq = val;
    });
  }

  _initSineControls() {
    this.sharedParams.addParamListener('synth:sine:level', (val) =>  {
      this.sineSynth.level = val;
    });
  }

  // inputs to score
  processOrientation(data) {
    const normPitch = inputFormatter.processPitchMotion(data[1]);
    this.score.inputPitchMotion(normPitch);
  }

  processFireflyFlash(nextTime, period) {
    // @todo - should be done through score
    this.score.inputFireflyFlash(nextTime, period);
    this.send('flash');
  }
}
