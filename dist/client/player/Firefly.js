'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isNan = require('babel-runtime/core-js/number/is-nan');

var _isNan2 = _interopRequireDefault(_isNan);

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

var max = Math.max;
var min = Math.min;
var sin = Math.sin;
var _2PI = 2 * Math.PI;
var _PI = Math.PI;

var Firefly = function (_audio$TimeEngine) {
  (0, _inherits3.default)(Firefly, _audio$TimeEngine);

  function Firefly(lowerPeriod, upperPeriod, flashFunction) {
    (0, _classCallCheck3.default)(this, Firefly);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Firefly.__proto__ || (0, _getPrototypeOf2.default)(Firefly)).call(this));

    _this.lowerPeriod = lowerPeriod;
    _this.upperPeriod = upperPeriod;
    _this.flashFunction = flashFunction;

    // @todo - move into method
    _this.lowerFrequency = 1 / upperPeriod;
    _this.upperFrequency = 1 / lowerPeriod;
    _this.period = (upperPeriod + lowerPeriod) / 2;
    _this.naturalFrequency = 1 / _this.period;

    _this.frequency = _this.naturalFrequency;
    return _this;
  }

  (0, _createClass3.default)(Firefly, [{
    key: 'resetTime',
    value: function resetTime(time) {
      var timeSinceLastFlash = time - this.flashTime;
      var phase = timeSinceLastFlash / this.period % 1;

      // - update frequency
      // ω' = ω + ε(Ω - ω) + gplus(φ)(Ωl - ω) + gminus(φ)(Ωu - ω)
      // - where:
      // ε is a constant (assume 0.01 cf. page 4)
      // Ω is the natural frequency
      // gplus(φ)  = max(sin(2πφ) / 2π, 0)
      // gminus(φ) = - min(sin(2πφ) / 2π, 1)
      var epsilon = 0.4;
      var df = epsilon * (this.naturalFrequency - this.frequency);

      if (phase < 0.5) df -= sin(_2PI * phase) / _2PI * (this.frequency - this.lowerFrequency);else df += sin(_2PI * phase) / _2PI * (this.frequency - this.upperFrequency);

      if ((0, _isNan2.default)(df)) {
        console.log('nan', phase, this.naturalFrequency, df);
        return;
      }
      // update period according to new frequency
      this.frequency += df;
      this.period = 1 / this.frequency;

      // update next time output according to new frequency
      var dt = this.period * (1 - phase);
      return time + dt;
    }
  }, {
    key: 'advanceTime',
    value: function advanceTime(time) {
      this.flashTime = time;
      this.flashFunction(time, this.period);

      return time + this.period;
    }
  }]);
  return Firefly;
}(_client.audio.TimeEngine);

