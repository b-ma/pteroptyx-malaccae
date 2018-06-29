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

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _client = require('soundworks/client');

var soundworks = _interopRequireWildcard(_client);

var _BurstSynth = require('./synths/BurstSynth');

var _BurstSynth2 = _interopRequireDefault(_BurstSynth);

var _SineSynth = require('./synths/SineSynth');

var _SineSynth2 = _interopRequireDefault(_SineSynth);

var _Theremin = require('./synths/Theremin');

var _Theremin2 = _interopRequireDefault(_Theremin);

var _Firefly = require('./Firefly');

var _Firefly2 = _interopRequireDefault(_Firefly);

var _Score = require('./Score');

var _Score2 = _interopRequireDefault(_Score);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var audioContext = soundworks.audioContext;
var scheduler = soundworks.audio.getScheduler();

var PlayerExperience = function (_soundworks$Experienc) {
  (0, _inherits3.default)(PlayerExperience, _soundworks$Experienc);

  function PlayerExperience(assetsDomain, audioFiles) {
    (0, _classCallCheck3.default)(this, PlayerExperience);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PlayerExperience.__proto__ || (0, _getPrototypeOf2.default)(PlayerExperience)).call(this));

    _this.sharedParams = _this.require('shared-params');
    _this.processFireflyFlash = _this.processFireflyFlash.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(PlayerExperience, [{
    key: 'start',
    value: function start() {
      var _this2 = this;

      (0, _get3.default)(PlayerExperience.prototype.__proto__ || (0, _getPrototypeOf2.default)(PlayerExperience.prototype), 'start', this).call(this);

      // global control
      this.sharedParams.addParamListener('reload', function () {
        return window.location.reload(true);
      });

      this.firefly = new _Firefly2.default(0.8, 1.2, this.processFireflyFlash);

      // init synths
      this.burstSynth = new _BurstSynth2.default();
      this.sineSynth = new _SineSynth2.default();
      // this.sineSynth = new Theremin();

      this.burstSynth.connect(audioContext.destination);
      this.sineSynth.connect(audioContext.destination);

      // init score
      var burstSynth = this.burstSynth,
          sineSynth = this.sineSynth;

      this.score = new _Score2.default({ burstSynth: burstSynth, sineSynth: sineSynth });

      this.sharedParams.addParamListener('synth:burst:gain', function (val) {
        _this2.burstSynth.gain = val;
      });

      this.sharedParams.addParamListener('synth:burst:cutoffFreq', function (val) {
        _this2.burstSynth.cutoffFreq = val;
      });

      this.sharedParams.addParamListener('synth:sine:level', function (val) {
        _this2.sineSynth.level = val;
      });

      scheduler.add(this.firefly);

      this.receive('process:flash', function () {
        _this2.firefly.resetTime(audioContext.currentTime);
      });
    }
  }, {
    key: 'processFireflyFlash',
    value: function processFireflyFlash(time, period) {
      var _this3 = this;

      var now = audioContext.currentTime;
      this.score.process(time, period);

      var dt = time - now;

      setTimeout(function () {
        _this3.send('flash', time);
      }, Math.round(dt * 1000));
    }
  }]);
  return PlayerExperience;
}(soundworks.Experience);

