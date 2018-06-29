'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _client = require('soundworks/client');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SineSynth = function () {
  function SineSynth(buffers) {
    (0, _classCallCheck3.default)(this, SineSynth);

    this._frequency = 0;
    // this._detune = 0;

    this.output = _client.audioContext.createGain();
    this.output.gain.value = 0.6;

    // this.lowpass = audioContext.createBiquadFilter();
    // this.lowpass.connect(this.output);
    // this.lowpass.type = 'lowpass';
    // this.lowpass.frequency.value = 100;
  }

  (0, _createClass3.default)(SineSynth, [{
    key: 'connect',
    value: function connect(destination) {
      this.output.connect(destination);
    }
  }, {
    key: 'trigger',
    value: function trigger(time, period) {
      var fadeInDuration = period;
      var duration = period * (Math.random() * 2 + 1);

      var env = _client.audioContext.createGain();
      env.connect(this.output);
      env.gain.value = 0;
      env.gain.setValueAtTime(0, time);
      env.gain.linearRampToValueAtTime(1, time + fadeInDuration);
      env.gain.linearRampToValueAtTime(0, time + duration);

      var sine = _client.audioContext.createOscillator();
      sine.connect(env);

      sine.frequency.value = this._frequency;
      sine.detune.value = Math.random() * 20 - 10;

      sine.start(time);
      sine.stop(time + duration);
    }
  }, {
    key: 'frequency',
    set: function set(value) {
      this._frequency = value;
    }
  }, {
    key: 'level',
    set: function set(value) {
      this.output.gain.value = value;
    }
  }]);
  return SineSynth;
}();

