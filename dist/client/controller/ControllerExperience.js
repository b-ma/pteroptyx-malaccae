'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _client = require('soundworks/client');

var soundworks = _interopRequireWildcard(_client);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ControllerExperience = function (_soundworks$Controlle) {
  (0, _inherits3.default)(ControllerExperience, _soundworks$Controlle);

  function ControllerExperience() {
    (0, _classCallCheck3.default)(this, ControllerExperience);

    // burst synth
    var _this = (0, _possibleConstructorReturn3.default)(this, (ControllerExperience.__proto__ || (0, _getPrototypeOf2.default)(ControllerExperience)).call(this));

    _this.setGuiOptions('synth:burst:frequency', { type: 'slider' });
    _this.setGuiOptions('synth:burst:duration', { type: 'slider' });
    _this.setGuiOptions('synth:burst:maxGain', { type: 'slider' });
    _this.setGuiOptions('synth:burst:level', { type: 'slider' });
    _this.setGuiOptions('synth:burst:cutoffFreq', { type: 'slider' });

    // sine synth
    _this.setGuiOptions('synth:sine:level', { type: 'slider' });
    return _this;
  }

  return ControllerExperience;
}(soundworks.ControllerExperience);

exports.default = ControllerExperience;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbnRyb2xsZXJFeHBlcmllbmNlLmpzIl0sIm5hbWVzIjpbInNvdW5kd29ya3MiLCJDb250cm9sbGVyRXhwZXJpZW5jZSIsInNldEd1aU9wdGlvbnMiLCJ0eXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0lBQVlBLFU7Ozs7OztJQUVOQyxvQjs7O0FBQ0osa0NBQWM7QUFBQTs7QUFHWjtBQUhZOztBQUlaLFVBQUtDLGFBQUwsQ0FBbUIsdUJBQW5CLEVBQTRDLEVBQUVDLE1BQU0sUUFBUixFQUE1QztBQUNBLFVBQUtELGFBQUwsQ0FBbUIsc0JBQW5CLEVBQTJDLEVBQUVDLE1BQU0sUUFBUixFQUEzQztBQUNBLFVBQUtELGFBQUwsQ0FBbUIscUJBQW5CLEVBQTBDLEVBQUVDLE1BQU0sUUFBUixFQUExQztBQUNBLFVBQUtELGFBQUwsQ0FBbUIsbUJBQW5CLEVBQXdDLEVBQUVDLE1BQU0sUUFBUixFQUF4QztBQUNBLFVBQUtELGFBQUwsQ0FBbUIsd0JBQW5CLEVBQTZDLEVBQUVDLE1BQU0sUUFBUixFQUE3Qzs7QUFFQTtBQUNBLFVBQUtELGFBQUwsQ0FBbUIsa0JBQW5CLEVBQXVDLEVBQUVDLE1BQU0sUUFBUixFQUF2QztBQVhZO0FBWWI7OztFQWJnQ0gsV0FBV0Msb0I7O2tCQWdCL0JBLG9CIiwiZmlsZSI6IkNvbnRyb2xsZXJFeHBlcmllbmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgc291bmR3b3JrcyBmcm9tICdzb3VuZHdvcmtzL2NsaWVudCc7XG5cbmNsYXNzIENvbnRyb2xsZXJFeHBlcmllbmNlIGV4dGVuZHMgc291bmR3b3Jrcy5Db250cm9sbGVyRXhwZXJpZW5jZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICAvLyBidXJzdCBzeW50aFxuICAgIHRoaXMuc2V0R3VpT3B0aW9ucygnc3ludGg6YnVyc3Q6ZnJlcXVlbmN5JywgeyB0eXBlOiAnc2xpZGVyJyB9KTtcbiAgICB0aGlzLnNldEd1aU9wdGlvbnMoJ3N5bnRoOmJ1cnN0OmR1cmF0aW9uJywgeyB0eXBlOiAnc2xpZGVyJyB9KTtcbiAgICB0aGlzLnNldEd1aU9wdGlvbnMoJ3N5bnRoOmJ1cnN0Om1heEdhaW4nLCB7IHR5cGU6ICdzbGlkZXInIH0pO1xuICAgIHRoaXMuc2V0R3VpT3B0aW9ucygnc3ludGg6YnVyc3Q6bGV2ZWwnLCB7IHR5cGU6ICdzbGlkZXInIH0pO1xuICAgIHRoaXMuc2V0R3VpT3B0aW9ucygnc3ludGg6YnVyc3Q6Y3V0b2ZmRnJlcScsIHsgdHlwZTogJ3NsaWRlcicgfSk7XG5cbiAgICAvLyBzaW5lIHN5bnRoXG4gICAgdGhpcy5zZXRHdWlPcHRpb25zKCdzeW50aDpzaW5lOmxldmVsJywgeyB0eXBlOiAnc2xpZGVyJyB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyRXhwZXJpZW5jZTtcbiJdfQ==