exports.default = PlayerExperience;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBsYXllckV4cGVyaWVuY2UuanMiXSwibmFtZXMiOlsic291bmR3b3JrcyIsImF1ZGlvQ29udGV4dCIsInNjaGVkdWxlciIsImF1ZGlvIiwiZ2V0U2NoZWR1bGVyIiwiUGxheWVyRXhwZXJpZW5jZSIsImFzc2V0c0RvbWFpbiIsImF1ZGlvRmlsZXMiLCJzaGFyZWRQYXJhbXMiLCJyZXF1aXJlIiwicHJvY2Vzc0ZpcmVmbHlGbGFzaCIsImJpbmQiLCJhZGRQYXJhbUxpc3RlbmVyIiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiLCJmaXJlZmx5IiwiYnVyc3RTeW50aCIsInNpbmVTeW50aCIsImNvbm5lY3QiLCJkZXN0aW5hdGlvbiIsInNjb3JlIiwidmFsIiwiZ2FpbiIsImN1dG9mZkZyZXEiLCJsZXZlbCIsImFkZCIsInJlY2VpdmUiLCJyZXNldFRpbWUiLCJjdXJyZW50VGltZSIsInRpbWUiLCJwZXJpb2QiLCJub3ciLCJwcm9jZXNzIiwiZHQiLCJzZXRUaW1lb3V0Iiwic2VuZCIsIk1hdGgiLCJyb3VuZCIsIkV4cGVyaWVuY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztJQUFZQSxVOztBQUNaOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTUMsZUFBZUQsV0FBV0MsWUFBaEM7QUFDQSxJQUFNQyxZQUFZRixXQUFXRyxLQUFYLENBQWlCQyxZQUFqQixFQUFsQjs7SUFFTUMsZ0I7OztBQUNKLDRCQUFZQyxZQUFaLEVBQTBCQyxVQUExQixFQUFzQztBQUFBOztBQUFBOztBQUdwQyxVQUFLQyxZQUFMLEdBQW9CLE1BQUtDLE9BQUwsQ0FBYSxlQUFiLENBQXBCO0FBQ0EsVUFBS0MsbUJBQUwsR0FBMkIsTUFBS0EsbUJBQUwsQ0FBeUJDLElBQXpCLE9BQTNCO0FBSm9DO0FBS3JDOzs7OzRCQUdPO0FBQUE7O0FBQ047O0FBRUE7QUFDQSxXQUFLSCxZQUFMLENBQWtCSSxnQkFBbEIsQ0FBbUMsUUFBbkMsRUFBNkM7QUFBQSxlQUFNQyxPQUFPQyxRQUFQLENBQWdCQyxNQUFoQixDQUF1QixJQUF2QixDQUFOO0FBQUEsT0FBN0M7O0FBRUEsV0FBS0MsT0FBTCxHQUFlLHNCQUFZLEdBQVosRUFBaUIsR0FBakIsRUFBc0IsS0FBS04sbUJBQTNCLENBQWY7O0FBRUE7QUFDQSxXQUFLTyxVQUFMLEdBQWtCLDBCQUFsQjtBQUNBLFdBQUtDLFNBQUwsR0FBaUIseUJBQWpCO0FBQ0E7O0FBRUEsV0FBS0QsVUFBTCxDQUFnQkUsT0FBaEIsQ0FBd0JsQixhQUFhbUIsV0FBckM7QUFDQSxXQUFLRixTQUFMLENBQWVDLE9BQWYsQ0FBdUJsQixhQUFhbUIsV0FBcEM7O0FBRUE7QUFoQk0sVUFpQkVILFVBakJGLEdBaUI0QixJQWpCNUIsQ0FpQkVBLFVBakJGO0FBQUEsVUFpQmNDLFNBakJkLEdBaUI0QixJQWpCNUIsQ0FpQmNBLFNBakJkOztBQWtCTixXQUFLRyxLQUFMLEdBQWEsb0JBQVUsRUFBRUosc0JBQUYsRUFBY0Msb0JBQWQsRUFBVixDQUFiOztBQUVBLFdBQUtWLFlBQUwsQ0FBa0JJLGdCQUFsQixDQUFtQyxrQkFBbkMsRUFBdUQsVUFBQ1UsR0FBRCxFQUFVO0FBQy9ELGVBQUtMLFVBQUwsQ0FBZ0JNLElBQWhCLEdBQXVCRCxHQUF2QjtBQUNELE9BRkQ7O0FBSUEsV0FBS2QsWUFBTCxDQUFrQkksZ0JBQWxCLENBQW1DLHdCQUFuQyxFQUE2RCxVQUFDVSxHQUFELEVBQVU7QUFDckUsZUFBS0wsVUFBTCxDQUFnQk8sVUFBaEIsR0FBNkJGLEdBQTdCO0FBQ0QsT0FGRDs7QUFJQSxXQUFLZCxZQUFMLENBQWtCSSxnQkFBbEIsQ0FBbUMsa0JBQW5DLEVBQXVELFVBQUNVLEdBQUQsRUFBVTtBQUMvRCxlQUFLSixTQUFMLENBQWVPLEtBQWYsR0FBdUJILEdBQXZCO0FBQ0QsT0FGRDs7QUFLQXBCLGdCQUFVd0IsR0FBVixDQUFjLEtBQUtWLE9BQW5COztBQUVBLFdBQUtXLE9BQUwsQ0FBYSxlQUFiLEVBQThCLFlBQU07QUFDbEMsZUFBS1gsT0FBTCxDQUFhWSxTQUFiLENBQXVCM0IsYUFBYTRCLFdBQXBDO0FBQ0QsT0FGRDtBQUdEOzs7d0NBRW1CQyxJLEVBQU1DLE0sRUFBUTtBQUFBOztBQUNoQyxVQUFNQyxNQUFNL0IsYUFBYTRCLFdBQXpCO0FBQ0EsV0FBS1IsS0FBTCxDQUFXWSxPQUFYLENBQW1CSCxJQUFuQixFQUF5QkMsTUFBekI7O0FBRUEsVUFBTUcsS0FBS0osT0FBT0UsR0FBbEI7O0FBRUFHLGlCQUFXLFlBQU07QUFDZixlQUFLQyxJQUFMLENBQVUsT0FBVixFQUFtQk4sSUFBbkI7QUFDRCxPQUZELEVBRUdPLEtBQUtDLEtBQUwsQ0FBV0osS0FBSyxJQUFoQixDQUZIO0FBR0Q7OztFQTFENEJsQyxXQUFXdUMsVTs7a0JBNkQzQmxDLGdCIiwiZmlsZSI6IlBsYXllckV4cGVyaWVuY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBzb3VuZHdvcmtzIGZyb20gJ3NvdW5kd29ya3MvY2xpZW50JztcbmltcG9ydCBCdXJzdFN5bnRoIGZyb20gJy4vc3ludGhzL0J1cnN0U3ludGgnO1xuaW1wb3J0IFNpbmVTeW50aCBmcm9tICcuL3N5bnRocy9TaW5lU3ludGgnO1xuaW1wb3J0IFRoZXJlbWluIGZyb20gJy4vc3ludGhzL1RoZXJlbWluJztcbmltcG9ydCBGaXJlZmx5IGZyb20gJy4vRmlyZWZseSc7XG5pbXBvcnQgU2NvcmUgZnJvbSAnLi9TY29yZSc7XG5cbmNvbnN0IGF1ZGlvQ29udGV4dCA9IHNvdW5kd29ya3MuYXVkaW9Db250ZXh0O1xuY29uc3Qgc2NoZWR1bGVyID0gc291bmR3b3Jrcy5hdWRpby5nZXRTY2hlZHVsZXIoKTtcblxuY2xhc3MgUGxheWVyRXhwZXJpZW5jZSBleHRlbmRzIHNvdW5kd29ya3MuRXhwZXJpZW5jZSB7XG4gIGNvbnN0cnVjdG9yKGFzc2V0c0RvbWFpbiwgYXVkaW9GaWxlcykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnNoYXJlZFBhcmFtcyA9IHRoaXMucmVxdWlyZSgnc2hhcmVkLXBhcmFtcycpO1xuICAgIHRoaXMucHJvY2Vzc0ZpcmVmbHlGbGFzaCA9IHRoaXMucHJvY2Vzc0ZpcmVmbHlGbGFzaC5iaW5kKHRoaXMpO1xuICB9XG5cblxuICBzdGFydCgpIHtcbiAgICBzdXBlci5zdGFydCgpO1xuXG4gICAgLy8gZ2xvYmFsIGNvbnRyb2xcbiAgICB0aGlzLnNoYXJlZFBhcmFtcy5hZGRQYXJhbUxpc3RlbmVyKCdyZWxvYWQnLCAoKSA9PiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKHRydWUpKTtcblxuICAgIHRoaXMuZmlyZWZseSA9IG5ldyBGaXJlZmx5KDAuOCwgMS4yLCB0aGlzLnByb2Nlc3NGaXJlZmx5Rmxhc2gpO1xuXG4gICAgLy8gaW5pdCBzeW50aHNcbiAgICB0aGlzLmJ1cnN0U3ludGggPSBuZXcgQnVyc3RTeW50aCgpO1xuICAgIHRoaXMuc2luZVN5bnRoID0gbmV3IFNpbmVTeW50aCgpO1xuICAgIC8vIHRoaXMuc2luZVN5bnRoID0gbmV3IFRoZXJlbWluKCk7XG5cbiAgICB0aGlzLmJ1cnN0U3ludGguY29ubmVjdChhdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuICAgIHRoaXMuc2luZVN5bnRoLmNvbm5lY3QoYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcblxuICAgIC8vIGluaXQgc2NvcmVcbiAgICBjb25zdCB7IGJ1cnN0U3ludGgsIHNpbmVTeW50aCB9ID0gdGhpcztcbiAgICB0aGlzLnNjb3JlID0gbmV3IFNjb3JlKHsgYnVyc3RTeW50aCwgc2luZVN5bnRoIH0pO1xuXG4gICAgdGhpcy5zaGFyZWRQYXJhbXMuYWRkUGFyYW1MaXN0ZW5lcignc3ludGg6YnVyc3Q6Z2FpbicsICh2YWwpID0+ICB7XG4gICAgICB0aGlzLmJ1cnN0U3ludGguZ2FpbiA9IHZhbDtcbiAgICB9KTtcblxuICAgIHRoaXMuc2hhcmVkUGFyYW1zLmFkZFBhcmFtTGlzdGVuZXIoJ3N5bnRoOmJ1cnN0OmN1dG9mZkZyZXEnLCAodmFsKSA9PiAge1xuICAgICAgdGhpcy5idXJzdFN5bnRoLmN1dG9mZkZyZXEgPSB2YWw7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNoYXJlZFBhcmFtcy5hZGRQYXJhbUxpc3RlbmVyKCdzeW50aDpzaW5lOmxldmVsJywgKHZhbCkgPT4gIHtcbiAgICAgIHRoaXMuc2luZVN5bnRoLmxldmVsID0gdmFsO1xuICAgIH0pO1xuXG5cbiAgICBzY2hlZHVsZXIuYWRkKHRoaXMuZmlyZWZseSk7XG5cbiAgICB0aGlzLnJlY2VpdmUoJ3Byb2Nlc3M6Zmxhc2gnLCAoKSA9PiB7XG4gICAgICB0aGlzLmZpcmVmbHkucmVzZXRUaW1lKGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSk7XG4gICAgfSk7XG4gIH1cblxuICBwcm9jZXNzRmlyZWZseUZsYXNoKHRpbWUsIHBlcmlvZCkge1xuICAgIGNvbnN0IG5vdyA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZTtcbiAgICB0aGlzLnNjb3JlLnByb2Nlc3ModGltZSwgcGVyaW9kKTtcblxuICAgIGNvbnN0IGR0ID0gdGltZSAtIG5vdztcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zZW5kKCdmbGFzaCcsIHRpbWUpO1xuICAgIH0sIE1hdGgucm91bmQoZHQgKiAxMDAwKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyRXhwZXJpZW5jZTtcbiJdfQ==