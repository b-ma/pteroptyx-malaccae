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

var audioContext = _client.audio.audioContext;

// the actual nbr of steps is nbrSteps + 1 because of the phase offset
function createStairTransfertFunction(nbrSteps) {
  var ySkew = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var _2PI = Math.PI * 2;
  var freq = nbrSteps * _2PI;
  var phaseOffset = -1 / (nbrSteps * 2);
  var sin = Math.sin;

  return function (x) {
    return (freq * x + ySkew * sin(freq * (x + phaseOffset))) / freq;
  };
}

var Score = function () {
  function Score(synths) {
    var _this = this;

    (0, _classCallCheck3.default)(this, Score);

    this.burstSynth = synths.burstSynth;
    this.sineSynth = synths.sineSynth;

    this.state = 'default';

    this.baseFrequency = 150;
    this.harmonics = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.notes = this.harmonics.map(function (index) {
      return _this.baseFrequency * index;
    });

    // init synths
    this.burstSynth.frequency = this.notes[0] / 32; // / 64;
    this.sineSynth.frequency = this.notes[0];
  }

  (0, _createClass3.default)(Score, [{
    key: 'process',
    value: function process(time, period) {
      // const now = audioContext.currentTime;
      if (Math.random() < 0.1) {
        var frequency = this.notes[Math.floor(Math.random() * this.notes.length)];
        this.burstSynth.frequency = frequency / 32; // / 64;
        this.sineSynth.frequency = frequency;
      }

      this.burstSynth.trigger(time, period * 5);
      this.sineSynth.trigger(time, period);
    }
  }]);
  return Score;
}();

