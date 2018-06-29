'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _client = require('soundworks/client');

var _math = require('soundworks/utils/math');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _2PI = Math.PI * 2;

function shuffle(arr) {
  var x = void 0,
      i = void 0,
      j = void 0;
  var l = arr.length;

  for (i = arr.length; i > 0; i--) {
    var _j = Math.floor(Math.random() * i);
    x = arr[i - 1];
    arr[i - 1] = arr[_j];
    arr[_j] = x;
  }

  return arr;
}

var Circle = function () {
  function Circle(id, x, y) {
    (0, _classCallCheck3.default)(this, Circle);

    this.id = id;
    this.x = x;
    this.y = y;
    this.originalPosition = { x: x, y: y };

    this.reset();
  }

  (0, _createClass3.default)(Circle, [{
    key: 'reset',
    value: function reset() {
      this.isActive = false;
      this.currentTime = null;
      this.startTime = null;
      this.endTime = null;
      this.radius = null;
      this.radiusDecr = null;
      this.alpha = Math.random();
    }
  }, {
    key: 'update',
    value: function update(dt) {
      if (this.currentTime === null) {
        // is not in the burst

        if (Math.random() < 0.005) this.alpha = Math.random();
      } else {
        // is in the burst but maybe not yet active

        this.currentTime += dt;

        if (this.currentTime > this.endTime) {
          this.reset();
        } else if (this.currentTime > this.startTime) {
          this.isActive = true;
          this.radius -= this.radiusDecr;
        }
      }
    }
  }, {
    key: 'render',
    value: function render(ctx, scale) {
      var radius = !this.isActive ? 1 : Math.max(this.radius * scale, 1);
      var x = this.x * scale;
      var y = this.y * scale;

      ctx.beginPath();
      ctx.globalAlpha = this.alpha;
      ctx.arc(x, y, radius, 0, _2PI, false);
      ctx.fill();
      ctx.closePath();
    }
  }]);
  return Circle;
}();

var BurstRenderer = function (_Renderer) {
  (0, _inherits3.default)(BurstRenderer, _Renderer);

  function BurstRenderer() {
    (0, _classCallCheck3.default)(this, BurstRenderer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BurstRenderer.__proto__ || (0, _getPrototypeOf2.default)(BurstRenderer)).call(this));

    _this.circles = [];

    _this._frequency = 0;
    _this._duration = 0;
    return _this;
  }

  (0, _createClass3.default)(BurstRenderer, [{
    key: 'init',
    value: function init() {
      (0, _get3.default)(BurstRenderer.prototype.__proto__ || (0, _getPrototypeOf2.default)(BurstRenderer.prototype), 'init', this).call(this);

      // assume a squared world, the window beeing a view on the world
      var nbrPerSide = 10;
      var cellSize = 1 / nbrPerSide;
      var padding = cellSize / 2; // we want circles in middle of the cells
      var id = 0;

      for (var x = padding; x < 1; x += cellSize) {
        for (var y = padding; y < 1; y += cellSize) {
          var _x = Math.round(x * 100) / 100;
          var _y = Math.round(y * 100) / 100;
          this.circles[id] = new Circle(id, _x, _y);
          id += 1;
        }
      }

      this.cellSize = cellSize;
    }
  }, {
    key: 'onResize',
    value: function onResize(w, h) {
      (0, _get3.default)(BurstRenderer.prototype.__proto__ || (0, _getPrototypeOf2.default)(BurstRenderer.prototype), 'onResize', this).call(this, w, h);

      this.orientation = w > h ? 'landscape' : 'portrait';
      this.size = Math.max(w, h);
    }
  }, {
    key: 'trigger',
    value: function trigger(now) {
      var duration = this._duration;
      var period = 1 / this._frequency;
      var nbrBursts = Math.floor(duration / period);
      var minRadius = 1 / this.size;
      var lifeDuration = 3 * period;
      // nbr time `render will be called during lifetime
      var nbrRender = lifeDuration / 0.016;

      // pick nbrBursts circles randomly
      var ids = [];
      for (var i = 0; i < this.circles.length; i++) {
        ids[i] = i;
      }ids = shuffle(ids);

      this.activeCircles = [];

      for (var _i = 0; _i < nbrBursts; _i++) {
        var circle = this.circles[ids[_i]];
        circle.currentTime = 0;
        circle.startTime = _i * period;
        circle.endTime = circle.startTime + lifeDuration;
        circle.radius = this.cellSize / (2 * (_i + 1));
        circle.radiusDecr = (circle.radius - minRadius) / nbrRender;
        circle.alpha = Math.sqrt(1 / _i);

        this.activeCircles[_i] = circle;
      }
    }
  }, {
    key: 'update',
    value: function update(dt) {
      for (var i = 0; i < this.circles.length; i++) {
        this.circles[i].update(dt);
      }
    }
  }, {
    key: 'render',
    value: function render(ctx) {
      ctx.save();
      // translate world's [0.5, 0.5] in center of the screen
      var x = 0;
      var y = 0;

      if (this.orientation === 'portrait') x = -1 * (this.size - this.canvasWidth) / 2;else y = -1 * (this.size - this.canvasHeight) / 2;

      ctx.translate(x, y);

      for (var i = 0; i < this.circles.length; i++) {
        ctx.fillStyle = '#ffffff';
        this.circles[i].render(ctx, this.size);
      }

      ctx.restore();
    }
  }, {
    key: 'frequency',
    set: function set(value) {
      this._frequency = value;
    }
  }, {
    key: 'duration',
    set: function set(value) {
      this._duration = value;
    }
  }]);
  return BurstRenderer;
}(_client.Renderer);

