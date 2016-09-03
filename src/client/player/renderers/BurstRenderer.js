import { Renderer } from 'soundworks/client';
import { getScaler } from 'soundworks/utils/math';

const _2PI = Math.PI * 2;

function shuffle(arr) {
  let x, i, j;
  const l = arr.length;

  for (i = arr.length; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    x = arr[i - 1];
    arr[i - 1] = arr[j];
    arr[j] = x;
  }

  return arr;
}

class Circle {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.originalPosition = { x, y };

    this.reset();
  }

  reset() {
    this.isActive = false;
    this.currentTime = null;
    this.startTime = null;
    this.endTime = null;
    this.radius = null;
    this.radiusDecr = null;
    this.alpha = Math.random();
  }

  update(dt) {
    if (this.currentTime === null) { // is not in the burst

      if (Math.random() < 0.005)
        this.alpha = Math.random();

    } else { // is in the burst but maybe not yet active

      this.currentTime += dt;

      if (this.currentTime > this.endTime) {
        this.reset();
      } else if (this.currentTime > this.startTime) {
        this.isActive = true;
        this.radius -= this.radiusDecr;
      }

    }
  }

  render(ctx, scale) {
    const radius = !this.isActive ? 1 : Math.max(this.radius * scale, 1);
    const x = this.x * scale;
    const y = this.y * scale;

    ctx.beginPath();
    ctx.globalAlpha = this.alpha;
    ctx.arc(x, y, radius, 0, _2PI, false);
    ctx.fill();
    ctx.closePath();
  }
}


export default class BurstRenderer extends Renderer {
  constructor() {
    super();

    this.circles = [];

    this._frequency = 0;
    this._duration = 0;
  }

  set frequency(value) {
    this._frequency = value;
  }

  set duration(value) {
    this._duration = value
  }

  init() {
    super.init();

    // assume a squared world, the window beeing a view on the world
    const nbrPerSide = 10;
    const cellSize = 1 / nbrPerSide;
    const padding = cellSize / 2; // we want circles in middle of the cells
    let id = 0;

    for (let x = padding; x < 1; x += cellSize) {
      for (let y = padding; y < 1; y += cellSize) {
        const _x = Math.round(x * 100) / 100;
        const _y = Math.round(y * 100) / 100;
        this.circles[id] = new Circle(id, _x, _y);
        id += 1;
      }
    }

    this.cellSize = cellSize
  }

  onResize(w, h) {
    super.onResize(w, h);

    this.orientation = w > h ? 'landscape' : 'portrait';
    this.size = Math.max(w, h);
  }

  trigger(now) {
    const duration = this._duration;
    const period = 1 / this._frequency;
    const nbrBursts = Math.floor(duration / period);
    const minRadius = 1 / this.size;
    const lifeDuration = 3 * period;
     // nbr time `render will be called during lifetime
    const nbrRender = lifeDuration / 0.016;

    // pick nbrBursts circles randomly
    let ids = [];
    for (let i = 0; i < this.circles.length; i++)
      ids[i] = i;

    ids = shuffle(ids);

    this.activeCircles = [];

    for (let i = 0; i < nbrBursts; i++) {
      const circle = this.circles[ids[i]];
      circle.currentTime = 0;
      circle.startTime = i * period;
      circle.endTime = circle.startTime + lifeDuration;
      circle.radius = this.cellSize / (2 * (i + 1));
      circle.radiusDecr = (circle.radius - minRadius) / nbrRender;
      circle.alpha = Math.sqrt(1 / i);

      this.activeCircles[i] = circle;
    }
  }

  update(dt) {
    for (let i = 0; i < this.circles.length; i++)
      this.circles[i].update(dt);
  }


  render(ctx) {
    ctx.save();
    // translate world's [0.5, 0.5] in center of the screen
    let x = 0;
    let y = 0;

    if (this.orientation === 'portrait')
      x = -1 * (this.size - this.canvasWidth) / 2;
    else
      y = -1 * (this.size - this.canvasHeight) / 2;

    ctx.translate(x, y);

    for (let i = 0; i < this.circles.length; i++) {
      ctx.fillStyle = '#ffffff';
      this.circles[i].render(ctx, this.size);
    }

    ctx.restore();
  }
}