exports.default = Firefly;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZpcmVmbHkuanMiXSwibmFtZXMiOlsibWF4IiwiTWF0aCIsIm1pbiIsInNpbiIsIl8yUEkiLCJQSSIsIl9QSSIsIkZpcmVmbHkiLCJsb3dlclBlcmlvZCIsInVwcGVyUGVyaW9kIiwiZmxhc2hGdW5jdGlvbiIsImxvd2VyRnJlcXVlbmN5IiwidXBwZXJGcmVxdWVuY3kiLCJwZXJpb2QiLCJuYXR1cmFsRnJlcXVlbmN5IiwiZnJlcXVlbmN5IiwidGltZSIsInRpbWVTaW5jZUxhc3RGbGFzaCIsImZsYXNoVGltZSIsInBoYXNlIiwiZXBzaWxvbiIsImRmIiwiY29uc29sZSIsImxvZyIsImR0IiwiVGltZUVuZ2luZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQSxJQUFNQSxNQUFNQyxLQUFLRCxHQUFqQjtBQUNBLElBQU1FLE1BQU1ELEtBQUtDLEdBQWpCO0FBQ0EsSUFBTUMsTUFBTUYsS0FBS0UsR0FBakI7QUFDQSxJQUFNQyxPQUFPLElBQUlILEtBQUtJLEVBQXRCO0FBQ0EsSUFBTUMsTUFBTUwsS0FBS0ksRUFBakI7O0lBRU1FLE87OztBQUNKLG1CQUFZQyxXQUFaLEVBQXlCQyxXQUF6QixFQUFzQ0MsYUFBdEMsRUFBcUQ7QUFBQTs7QUFBQTs7QUFHbkQsVUFBS0YsV0FBTCxHQUFtQkEsV0FBbkI7QUFDQSxVQUFLQyxXQUFMLEdBQW1CQSxXQUFuQjtBQUNBLFVBQUtDLGFBQUwsR0FBcUJBLGFBQXJCOztBQUVBO0FBQ0EsVUFBS0MsY0FBTCxHQUFzQixJQUFJRixXQUExQjtBQUNBLFVBQUtHLGNBQUwsR0FBc0IsSUFBSUosV0FBMUI7QUFDQSxVQUFLSyxNQUFMLEdBQWMsQ0FBQ0osY0FBY0QsV0FBZixJQUE4QixDQUE1QztBQUNBLFVBQUtNLGdCQUFMLEdBQXdCLElBQUksTUFBS0QsTUFBakM7O0FBRUEsVUFBS0UsU0FBTCxHQUFpQixNQUFLRCxnQkFBdEI7QUFibUQ7QUFjcEQ7Ozs7OEJBRVNFLEksRUFBTTtBQUNkLFVBQU1DLHFCQUFxQkQsT0FBTyxLQUFLRSxTQUF2QztBQUNBLFVBQU1DLFFBQVNGLHFCQUFxQixLQUFLSixNQUEzQixHQUFxQyxDQUFuRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQU1PLFVBQVUsR0FBaEI7QUFDQSxVQUFJQyxLQUFLRCxXQUFXLEtBQUtOLGdCQUFMLEdBQXdCLEtBQUtDLFNBQXhDLENBQVQ7O0FBRUEsVUFBSUksUUFBUSxHQUFaLEVBQ0VFLE1BQU9sQixJQUFJQyxPQUFPZSxLQUFYLElBQW9CZixJQUFyQixJQUE4QixLQUFLVyxTQUFMLEdBQWlCLEtBQUtKLGNBQXBELENBQU4sQ0FERixLQUdFVSxNQUFPbEIsSUFBSUMsT0FBT2UsS0FBWCxJQUFvQmYsSUFBckIsSUFBOEIsS0FBS1csU0FBTCxHQUFpQixLQUFLSCxjQUFwRCxDQUFOOztBQUVGLFVBQUkscUJBQWFTLEVBQWIsQ0FBSixFQUFzQjtBQUNwQkMsZ0JBQVFDLEdBQVIsQ0FBWSxLQUFaLEVBQW1CSixLQUFuQixFQUEwQixLQUFLTCxnQkFBL0IsRUFBaURPLEVBQWpEO0FBQ0E7QUFDRDtBQUNEO0FBQ0EsV0FBS04sU0FBTCxJQUFrQk0sRUFBbEI7QUFDQSxXQUFLUixNQUFMLEdBQWMsSUFBSSxLQUFLRSxTQUF2Qjs7QUFFQTtBQUNBLFVBQU1TLEtBQUssS0FBS1gsTUFBTCxJQUFlLElBQUlNLEtBQW5CLENBQVg7QUFDQSxhQUFPSCxPQUFPUSxFQUFkO0FBQ0Q7OztnQ0FFV1IsSSxFQUFNO0FBQ2hCLFdBQUtFLFNBQUwsR0FBaUJGLElBQWpCO0FBQ0EsV0FBS04sYUFBTCxDQUFtQk0sSUFBbkIsRUFBMEIsS0FBS0gsTUFBL0I7O0FBRUEsYUFBT0csT0FBTyxLQUFLSCxNQUFuQjtBQUNEOzs7RUF0RG1CLGNBQU1ZLFU7O2tCQXlEYmxCLE8iLCJmaWxlIjoiRmlyZWZseS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGF1ZGlvIH0gZnJvbSAnc291bmR3b3Jrcy9jbGllbnQnO1xuXG5jb25zdCBtYXggPSBNYXRoLm1heDtcbmNvbnN0IG1pbiA9IE1hdGgubWluO1xuY29uc3Qgc2luID0gTWF0aC5zaW47XG5jb25zdCBfMlBJID0gMiAqIE1hdGguUEk7XG5jb25zdCBfUEkgPSBNYXRoLlBJO1xuXG5jbGFzcyBGaXJlZmx5IGV4dGVuZHMgYXVkaW8uVGltZUVuZ2luZSB7XG4gIGNvbnN0cnVjdG9yKGxvd2VyUGVyaW9kLCB1cHBlclBlcmlvZCwgZmxhc2hGdW5jdGlvbikge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmxvd2VyUGVyaW9kID0gbG93ZXJQZXJpb2Q7XG4gICAgdGhpcy51cHBlclBlcmlvZCA9IHVwcGVyUGVyaW9kO1xuICAgIHRoaXMuZmxhc2hGdW5jdGlvbiA9IGZsYXNoRnVuY3Rpb247XG5cbiAgICAvLyBAdG9kbyAtIG1vdmUgaW50byBtZXRob2RcbiAgICB0aGlzLmxvd2VyRnJlcXVlbmN5ID0gMSAvIHVwcGVyUGVyaW9kO1xuICAgIHRoaXMudXBwZXJGcmVxdWVuY3kgPSAxIC8gbG93ZXJQZXJpb2Q7XG4gICAgdGhpcy5wZXJpb2QgPSAodXBwZXJQZXJpb2QgKyBsb3dlclBlcmlvZCkgLyAyO1xuICAgIHRoaXMubmF0dXJhbEZyZXF1ZW5jeSA9IDEgLyB0aGlzLnBlcmlvZDtcblxuICAgIHRoaXMuZnJlcXVlbmN5ID0gdGhpcy5uYXR1cmFsRnJlcXVlbmN5O1xuICB9XG5cbiAgcmVzZXRUaW1lKHRpbWUpIHtcbiAgICBjb25zdCB0aW1lU2luY2VMYXN0Rmxhc2ggPSB0aW1lIC0gdGhpcy5mbGFzaFRpbWU7XG4gICAgY29uc3QgcGhhc2UgPSAodGltZVNpbmNlTGFzdEZsYXNoIC8gdGhpcy5wZXJpb2QpICUgMTtcblxuICAgIC8vIC0gdXBkYXRlIGZyZXF1ZW5jeVxuICAgIC8vIM+JJyA9IM+JICsgzrUozqkgLSDPiSkgKyBncGx1cyjPhikozqlsIC0gz4kpICsgZ21pbnVzKM+GKSjOqXUgLSDPiSlcbiAgICAvLyAtIHdoZXJlOlxuICAgIC8vIM61IGlzIGEgY29uc3RhbnQgKGFzc3VtZSAwLjAxIGNmLiBwYWdlIDQpXG4gICAgLy8gzqkgaXMgdGhlIG5hdHVyYWwgZnJlcXVlbmN5XG4gICAgLy8gZ3BsdXMoz4YpICA9IG1heChzaW4oMs+Az4YpIC8gMs+ALCAwKVxuICAgIC8vIGdtaW51cyjPhikgPSAtIG1pbihzaW4oMs+Az4YpIC8gMs+ALCAxKVxuICAgIGNvbnN0IGVwc2lsb24gPSAwLjQ7XG4gICAgbGV0IGRmID0gZXBzaWxvbiAqICh0aGlzLm5hdHVyYWxGcmVxdWVuY3kgLSB0aGlzLmZyZXF1ZW5jeSk7XG5cbiAgICBpZiAocGhhc2UgPCAwLjUpXG4gICAgICBkZiAtPSAoc2luKF8yUEkgKiBwaGFzZSkgLyBfMlBJKSAqICh0aGlzLmZyZXF1ZW5jeSAtIHRoaXMubG93ZXJGcmVxdWVuY3kpO1xuICAgIGVsc2VcbiAgICAgIGRmICs9IChzaW4oXzJQSSAqIHBoYXNlKSAvIF8yUEkpICogKHRoaXMuZnJlcXVlbmN5IC0gdGhpcy51cHBlckZyZXF1ZW5jeSk7XG5cbiAgICBpZiAoTnVtYmVyLmlzTmFOKGRmKSkge1xuICAgICAgY29uc29sZS5sb2coJ25hbicsIHBoYXNlLCB0aGlzLm5hdHVyYWxGcmVxdWVuY3ksIGRmKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gdXBkYXRlIHBlcmlvZCBhY2NvcmRpbmcgdG8gbmV3IGZyZXF1ZW5jeVxuICAgIHRoaXMuZnJlcXVlbmN5ICs9IGRmO1xuICAgIHRoaXMucGVyaW9kID0gMSAvIHRoaXMuZnJlcXVlbmN5O1xuXG4gICAgLy8gdXBkYXRlIG5leHQgdGltZSBvdXRwdXQgYWNjb3JkaW5nIHRvIG5ldyBmcmVxdWVuY3lcbiAgICBjb25zdCBkdCA9IHRoaXMucGVyaW9kICogKDEgLSBwaGFzZSk7XG4gICAgcmV0dXJuIHRpbWUgKyBkdDtcbiAgfVxuXG4gIGFkdmFuY2VUaW1lKHRpbWUpIHtcbiAgICB0aGlzLmZsYXNoVGltZSA9IHRpbWU7XG4gICAgdGhpcy5mbGFzaEZ1bmN0aW9uKHRpbWUsICB0aGlzLnBlcmlvZCk7XG5cbiAgICByZXR1cm4gdGltZSArIHRoaXMucGVyaW9kO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZpcmVmbHk7XG4iXX0=