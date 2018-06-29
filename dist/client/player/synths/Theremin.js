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

var Theremin = function () {
  function Theremin() {
    (0, _classCallCheck3.default)(this, Theremin);

    this.output = _client.audioContext.createGain();
  }

  (0, _createClass3.default)(Theremin, [{
    key: 'connect',
    value: function connect(destination) {
      this.output.connect(destination);
    }
  }, {
    key: 'trigger',
    value: function trigger(time, period) {
      var fadeInDuration = period;
      var duration = period * (Math.random() * 2 + 1);

      var resonance = _client.audioContext.createBiquadFilter();
      resonance.connect(this.output);
      resonance.type = 'bandpass';
      resonance.Q.value = 200;
      resonance.frequency.value = this._frequency * 2;

      var lowpass = _client.audioContext.createBiquadFilter();
      lowpass.connect(resonance);
      lowpass.type = 'lowpass';
      lowpass.frequency.value = this._frequency;

      var env = _client.audioContext.createGain();
      env.connect(lowpass);
      env.gain.value = 0;
      env.gain.setValueAtTime(0, time);
      env.gain.linearRampToValueAtTime(1, time + fadeInDuration);
      env.gain.linearRampToValueAtTime(0, time + duration);

      var osc = _client.audioContext.createOscillator();
      osc.connect(env);
      osc.type = 'sawtooth';

      var modFreq = _client.audioContext.createGain();
      modFreq.connect(osc.frequency);
      modFreq.gain.value = Math.random() * 10 + 5;

      var mod = _client.audioContext.createOscillator();
      mod.connect(modFreq);
      mod.frequency.value = Math.random() * 6;

      osc.start(time);
      mod.start(time);

      osc.stop(time + duration);
      mod.stop(time + duration);
    }
  }, {
    key: 'level',
    set: function set(value) {
      this.output.gain.value = value;
    }
  }, {
    key: 'frequency',
    set: function set(value) {
      this._frequency = value;
    }
  }]);
  return Theremin;
}();