exports.default = Score;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjb3JlLmpzIl0sIm5hbWVzIjpbImF1ZGlvQ29udGV4dCIsImNyZWF0ZVN0YWlyVHJhbnNmZXJ0RnVuY3Rpb24iLCJuYnJTdGVwcyIsInlTa2V3IiwiXzJQSSIsIk1hdGgiLCJQSSIsImZyZXEiLCJwaGFzZU9mZnNldCIsInNpbiIsIngiLCJTY29yZSIsInN5bnRocyIsImJ1cnN0U3ludGgiLCJzaW5lU3ludGgiLCJzdGF0ZSIsImJhc2VGcmVxdWVuY3kiLCJoYXJtb25pY3MiLCJub3RlcyIsIm1hcCIsImluZGV4IiwiZnJlcXVlbmN5IiwidGltZSIsInBlcmlvZCIsInJhbmRvbSIsImZsb29yIiwibGVuZ3RoIiwidHJpZ2dlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBLElBQU1BLGVBQWUsY0FBTUEsWUFBM0I7O0FBRUE7QUFDQSxTQUFTQyw0QkFBVCxDQUFzQ0MsUUFBdEMsRUFBMkQ7QUFBQSxNQUFYQyxLQUFXLHVFQUFILENBQUc7O0FBQ3pELE1BQU1DLE9BQU9DLEtBQUtDLEVBQUwsR0FBVSxDQUF2QjtBQUNBLE1BQU1DLE9BQU9MLFdBQVdFLElBQXhCO0FBQ0EsTUFBTUksY0FBYyxDQUFDLENBQUQsSUFBTU4sV0FBVyxDQUFqQixDQUFwQjtBQUNBLE1BQU1PLE1BQU1KLEtBQUtJLEdBQWpCOztBQUVBLFNBQU8sVUFBQ0MsQ0FBRDtBQUFBLFdBQU8sQ0FBRUgsT0FBT0csQ0FBUixHQUFhUCxRQUFRTSxJQUFJRixRQUFRRyxJQUFJRixXQUFaLENBQUosQ0FBdEIsSUFBdURELElBQTlEO0FBQUEsR0FBUDtBQUNEOztJQUVLSSxLO0FBQ0osaUJBQVlDLE1BQVosRUFBb0I7QUFBQTs7QUFBQTs7QUFDbEIsU0FBS0MsVUFBTCxHQUFrQkQsT0FBT0MsVUFBekI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCRixPQUFPRSxTQUF4Qjs7QUFFQSxTQUFLQyxLQUFMLEdBQWEsU0FBYjs7QUFFQSxTQUFLQyxhQUFMLEdBQXFCLEdBQXJCO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQixDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLEVBQXpCLENBQWpCO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLEtBQUtELFNBQUwsQ0FBZUUsR0FBZixDQUFtQixVQUFDQyxLQUFEO0FBQUEsYUFBVyxNQUFLSixhQUFMLEdBQXFCSSxLQUFoQztBQUFBLEtBQW5CLENBQWI7O0FBRUE7QUFDQSxTQUFLUCxVQUFMLENBQWdCUSxTQUFoQixHQUE0QixLQUFLSCxLQUFMLENBQVcsQ0FBWCxJQUFnQixFQUE1QyxDQVhrQixDQVc4QjtBQUNoRCxTQUFLSixTQUFMLENBQWVPLFNBQWYsR0FBMkIsS0FBS0gsS0FBTCxDQUFXLENBQVgsQ0FBM0I7QUFDRDs7Ozs0QkFFT0ksSSxFQUFNQyxNLEVBQVE7QUFDcEI7QUFDQSxVQUFJbEIsS0FBS21CLE1BQUwsS0FBZ0IsR0FBcEIsRUFBeUI7QUFDdkIsWUFBTUgsWUFBWSxLQUFLSCxLQUFMLENBQVdiLEtBQUtvQixLQUFMLENBQVdwQixLQUFLbUIsTUFBTCxLQUFnQixLQUFLTixLQUFMLENBQVdRLE1BQXRDLENBQVgsQ0FBbEI7QUFDQSxhQUFLYixVQUFMLENBQWdCUSxTQUFoQixHQUE0QkEsWUFBWSxFQUF4QyxDQUZ1QixDQUVxQjtBQUM1QyxhQUFLUCxTQUFMLENBQWVPLFNBQWYsR0FBMkJBLFNBQTNCO0FBQ0Q7O0FBRUQsV0FBS1IsVUFBTCxDQUFnQmMsT0FBaEIsQ0FBd0JMLElBQXhCLEVBQThCQyxTQUFTLENBQXZDO0FBQ0EsV0FBS1QsU0FBTCxDQUFlYSxPQUFmLENBQXVCTCxJQUF2QixFQUE2QkMsTUFBN0I7QUFDRDs7Ozs7a0JBR1laLEsiLCJmaWxlIjoiU2NvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhdWRpbyB9IGZyb20gJ3NvdW5kd29ya3MvY2xpZW50JztcbmNvbnN0IGF1ZGlvQ29udGV4dCA9IGF1ZGlvLmF1ZGlvQ29udGV4dDtcblxuLy8gdGhlIGFjdHVhbCBuYnIgb2Ygc3RlcHMgaXMgbmJyU3RlcHMgKyAxIGJlY2F1c2Ugb2YgdGhlIHBoYXNlIG9mZnNldFxuZnVuY3Rpb24gY3JlYXRlU3RhaXJUcmFuc2ZlcnRGdW5jdGlvbihuYnJTdGVwcywgeVNrZXcgPSAxKSB7XG4gIGNvbnN0IF8yUEkgPSBNYXRoLlBJICogMjtcbiAgY29uc3QgZnJlcSA9IG5iclN0ZXBzICogXzJQSTtcbiAgY29uc3QgcGhhc2VPZmZzZXQgPSAtMSAvIChuYnJTdGVwcyAqIDIpO1xuICBjb25zdCBzaW4gPSBNYXRoLnNpbjtcblxuICByZXR1cm4gKHgpID0+ICgoZnJlcSAqIHgpICsgeVNrZXcgKiBzaW4oZnJlcSAqICh4ICsgcGhhc2VPZmZzZXQpKSkgLyBmcmVxO1xufVxuXG5jbGFzcyBTY29yZSB7XG4gIGNvbnN0cnVjdG9yKHN5bnRocykge1xuICAgIHRoaXMuYnVyc3RTeW50aCA9IHN5bnRocy5idXJzdFN5bnRoO1xuICAgIHRoaXMuc2luZVN5bnRoID0gc3ludGhzLnNpbmVTeW50aDtcblxuICAgIHRoaXMuc3RhdGUgPSAnZGVmYXVsdCc7XG5cbiAgICB0aGlzLmJhc2VGcmVxdWVuY3kgPSAxNTA7XG4gICAgdGhpcy5oYXJtb25pY3MgPSBbMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTBdO1xuICAgIHRoaXMubm90ZXMgPSB0aGlzLmhhcm1vbmljcy5tYXAoKGluZGV4KSA9PiB0aGlzLmJhc2VGcmVxdWVuY3kgKiBpbmRleCk7XG5cbiAgICAvLyBpbml0IHN5bnRoc1xuICAgIHRoaXMuYnVyc3RTeW50aC5mcmVxdWVuY3kgPSB0aGlzLm5vdGVzWzBdIC8gMzI7IC8vIC8gNjQ7XG4gICAgdGhpcy5zaW5lU3ludGguZnJlcXVlbmN5ID0gdGhpcy5ub3Rlc1swXTtcbiAgfVxuXG4gIHByb2Nlc3ModGltZSwgcGVyaW9kKSB7XG4gICAgLy8gY29uc3Qgbm93ID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lO1xuICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC4xKSB7XG4gICAgICBjb25zdCBmcmVxdWVuY3kgPSB0aGlzLm5vdGVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMubm90ZXMubGVuZ3RoKV07XG4gICAgICB0aGlzLmJ1cnN0U3ludGguZnJlcXVlbmN5ID0gZnJlcXVlbmN5IC8gMzI7IC8vIC8gNjQ7XG4gICAgICB0aGlzLnNpbmVTeW50aC5mcmVxdWVuY3kgPSBmcmVxdWVuY3k7XG4gICAgfVxuXG4gICAgdGhpcy5idXJzdFN5bnRoLnRyaWdnZXIodGltZSwgcGVyaW9kICogNSk7XG4gICAgdGhpcy5zaW5lU3ludGgudHJpZ2dlcih0aW1lLCBwZXJpb2QpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNjb3JlXG4iXX0=