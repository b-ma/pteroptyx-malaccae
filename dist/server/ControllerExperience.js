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

var _server = require('soundworks/server');

var soundworks = _interopRequireWildcard(_server);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ControllerExperience = function (_soundworks$Controlle) {
  (0, _inherits3.default)(ControllerExperience, _soundworks$Controlle);

  function ControllerExperience(clientType, com) {
    (0, _classCallCheck3.default)(this, ControllerExperience);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ControllerExperience.__proto__ || (0, _getPrototypeOf2.default)(ControllerExperience)).call(this, clientType));

    _this.com = com;

    _this.auth = _this.require('auth');
    _this.players = [];
    return _this;
  }

  (0, _createClass3.default)(ControllerExperience, [{
    key: 'start',
    value: function start() {
      var _this2 = this;

      (0, _get3.default)(ControllerExperience.prototype.__proto__ || (0, _getPrototypeOf2.default)(ControllerExperience.prototype), 'start', this).call(this);

      this.com.addListener('players', function (players) {
        return _this2.players = players;
      });
    }
  }]);
  return ControllerExperience;
}(soundworks.ControllerExperience);

exports.default = ControllerExperience;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbnRyb2xsZXJFeHBlcmllbmNlLmpzIl0sIm5hbWVzIjpbInNvdW5kd29ya3MiLCJDb250cm9sbGVyRXhwZXJpZW5jZSIsImNsaWVudFR5cGUiLCJjb20iLCJhdXRoIiwicmVxdWlyZSIsInBsYXllcnMiLCJhZGRMaXN0ZW5lciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0lBQVlBLFU7Ozs7OztJQUVOQyxvQjs7O0FBQ0osZ0NBQVlDLFVBQVosRUFBd0JDLEdBQXhCLEVBQTZCO0FBQUE7O0FBQUEsa0tBQ3JCRCxVQURxQjs7QUFHM0IsVUFBS0MsR0FBTCxHQUFXQSxHQUFYOztBQUVBLFVBQUtDLElBQUwsR0FBWSxNQUFLQyxPQUFMLENBQWEsTUFBYixDQUFaO0FBQ0EsVUFBS0MsT0FBTCxHQUFlLEVBQWY7QUFOMkI7QUFPNUI7Ozs7NEJBRU87QUFBQTs7QUFDTjs7QUFFQSxXQUFLSCxHQUFMLENBQVNJLFdBQVQsQ0FBcUIsU0FBckIsRUFBZ0MsVUFBQ0QsT0FBRDtBQUFBLGVBQWEsT0FBS0EsT0FBTCxHQUFlQSxPQUE1QjtBQUFBLE9BQWhDO0FBQ0Q7OztFQWRnQ04sV0FBV0Msb0I7O2tCQWlCL0JBLG9CIiwiZmlsZSI6IkNvbnRyb2xsZXJFeHBlcmllbmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgc291bmR3b3JrcyBmcm9tICdzb3VuZHdvcmtzL3NlcnZlcic7XG5cbmNsYXNzIENvbnRyb2xsZXJFeHBlcmllbmNlIGV4dGVuZHMgc291bmR3b3Jrcy5Db250cm9sbGVyRXhwZXJpZW5jZSB7XG4gIGNvbnN0cnVjdG9yKGNsaWVudFR5cGUsIGNvbSkge1xuICAgIHN1cGVyKGNsaWVudFR5cGUpO1xuXG4gICAgdGhpcy5jb20gPSBjb207XG5cbiAgICB0aGlzLmF1dGggPSB0aGlzLnJlcXVpcmUoJ2F1dGgnKTtcbiAgICB0aGlzLnBsYXllcnMgPSBbXTtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHN1cGVyLnN0YXJ0KCk7XG5cbiAgICB0aGlzLmNvbS5hZGRMaXN0ZW5lcigncGxheWVycycsIChwbGF5ZXJzKSA9PiB0aGlzLnBsYXllcnMgPSBwbGF5ZXJzKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyRXhwZXJpZW5jZTtcbiJdfQ==