exports.default = Theremin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRoZXJlbWluLmpzIl0sIm5hbWVzIjpbIlRoZXJlbWluIiwib3V0cHV0IiwiY3JlYXRlR2FpbiIsImRlc3RpbmF0aW9uIiwiY29ubmVjdCIsInRpbWUiLCJwZXJpb2QiLCJmYWRlSW5EdXJhdGlvbiIsImR1cmF0aW9uIiwiTWF0aCIsInJhbmRvbSIsInJlc29uYW5jZSIsImNyZWF0ZUJpcXVhZEZpbHRlciIsInR5cGUiLCJRIiwidmFsdWUiLCJmcmVxdWVuY3kiLCJfZnJlcXVlbmN5IiwibG93cGFzcyIsImVudiIsImdhaW4iLCJzZXRWYWx1ZUF0VGltZSIsImxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lIiwib3NjIiwiY3JlYXRlT3NjaWxsYXRvciIsIm1vZEZyZXEiLCJtb2QiLCJzdGFydCIsInN0b3AiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7SUFFTUEsUTtBQUNKLHNCQUFjO0FBQUE7O0FBQ1osU0FBS0MsTUFBTCxHQUFjLHFCQUFhQyxVQUFiLEVBQWQ7QUFDRDs7Ozs0QkFFT0MsVyxFQUFhO0FBQ25CLFdBQUtGLE1BQUwsQ0FBWUcsT0FBWixDQUFvQkQsV0FBcEI7QUFDRDs7OzRCQVVPRSxJLEVBQU1DLE0sRUFBUTtBQUNwQixVQUFNQyxpQkFBaUJELE1BQXZCO0FBQ0EsVUFBTUUsV0FBV0YsVUFBVUcsS0FBS0MsTUFBTCxLQUFnQixDQUFoQixHQUFvQixDQUE5QixDQUFqQjs7QUFFQSxVQUFNQyxZQUFZLHFCQUFhQyxrQkFBYixFQUFsQjtBQUNBRCxnQkFBVVAsT0FBVixDQUFrQixLQUFLSCxNQUF2QjtBQUNBVSxnQkFBVUUsSUFBVixHQUFpQixVQUFqQjtBQUNBRixnQkFBVUcsQ0FBVixDQUFZQyxLQUFaLEdBQW9CLEdBQXBCO0FBQ0FKLGdCQUFVSyxTQUFWLENBQW9CRCxLQUFwQixHQUE0QixLQUFLRSxVQUFMLEdBQWtCLENBQTlDOztBQUVBLFVBQU1DLFVBQVUscUJBQWFOLGtCQUFiLEVBQWhCO0FBQ0FNLGNBQVFkLE9BQVIsQ0FBZ0JPLFNBQWhCO0FBQ0FPLGNBQVFMLElBQVIsR0FBZSxTQUFmO0FBQ0FLLGNBQVFGLFNBQVIsQ0FBa0JELEtBQWxCLEdBQTBCLEtBQUtFLFVBQS9COztBQUVBLFVBQU1FLE1BQU0scUJBQWFqQixVQUFiLEVBQVo7QUFDQWlCLFVBQUlmLE9BQUosQ0FBWWMsT0FBWjtBQUNBQyxVQUFJQyxJQUFKLENBQVNMLEtBQVQsR0FBaUIsQ0FBakI7QUFDQUksVUFBSUMsSUFBSixDQUFTQyxjQUFULENBQXdCLENBQXhCLEVBQTJCaEIsSUFBM0I7QUFDQWMsVUFBSUMsSUFBSixDQUFTRSx1QkFBVCxDQUFpQyxDQUFqQyxFQUFvQ2pCLE9BQU9FLGNBQTNDO0FBQ0FZLFVBQUlDLElBQUosQ0FBU0UsdUJBQVQsQ0FBaUMsQ0FBakMsRUFBb0NqQixPQUFPRyxRQUEzQzs7QUFFQSxVQUFNZSxNQUFNLHFCQUFhQyxnQkFBYixFQUFaO0FBQ0FELFVBQUluQixPQUFKLENBQVllLEdBQVo7QUFDQUksVUFBSVYsSUFBSixHQUFXLFVBQVg7O0FBRUEsVUFBTVksVUFBVSxxQkFBYXZCLFVBQWIsRUFBaEI7QUFDQXVCLGNBQVFyQixPQUFSLENBQWdCbUIsSUFBSVAsU0FBcEI7QUFDQVMsY0FBUUwsSUFBUixDQUFhTCxLQUFiLEdBQXFCTixLQUFLQyxNQUFMLEtBQWdCLEVBQWhCLEdBQXFCLENBQTFDOztBQUVBLFVBQU1nQixNQUFNLHFCQUFhRixnQkFBYixFQUFaO0FBQ0FFLFVBQUl0QixPQUFKLENBQVlxQixPQUFaO0FBQ0FDLFVBQUlWLFNBQUosQ0FBY0QsS0FBZCxHQUFzQk4sS0FBS0MsTUFBTCxLQUFnQixDQUF0Qzs7QUFFQWEsVUFBSUksS0FBSixDQUFVdEIsSUFBVjtBQUNBcUIsVUFBSUMsS0FBSixDQUFVdEIsSUFBVjs7QUFFQWtCLFVBQUlLLElBQUosQ0FBU3ZCLE9BQU9HLFFBQWhCO0FBQ0FrQixVQUFJRSxJQUFKLENBQVN2QixPQUFPRyxRQUFoQjtBQUNEOzs7c0JBL0NTTyxLLEVBQU87QUFDZixXQUFLZCxNQUFMLENBQVltQixJQUFaLENBQWlCTCxLQUFqQixHQUF5QkEsS0FBekI7QUFDRDs7O3NCQUVhQSxLLEVBQU87QUFDbkIsV0FBS0UsVUFBTCxHQUFrQkYsS0FBbEI7QUFDRDs7Ozs7a0JBNENZZixRIiwiZmlsZSI6IlRoZXJlbWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXVkaW9Db250ZXh0IH0gZnJvbSAnc291bmR3b3Jrcy9jbGllbnQnO1xuXG5jbGFzcyBUaGVyZW1pbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMub3V0cHV0ID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcbiAgfVxuXG4gIGNvbm5lY3QoZGVzdGluYXRpb24pIHtcbiAgICB0aGlzLm91dHB1dC5jb25uZWN0KGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIHNldCBsZXZlbCh2YWx1ZSkge1xuICAgIHRoaXMub3V0cHV0LmdhaW4udmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHNldCBmcmVxdWVuY3kodmFsdWUpIHtcbiAgICB0aGlzLl9mcmVxdWVuY3kgPSB2YWx1ZTtcbiAgfVxuXG4gIHRyaWdnZXIodGltZSwgcGVyaW9kKSB7XG4gICAgY29uc3QgZmFkZUluRHVyYXRpb24gPSBwZXJpb2Q7XG4gICAgY29uc3QgZHVyYXRpb24gPSBwZXJpb2QgKiAoTWF0aC5yYW5kb20oKSAqIDIgKyAxKTtcblxuICAgIGNvbnN0IHJlc29uYW5jZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCaXF1YWRGaWx0ZXIoKTtcbiAgICByZXNvbmFuY2UuY29ubmVjdCh0aGlzLm91dHB1dCk7XG4gICAgcmVzb25hbmNlLnR5cGUgPSAnYmFuZHBhc3MnO1xuICAgIHJlc29uYW5jZS5RLnZhbHVlID0gMjAwO1xuICAgIHJlc29uYW5jZS5mcmVxdWVuY3kudmFsdWUgPSB0aGlzLl9mcmVxdWVuY3kgKiAyO1xuXG4gICAgY29uc3QgbG93cGFzcyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCaXF1YWRGaWx0ZXIoKTtcbiAgICBsb3dwYXNzLmNvbm5lY3QocmVzb25hbmNlKTtcbiAgICBsb3dwYXNzLnR5cGUgPSAnbG93cGFzcyc7XG4gICAgbG93cGFzcy5mcmVxdWVuY3kudmFsdWUgPSB0aGlzLl9mcmVxdWVuY3k7XG5cbiAgICBjb25zdCBlbnYgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpO1xuICAgIGVudi5jb25uZWN0KGxvd3Bhc3MpO1xuICAgIGVudi5nYWluLnZhbHVlID0gMDtcbiAgICBlbnYuZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLCB0aW1lKTtcbiAgICBlbnYuZ2Fpbi5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZSgxLCB0aW1lICsgZmFkZUluRHVyYXRpb24pO1xuICAgIGVudi5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDAsIHRpbWUgKyBkdXJhdGlvbik7XG5cbiAgICBjb25zdCBvc2MgPSBhdWRpb0NvbnRleHQuY3JlYXRlT3NjaWxsYXRvcigpO1xuICAgIG9zYy5jb25uZWN0KGVudik7XG4gICAgb3NjLnR5cGUgPSAnc2F3dG9vdGgnO1xuXG4gICAgY29uc3QgbW9kRnJlcSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XG4gICAgbW9kRnJlcS5jb25uZWN0KG9zYy5mcmVxdWVuY3kpO1xuICAgIG1vZEZyZXEuZ2Fpbi52YWx1ZSA9IE1hdGgucmFuZG9tKCkgKiAxMCArIDU7XG5cbiAgICBjb25zdCBtb2QgPSBhdWRpb0NvbnRleHQuY3JlYXRlT3NjaWxsYXRvcigpO1xuICAgIG1vZC5jb25uZWN0KG1vZEZyZXEpO1xuICAgIG1vZC5mcmVxdWVuY3kudmFsdWUgPSBNYXRoLnJhbmRvbSgpICogNjtcblxuICAgIG9zYy5zdGFydCh0aW1lKTtcbiAgICBtb2Quc3RhcnQodGltZSk7XG5cbiAgICBvc2Muc3RvcCh0aW1lICsgZHVyYXRpb24pO1xuICAgIG1vZC5zdG9wKHRpbWUgKyBkdXJhdGlvbik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGhlcmVtaW47XG4iXX0=