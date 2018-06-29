'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _client = require('soundworks/client');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sampleRate = _client.audioContext.sampleRate;
var scheduler = _client.audio.getScheduler();

function getDecayFactor(period, duration) {
  var gainStart = 1;
  var gainEnd = 0.0001;

  var factor = Math.pow(gainStart / gainEnd, -period / duration);
  return factor;
}

var NoiseBurst = function (_audio$TimeEngine) {
  (0, _inherits3.default)(NoiseBurst, _audio$TimeEngine);

  function NoiseBurst(frequency, duration, buffer) {
    (0, _classCallCheck3.default)(this, NoiseBurst);

    var _this = (0, _possibleConstructorReturn3.default)(this, (NoiseBurst.__proto__ || (0, _getPrototypeOf2.default)(NoiseBurst)).call(this));

    _this.duration = duration;
    _this.buffer = buffer;

    _this.period = 1 / frequency;
    _this.decayFactor = getDecayFactor(_this.period, _this.duration);

    _this.output = _client.audioContext.createGain();
    _this.output.gain.value = 1;

    _this.hasStarted = false;
    return _this;
  }

  (0, _createClass3.default)(NoiseBurst, [{
    key: 'advanceTime',
    value: function advanceTime(time) {
      if (this.hasStarted) this.output.gain.value *= this.decayFactor;

      this.hasStarted = true;

      var source = _client.audioContext.createBufferSource();
      source.connect(this.output);
      source.buffer = this.buffer;
      source.start(time);

      if (this.output.gain.value > 0.0001) return time + this.period;else return null;
    }
  }]);
  return NoiseBurst;
}(_client.audio.TimeEngine);

var FireflySynth = function () {
  function FireflySynth(buffers) {
    (0, _classCallCheck3.default)(this, FireflySynth);

    // shared-params
    this.frequency = 0;

    this.output = _client.audioContext.createGain();

    this.volume = _client.audioContext.createGain();
    this.volume.connect(this.output);
    this.volume.gain.value = 0;

    this.lowpass = _client.audioContext.createBiquadFilter();
    this.lowpass.connect(this.volume);
    this.lowpass.frequency.value = 400;

    this.buffer = _client.audioContext.createBuffer(1, 4, sampleRate);
    var data = this.buffer.getChannelData(0);
    data[0] = 1;
    // data[1] = -0.5; // @note - good for mobile but not desktop
    // data[2] = 0.25;
    // data[3] = -0.125;
  }

  (0, _createClass3.default)(FireflySynth, [{
    key: 'connect',
    value: function connect(destination) {
      this.output.connect(destination);
    }

    // map [1, 0] to [maxGain, 0]
    // @todo - map to user input

  }, {
    key: 'trigger',
    value: function trigger(time, period) {
      var frequency = this.frequency,
          buffer = this.buffer;


      this.noiseBurst = new NoiseBurst(frequency, period, buffer);
      this.noiseBurst.output.connect(this.lowpass);
      scheduler.add(this.noiseBurst, time);
    }
  }, {
    key: 'gain',
    set: function set(value) {
      this.volume.gain.value = value;
    }

    // @todo - map to user input

  }, {
    key: 'cutoffFreq',
    set: function set(value) {
      this.lowpass.frequency.value = value;
    }
  }]);
  return FireflySynth;
}();