exports.default = SineSynth;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNpbmVTeW50aC5qcyJdLCJuYW1lcyI6WyJTaW5lU3ludGgiLCJidWZmZXJzIiwiX2ZyZXF1ZW5jeSIsIm91dHB1dCIsImNyZWF0ZUdhaW4iLCJnYWluIiwidmFsdWUiLCJkZXN0aW5hdGlvbiIsImNvbm5lY3QiLCJ0aW1lIiwicGVyaW9kIiwiZmFkZUluRHVyYXRpb24iLCJkdXJhdGlvbiIsIk1hdGgiLCJyYW5kb20iLCJlbnYiLCJzZXRWYWx1ZUF0VGltZSIsImxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lIiwic2luZSIsImNyZWF0ZU9zY2lsbGF0b3IiLCJmcmVxdWVuY3kiLCJkZXR1bmUiLCJzdGFydCIsInN0b3AiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7SUFFTUEsUztBQUNKLHFCQUFZQyxPQUFaLEVBQXFCO0FBQUE7O0FBQ25CLFNBQUtDLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQTs7QUFFQSxTQUFLQyxNQUFMLEdBQWMscUJBQWFDLFVBQWIsRUFBZDtBQUNBLFNBQUtELE1BQUwsQ0FBWUUsSUFBWixDQUFpQkMsS0FBakIsR0FBeUIsR0FBekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDRDs7Ozs0QkFFT0MsVyxFQUFhO0FBQ25CLFdBQUtKLE1BQUwsQ0FBWUssT0FBWixDQUFvQkQsV0FBcEI7QUFDRDs7OzRCQVVPRSxJLEVBQU1DLE0sRUFBUTtBQUNwQixVQUFNQyxpQkFBaUJELE1BQXZCO0FBQ0EsVUFBTUUsV0FBV0YsVUFBVUcsS0FBS0MsTUFBTCxLQUFnQixDQUFoQixHQUFvQixDQUE5QixDQUFqQjs7QUFFQSxVQUFNQyxNQUFNLHFCQUFhWCxVQUFiLEVBQVo7QUFDQVcsVUFBSVAsT0FBSixDQUFZLEtBQUtMLE1BQWpCO0FBQ0FZLFVBQUlWLElBQUosQ0FBU0MsS0FBVCxHQUFpQixDQUFqQjtBQUNBUyxVQUFJVixJQUFKLENBQVNXLGNBQVQsQ0FBd0IsQ0FBeEIsRUFBMkJQLElBQTNCO0FBQ0FNLFVBQUlWLElBQUosQ0FBU1ksdUJBQVQsQ0FBaUMsQ0FBakMsRUFBb0NSLE9BQU9FLGNBQTNDO0FBQ0FJLFVBQUlWLElBQUosQ0FBU1ksdUJBQVQsQ0FBaUMsQ0FBakMsRUFBb0NSLE9BQU9HLFFBQTNDOztBQUVBLFVBQU1NLE9BQU8scUJBQWFDLGdCQUFiLEVBQWI7QUFDQUQsV0FBS1YsT0FBTCxDQUFhTyxHQUFiOztBQUVBRyxXQUFLRSxTQUFMLENBQWVkLEtBQWYsR0FBdUIsS0FBS0osVUFBNUI7QUFDQWdCLFdBQUtHLE1BQUwsQ0FBWWYsS0FBWixHQUFvQk8sS0FBS0MsTUFBTCxLQUFnQixFQUFoQixHQUFxQixFQUF6Qzs7QUFFQUksV0FBS0ksS0FBTCxDQUFXYixJQUFYO0FBQ0FTLFdBQUtLLElBQUwsQ0FBVWQsT0FBT0csUUFBakI7QUFDRDs7O3NCQTNCYU4sSyxFQUFPO0FBQ25CLFdBQUtKLFVBQUwsR0FBa0JJLEtBQWxCO0FBQ0Q7OztzQkFFU0EsSyxFQUFPO0FBQ2YsV0FBS0gsTUFBTCxDQUFZRSxJQUFaLENBQWlCQyxLQUFqQixHQUF5QkEsS0FBekI7QUFDRDs7Ozs7a0JBd0JZTixTIiwiZmlsZSI6IlNpbmVTeW50aC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGF1ZGlvQ29udGV4dCB9IGZyb20gJ3NvdW5kd29ya3MvY2xpZW50JztcblxuY2xhc3MgU2luZVN5bnRoIHtcbiAgY29uc3RydWN0b3IoYnVmZmVycykge1xuICAgIHRoaXMuX2ZyZXF1ZW5jeSA9IDA7XG4gICAgLy8gdGhpcy5fZGV0dW5lID0gMDtcblxuICAgIHRoaXMub3V0cHV0ID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcbiAgICB0aGlzLm91dHB1dC5nYWluLnZhbHVlID0gMC42O1xuXG4gICAgLy8gdGhpcy5sb3dwYXNzID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJpcXVhZEZpbHRlcigpO1xuICAgIC8vIHRoaXMubG93cGFzcy5jb25uZWN0KHRoaXMub3V0cHV0KTtcbiAgICAvLyB0aGlzLmxvd3Bhc3MudHlwZSA9ICdsb3dwYXNzJztcbiAgICAvLyB0aGlzLmxvd3Bhc3MuZnJlcXVlbmN5LnZhbHVlID0gMTAwO1xuICB9XG5cbiAgY29ubmVjdChkZXN0aW5hdGlvbikge1xuICAgIHRoaXMub3V0cHV0LmNvbm5lY3QoZGVzdGluYXRpb24pO1xuICB9XG5cbiAgc2V0IGZyZXF1ZW5jeSh2YWx1ZSkge1xuICAgIHRoaXMuX2ZyZXF1ZW5jeSA9IHZhbHVlO1xuICB9XG5cbiAgc2V0IGxldmVsKHZhbHVlKSB7XG4gICAgdGhpcy5vdXRwdXQuZ2Fpbi52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgdHJpZ2dlcih0aW1lLCBwZXJpb2QpIHtcbiAgICBjb25zdCBmYWRlSW5EdXJhdGlvbiA9IHBlcmlvZDtcbiAgICBjb25zdCBkdXJhdGlvbiA9IHBlcmlvZCAqIChNYXRoLnJhbmRvbSgpICogMiArIDEpO1xuXG4gICAgY29uc3QgZW52ID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcbiAgICBlbnYuY29ubmVjdCh0aGlzLm91dHB1dCk7XG4gICAgZW52LmdhaW4udmFsdWUgPSAwO1xuICAgIGVudi5nYWluLnNldFZhbHVlQXRUaW1lKDAsIHRpbWUpO1xuICAgIGVudi5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDEsIHRpbWUgKyBmYWRlSW5EdXJhdGlvbik7XG4gICAgZW52LmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMCwgdGltZSArIGR1cmF0aW9uKTtcblxuICAgIGNvbnN0IHNpbmUgPSBhdWRpb0NvbnRleHQuY3JlYXRlT3NjaWxsYXRvcigpO1xuICAgIHNpbmUuY29ubmVjdChlbnYpO1xuXG4gICAgc2luZS5mcmVxdWVuY3kudmFsdWUgPSB0aGlzLl9mcmVxdWVuY3k7XG4gICAgc2luZS5kZXR1bmUudmFsdWUgPSBNYXRoLnJhbmRvbSgpICogMjAgLSAxMDtcblxuICAgIHNpbmUuc3RhcnQodGltZSk7XG4gICAgc2luZS5zdG9wKHRpbWUgKyBkdXJhdGlvbik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2luZVN5bnRoO1xuIl19