exports.default = BurstRenderer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJ1cnN0UmVuZGVyZXIuanMiXSwibmFtZXMiOlsiXzJQSSIsIk1hdGgiLCJQSSIsInNodWZmbGUiLCJhcnIiLCJ4IiwiaSIsImoiLCJsIiwibGVuZ3RoIiwiZmxvb3IiLCJyYW5kb20iLCJDaXJjbGUiLCJpZCIsInkiLCJvcmlnaW5hbFBvc2l0aW9uIiwicmVzZXQiLCJpc0FjdGl2ZSIsImN1cnJlbnRUaW1lIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsInJhZGl1cyIsInJhZGl1c0RlY3IiLCJhbHBoYSIsImR0IiwiY3R4Iiwic2NhbGUiLCJtYXgiLCJiZWdpblBhdGgiLCJnbG9iYWxBbHBoYSIsImFyYyIsImZpbGwiLCJjbG9zZVBhdGgiLCJCdXJzdFJlbmRlcmVyIiwiY2lyY2xlcyIsIl9mcmVxdWVuY3kiLCJfZHVyYXRpb24iLCJuYnJQZXJTaWRlIiwiY2VsbFNpemUiLCJwYWRkaW5nIiwiX3giLCJyb3VuZCIsIl95IiwidyIsImgiLCJvcmllbnRhdGlvbiIsInNpemUiLCJub3ciLCJkdXJhdGlvbiIsInBlcmlvZCIsIm5ickJ1cnN0cyIsIm1pblJhZGl1cyIsImxpZmVEdXJhdGlvbiIsIm5iclJlbmRlciIsImlkcyIsImFjdGl2ZUNpcmNsZXMiLCJjaXJjbGUiLCJzcXJ0IiwidXBkYXRlIiwic2F2ZSIsImNhbnZhc1dpZHRoIiwiY2FudmFzSGVpZ2h0IiwidHJhbnNsYXRlIiwiZmlsbFN0eWxlIiwicmVuZGVyIiwicmVzdG9yZSIsInZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVBLElBQU1BLE9BQU9DLEtBQUtDLEVBQUwsR0FBVSxDQUF2Qjs7QUFFQSxTQUFTQyxPQUFULENBQWlCQyxHQUFqQixFQUFzQjtBQUNwQixNQUFJQyxVQUFKO0FBQUEsTUFBT0MsVUFBUDtBQUFBLE1BQVVDLFVBQVY7QUFDQSxNQUFNQyxJQUFJSixJQUFJSyxNQUFkOztBQUVBLE9BQUtILElBQUlGLElB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LEtBR0U5QyxJQUFJLENBQUMsQ0FBRCxJQUFNLEtBQUtnQyxJQUFMLEdBQVksS0FBS2UsWUFBdkIsSUFBdUMsQ0FBM0M7O0FBRUZwQyxVQUFJcUMsU0FBSixDQUFjekQsQ0FBZCxFQUFpQlMsQ0FBakI7O0FBRUEsV0FBSyxJQUFJUixJQUFJLENBQWIsRUFBZ0JBLElBQUksS0FBSzRCLE9BQUwsQ0FBYXpCLE1BQWpDLEVBQXlDSCxHQUF6QyxFQUE4QztBQUM1Q21CLFlBQUlzQyxTQUFKLEdBQWdCLFNBQWhCO0FBQ0EsYUFBSzdCLE9BQUwsQ0FBYTVCLENBQWIsRUFBZ0IwRCxNQUFoQixDQUF1QnZDLEdBQXZCLEVBQTRCLEtBQUtxQixJQUFqQztBQUNEOztBQUVEckIsVUFBSXdDLE9BQUo7QUFDRDs7O3NCQTVGYUMsSyxFQUFPO0FBQ25CLFdBQUsvQixVQUFMLEdBQWtCK0IsS0FBbEI7QUFDRDs7O3NCQUVZQSxLLEVBQU87QUFDbEIsV0FBSzlCLFNBQUwsR0FBaUI4QixLQUFqQjtBQUNEOzs7OztrQkFoQmtCakMsYSIsImZpbGUiOiJCdXJzdFJlbmRlcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tICdzb3VuZHdvcmtzL2NsaWVudCc7XG5pbXBvcnQgeyBnZXRTY2FsZXIgfSBmcm9tICdzb3VuZHdvcmtzL3V0aWxzL21hdGgnO1xuXG5jb25zdCBfMlBJID0gTWF0aC5QSSAqIDI7XG5cbmZ1bmN0aW9uIHNodWZmbGUoYXJyKSB7XG4gIGxldCB4LCBpLCBqO1xuICBjb25zdCBsID0gYXJyLmxlbmd0aDtcblxuICBmb3IgKGkgPSBhcnIubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgY29uc3QgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGkpO1xuICAgIHggPSBhcnJbaSAtIDFdO1xuICAgIGFycltpIC0gMV0gPSBhcnJbal07XG4gICAgYXJyW2pdID0geDtcbiAgfVxuXG4gIHJldHVybiBhcnI7XG59XG5cbmNsYXNzIENpcmNsZSB7XG4gIGNvbnN0cnVjdG9yKGlkLCB4LCB5KSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLm9yaWdpbmFsUG9zaXRpb24gPSB7IHgsIHkgfTtcblxuICAgIHRoaXMucmVzZXQoKTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLmN1cnJlbnRUaW1lID0gbnVsbDtcbiAgICB0aGlzLnN0YXJ0VGltZSA9IG51bGw7XG4gICAgdGhpcy5lbmRUaW1lID0gbnVsbDtcbiAgICB0aGlzLnJhZGl1cyA9IG51bGw7XG4gICAgdGhpcy5yYWRpdXNEZWNyID0gbnVsbDtcbiAgICB0aGlzLmFscGhhID0gTWF0aC5yYW5kb20oKTtcbiAgfVxuXG4gIHVwZGF0ZShkdCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRUaW1lID09PSBudWxsKSB7IC8vIGlzIG5vdCBpbiB0aGUgYnVyc3RcblxuICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCAwLjAwNSlcbiAgICAgICAgdGhpcy5hbHBoYSA9IE1hdGgucmFuZG9tKCk7XG5cbiAgICB9IGVsc2UgeyAvLyBpcyBpbiB0aGUgYnVyc3QgYnV0IG1heWJlIG5vdCB5ZXQgYWN0aXZlXG5cbiAgICAgIHRoaXMuY3VycmVudFRpbWUgKz0gZHQ7XG5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRUaW1lID4gdGhpcy5lbmRUaW1lKSB7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50VGltZSA+IHRoaXMuc3RhcnRUaW1lKSB7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJhZGl1cyAtPSB0aGlzLnJhZGl1c0RlY3I7XG4gICAgICB9XG5cbiAgICB9XG4gIH1cblxuICByZW5kZXIoY3R4LCBzY2FsZSkge1xuICAgIGNvbnN0IHJhZGl1cyA9ICF0aGlzLmlzQWN0aXZlID8gMSA6IE1hdGgubWF4KHRoaXMucmFkaXVzICogc2NhbGUsIDEpO1xuICAgIGNvbnN0IHggPSB0aGlzLnggKiBzY2FsZTtcbiAgICBjb25zdCB5ID0gdGhpcy55ICogc2NhbGU7XG5cbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lmdsb2JhbEFscGhhID0gdGhpcy5hbHBoYTtcbiAgICBjdHguYXJjKHgsIHksIHJhZGl1cywgMCwgXzJQSSwgZmFsc2UpO1xuICAgIGN0eC5maWxsKCk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVyc3RSZW5kZXJlciBleHRlbmRzIFJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuY2lyY2xlcyA9IFtdO1xuXG4gICAgdGhpcy5fZnJlcXVlbmN5ID0gMDtcbiAgICB0aGlzLl9kdXJhdGlvbiA9IDA7XG4gIH1cblxuICBzZXQgZnJlcXVlbmN5KHZhbHVlKSB7XG4gICAgdGhpcy5fZnJlcXVlbmN5ID0gdmFsdWU7XG4gIH1cblxuICBzZXQgZHVyYXRpb24odmFsdWUpIHtcbiAgICB0aGlzLl9kdXJhdGlvbiA9IHZhbHVlXG4gIH1cblxuICBpbml0KCkge1xuICAgIHN1cGVyLmluaXQoKTtcblxuICAgIC8vIGFzc3VtZSBhIHNxdWFyZWQgd29ybGQsIHRoZSB3aW5kb3cgYmVlaW5nIGEgdmlldyBvbiB0aGUgd29ybGRcbiAgICBjb25zdCBuYnJQZXJTaWRlID0gMTA7XG4gICAgY29uc3QgY2VsbFNpemUgPSAxIC8gbmJyUGVyU2lkZTtcbiAgICBjb25zdCBwYWRkaW5nID0gY2VsbFNpemUgLyAyOyAvLyB3ZSB3YW50IGNpcmNsZXMgaW4gbWlkZGxlIG9mIHRoZSBjZWxsc1xuICAgIGxldCBpZCA9IDA7XG5cbiAgICBmb3IgKGxldCB4ID0gcGFkZGluZzsgeCA8IDE7IHggKz0gY2VsbFNpemUpIHtcbiAgICAgIGZvciAobGV0IHkgPSBwYWRkaW5nOyB5IDwgMTsgeSArPSBjZWxsU2l6ZSkge1xuICAgICAgICBjb25zdCBfeCA9IE1hdGgucm91bmQoeCAqIDEwMCkgLyAxMDA7XG4gICAgICAgIGNvbnN0IF95ID0gTWF0aC5yb3VuZCh5ICogMTAwKSAvIDEwMDtcbiAgICAgICAgdGhpcy5jaXJjbGVzW2lkXSA9IG5ldyBDaXJjbGUoaWQsIF94LCBfeSk7XG4gICAgICAgIGlkICs9IDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jZWxsU2l6ZSA9IGNlbGxTaXplXG4gIH1cblxuICBvblJlc2l6ZSh3LCBoKSB7XG4gICAgc3VwZXIub25SZXNpemUodywgaCk7XG5cbiAgICB0aGlzLm9yaWVudGF0aW9uID0gdyA+IGggPyAnbGFuZHNjYXBlJyA6ICdwb3J0cmFpdCc7XG4gICAgdGhpcy5zaXplID0gTWF0aC5tYXgodywgaCk7XG4gIH1cblxuICB0cmlnZ2VyKG5vdykge1xuICAgIGNvbnN0IGR1cmF0aW9uID0gdGhpcy5fZHVyYXRpb247XG4gICAgY29uc3QgcGVyaW9kID0gMSAvIHRoaXMuX2ZyZXF1ZW5jeTtcbiAgICBjb25zdCBuYnJCdXJzdHMgPSBNYXRoLmZsb29yKGR1cmF0aW9uIC8gcGVyaW9kKTtcbiAgICBjb25zdCBtaW5SYWRpdXMgPSAxIC8gdGhpcy5zaXplO1xuICAgIGNvbnN0IGxpZmVEdXJhdGlvbiA9IDMgKiBwZXJpb2Q7XG4gICAgIC8vIG5iciB0aW1lIGByZW5kZXIgd2lsbCBiZSBjYWxsZWQgZHVyaW5nIGxpZmV0aW1lXG4gICAgY29uc3QgbmJyUmVuZGVyID0gbGlmZUR1cmF0aW9uIC8gMC4wMTY7XG5cbiAgICAvLyBwaWNrIG5ickJ1cnN0cyBjaXJjbGVzIHJhbmRvbWx5XG4gICAgbGV0IGlkcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaXJjbGVzLmxlbmd0aDsgaSsrKVxuICAgICAgaWRzW2ldID0gaTtcblxuICAgIGlkcyA9IHNodWZmbGUoaWRzKTtcblxuICAgIHRoaXMuYWN0aXZlQ2lyY2xlcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYnJCdXJzdHM7IGkrKykge1xuICAgICAgY29uc3QgY2lyY2xlID0gdGhpcy5jaXJjbGVzW2lkc1tpXV07XG4gICAgICBjaXJjbGUuY3VycmVudFRpbWUgPSAwO1xuICAgICAgY2lyY2xlLnN0YXJ0VGltZSA9IGkgKiBwZXJpb2Q7XG4gICAgICBjaXJjbGUuZW5kVGltZSA9IGNpcmNsZS5zdGFydFRpbWUgKyBsaWZlRHVyYXRpb247XG4gICAgICBjaXJjbGUucmFkaXVzID0gdGhpcy5jZWxsU2l6ZSAvICgyICogKGkgKyAxKSk7XG4gICAgICBjaXJjbGUucmFkaXVzRGVjciA9IChjaXJjbGUucmFkaXVzIC0gbWluUmFkaXVzKSAvIG5iclJlbmRlcjtcbiAgICAgIGNpcmNsZS5hbHBoYSA9IE1hdGguc3FydCgxIC8gaSk7XG5cbiAgICAgIHRoaXMuYWN0aXZlQ2lyY2xlc1tpXSA9IGNpcmNsZTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGUoZHQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2lyY2xlcy5sZW5ndGg7IGkrKylcbiAgICAgIHRoaXMuY2lyY2xlc1tpXS51cGRhdGUoZHQpO1xuICB9XG5cblxuICByZW5kZXIoY3R4KSB7XG4gICAgY3R4LnNhdmUoKTtcbiAgICAvLyB0cmFuc2xhdGUgd29ybGQncyBbMC41LCAwLjVdIGluIGNlbnRlciBvZiB0aGUgc2NyZWVuXG4gICAgbGV0IHggPSAwO1xuICAgIGxldCB5ID0gMDtcblxuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAncG9ydHJhaXQnKVxuICAgICAgeCA9IC0xICogKHRoaXMuc2l6ZSAtIHRoaXMuY2FudmFzV2lkdGgpIC8gMjtcbiAgICBlbHNlXG4gICAgICB5ID0gLTEgKiAodGhpcy5zaXplIC0gdGhpcy5jYW52YXNIZWlnaHQpIC8gMjtcblxuICAgIGN0eC50cmFuc2xhdGUoeCwgeSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2lyY2xlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjZmZmZmZmJztcbiAgICAgIHRoaXMuY2lyY2xlc1tpXS5yZW5kZXIoY3R4LCB0aGlzLnNpemUpO1xuICAgIH1cblxuICAgIGN0eC5yZXN0b3JlKCk7XG4gIH1cbn1cbiJdfQ==