exports.default = FireflySynth;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJ1cnN0U3ludGguanMiXSwibmFtZXMiOlsic2FtcGxlUmF0ZSIsInNjaGVkdWxlciIsImdldFNjaGVkdWxlciIsImdldERlY2F5RmFjdG9yIiwicGVyaW9kIiwiZHVyYXRpb24iLCJnYWluU3RhcnQiLCJnYWluRW5kIiwiZmFjdG9yIiwiTWF0aCIsInBvdyIsIk5vaXNlQnVyc3QiLCJmcmVxdWVuY3kiLCJidWZmZXIiLCJkZWNheUZhY3RvciIsIm91dHB1dCIsImNyZWF0ZUdhaW4iLCJnYWluIiwidmFsdWUiLCJoYXNTdGFydGVkIiwidGltZSIsInNvdXJjZSIsImNyZWF0ZUJ1ZmZlclNvdXJjZSIsImNvbm5lY3QiLCJzdGFydCIsIlRpbWVFbmdpbmUiLCJGaXJlZmx5U3ludGgiLCJidWZmZXJzIiwidm9sdW1lIiwibG93cGFzcyIsImNyZWF0ZUJpcXVhZEZpbHRlciIsImNyZWF0ZUJ1ZmZlciIsImRhdGEiLCJnZXRDaGFubmVsRGF0YSIsImRlc3RpbmF0aW9uIiwibm9pc2VCdXJzdCIsImFkZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBLElBQU1BLGFBQWEscUJBQWFBLFVBQWhDO0FBQ0EsSUFBTUMsWUFBWSxjQUFNQyxZQUFOLEVBQWxCOztBQUVBLFNBQVNDLGNBQVQsQ0FBd0JDLE1BQXhCLEVBQWdDQyxRQUFoQyxFQUEwQztBQUN4QyxNQUFNQyxZQUFZLENBQWxCO0FBQ0EsTUFBTUMsVUFBVSxNQUFoQjs7QUFFQSxNQUFNQyxTQUFTQyxLQUFLQyxHQUFMLENBQVNKLFlBQVlDLE9BQXJCLEVBQThCLENBQUVILE1BQUYsR0FBV0MsUUFBekMsQ0FBZjtBQUNBLFNBQU9HLE1BQVA7QUFDRDs7SUFFS0csVTs7O0FBQ0osc0JBQVlDLFNBQVosRUFBdUJQLFFBQXZCLEVBQWlDUSxNQUFqQyxFQUF5QztBQUFBOztBQUFBOztBQUd2QyxVQUFLUixRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFVBQUtRLE1BQUwsR0FB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aW9Db250ZXh0IH0gZnJvbSAnc291bmR3b3Jrcy9jbGllbnQnO1xuXG5jb25zdCBzYW1wbGVSYXRlID0gYXVkaW9Db250ZXh0LnNhbXBsZVJhdGU7XG5jb25zdCBzY2hlZHVsZXIgPSBhdWRpby5nZXRTY2hlZHVsZXIoKTtcblxuZnVuY3Rpb24gZ2V0RGVjYXlGYWN0b3IocGVyaW9kLCBkdXJhdGlvbikge1xuICBjb25zdCBnYWluU3RhcnQgPSAxO1xuICBjb25zdCBnYWluRW5kID0gMC4wMDAxO1xuXG4gIGNvbnN0IGZhY3RvciA9IE1hdGgucG93KGdhaW5TdGFydCAvIGdhaW5FbmQsIC0gcGVyaW9kIC8gZHVyYXRpb24pO1xuICByZXR1cm4gZmFjdG9yO1xufVxuXG5jbGFzcyBOb2lzZUJ1cnN0IGV4dGVuZHMgYXVkaW8uVGltZUVuZ2luZSB7XG4gIGNvbnN0cnVjdG9yKGZyZXF1ZW5jeSwgZHVyYXRpb24sIGJ1ZmZlcinCoHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5kdXJhdGlvbiA9IGR1cmF0aW9uO1xuICAgIHRoaXMuYnVmZmVyID0gYnVmZmVyO1xuXG4gICAgdGhpcy5wZXJpb2QgPSAxIC8gZnJlcXVlbmN5O1xuICAgIHRoaXMuZGVjYXlGYWN0b3IgPSBnZXREZWNheUZhY3Rvcih0aGlzLnBlcmlvZCwgdGhpcy5kdXJhdGlvbik7XG5cbiAgICB0aGlzLm91dHB1dCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XG4gICAgdGhpcy5vdXRwdXQuZ2Fpbi52YWx1ZSA9IDE7XG5cbiAgICB0aGlzLmhhc1N0YXJ0ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIGFkdmFuY2VUaW1lKHRpbWUpIHtcbiAgICBpZiAodGhpcy5oYXNTdGFydGVkKVxuICAgICAgdGhpcy5vdXRwdXQuZ2Fpbi52YWx1ZSAqPSB0aGlzLmRlY2F5RmFjdG9yO1xuXG4gICAgdGhpcy5oYXNTdGFydGVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IHNvdXJjZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICBzb3VyY2UuY29ubmVjdCh0aGlzLm91dHB1dCk7XG4gICAgc291cmNlLmJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgIHNvdXJjZS5zdGFydCh0aW1lKTtcblxuICAgIGlmICh0aGlzLm91dHB1dC5nYWluLnZhbHVlID4gMC4wMDAxKVxuICAgICAgcmV0dXJuIHRpbWUgKyB0aGlzLnBlcmlvZDtcbiAgICBlbHNlXG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5jbGFzcyBGaXJlZmx5U3ludGgge1xuICBjb25zdHJ1Y3RvcihidWZmZXJzKSB7XG4gICAgLy8gc2hhcmVkLXBhcmFtc1xuICAgIHRoaXMuZnJlcXVlbmN5ID0gMDtcblxuICAgIHRoaXMub3V0cHV0ID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcblxuICAgIHRoaXMudm9sdW1lID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcbiAgICB0aGlzLnZvbHVtZS5jb25uZWN0KHRoaXMub3V0cHV0KTtcbiAgICB0aGlzLnZvbHVtZS5nYWluLnZhbHVlID0gMDtcblxuICAgIHRoaXMubG93cGFzcyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCaXF1YWRGaWx0ZXIoKTtcbiAgICB0aGlzLmxvd3Bhc3MuY29ubmVjdCh0aGlzLnZvbHVtZSk7XG4gICAgdGhpcy5sb3dwYXNzLmZyZXF1ZW5jeS52YWx1ZSA9IDQwMDtcblxuICAgIHRoaXMuYnVmZmVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlcigxLCA0LCBzYW1wbGVSYXRlKTtcbiAgICBjb25zdCBkYXRhID0gdGhpcy5idWZmZXIuZ2V0Q2hhbm5lbERhdGEoMCk7XG4gICAgZGF0YVswXSA9IDE7XG4gICAgLy8gZGF0YVsxXSA9IC0wLjU7IC8vIEBub3RlIC0gZ29vZCBmb3IgbW9iaWxlIGJ1dCBub3QgZGVza3RvcFxuICAgIC8vIGRhdGFbMl0gPSAwLjI1O1xuICAgIC8vIGRhdGFbM10gPSAtMC4xMjU7XG4gIH1cblxuICBjb25uZWN0KGRlc3RpbmF0aW9uKSB7XG4gICAgdGhpcy5vdXRwdXQuY29ubmVjdChkZXN0aW5hdGlvbik7XG4gIH1cblxuICAvLyBtYXAgWzEsIDBdIHRvIFttYXhHYWluLCAwXVxuICAvLyBAdG9kbyAtIG1hcCB0byB1c2VyIGlucHV0XG4gIHNldCBnYWluKHZhbHVlKSB7XG4gICAgdGhpcy52b2x1bWUuZ2Fpbi52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgLy8gQHRvZG8gLSBtYXAgdG8gdXNlciBpbnB1dFxuICBzZXQgY3V0b2ZmRnJlcSh2YWx1ZSkge1xuICAgIHRoaXMubG93cGFzcy5mcmVxdWVuY3kudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHRyaWdnZXIodGltZSwgcGVyaW9kKSB7XG4gICAgY29uc3QgeyBmcmVxdWVuY3ksIGJ1ZmZlciB9ID0gdGhpcztcblxuICAgIHRoaXMubm9pc2VCdXJzdCA9IG5ldyBOb2lzZUJ1cnN0KGZyZXF1ZW5jeSwgcGVyaW9kLCBidWZmZXIpO1xuICAgIHRoaXMubm9pc2VCdXJzdC5vdXRwdXQuY29ubmVjdCh0aGlzLmxvd3Bhc3MpO1xuICAgIHNjaGVkdWxlci5hZGQodGhpcy5ub2lzZUJ1cnN0LCB0aW1lKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBGaXJlZmx5U3ludGg7XG4iXX0=